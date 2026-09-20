<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'

const RELEASES_API = 'https://api.github.com/repos/wushuo894/open-panel/releases?per_page=10'

const markdownRenderer = new MarkdownIt({ html: false, linkify: true, breaks: true })
const defaultLinkOpen = markdownRenderer.renderer.rules.link_open
  || ((tokens, index, options, environment, self) => self.renderToken(tokens, index, options))

// Release 内的链接统一在新窗口打开，并阻止新页面访问来源窗口。
markdownRenderer.renderer.rules.link_open = (tokens, index, options, environment, self) => {
  tokens[index].attrSet('target', '_blank')
  tokens[index].attrSet('rel', 'noopener noreferrer')
  return defaultLinkOpen(tokens, index, options, environment, self)
}

const releases = ref([])
const loading = ref(true)
const error = ref('')
let requestController

// 从 GitHub Releases API 获取最近发布记录，避免在文档中重复维护版本内容。
async function loadReleases() {
  requestController?.abort()
  requestController = new AbortController()
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(RELEASES_API, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      signal: requestController.signal
    })
    if (!response.ok) {
      throw new Error(response.status === 403 ? 'GitHub API 请求次数已达上限，请稍后再试。' : `GitHub API 请求失败（${response.status}）`)
    }
    releases.value = (await response.json()).filter(release => !release.draft)
  } catch (requestError) {
    if (requestError.name !== 'AbortError') error.value = requestError.message || '更新日志加载失败。'
  } finally {
    loading.value = false
  }
}

// 将 GitHub 的 ISO 发布时间转换为当前浏览器所在时区的中文日期。
function formatReleaseDate(value) {
  if (!value) return '发布时间未知'
  return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'long' }).format(new Date(value))
}

// 将 GitHub Release 的 Markdown 正文转换为安全 HTML，原始 HTML 保持禁用。
function renderReleaseNotes(value) {
  return markdownRenderer.render(value?.trim() || '')
}

onMounted(loadReleases)
onBeforeUnmount(() => requestController?.abort())
</script>

<template>
  <div class="github-releases" aria-live="polite">
    <div v-if="loading" class="release-state">
      <span class="release-spinner" aria-hidden="true" />
      <span>正在从 GitHub 获取更新日志...</span>
    </div>

    <div v-else-if="error" class="release-state release-state--error">
      <span>{{ error }}</span>
      <button type="button" @click="loadReleases">重新加载</button>
    </div>

    <div v-else-if="!releases.length" class="release-state">GitHub 暂无公开发布记录。</div>

    <template v-else>
      <article v-for="release in releases" :key="release.id" class="release-entry">
        <header class="release-header">
          <div>
            <h2 :id="`release-${release.id}`">{{ release.name || release.tag_name }}</h2>
            <span v-if="release.prerelease" class="release-badge">预发布</span>
          </div>
          <time :datetime="release.published_at">{{ formatReleaseDate(release.published_at) }}</time>
        </header>
        <div v-if="release.body?.trim()" class="release-body" v-html="renderReleaseNotes(release.body)" />
        <p v-else class="release-empty">该版本未提供更新说明。</p>
        <a :href="release.html_url" target="_blank" rel="noopener noreferrer" class="release-link">在 GitHub 查看此版本</a>
      </article>
    </template>
  </div>
</template>

<style scoped>
.github-releases { display: grid; gap: 28px; margin-top: 24px; }
.release-state { display: flex; min-height: 120px; align-items: center; justify-content: center; gap: 12px; padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); text-align: center; }
.release-state--error { flex-direction: column; color: var(--vp-c-danger-1); }
.release-state button { padding: 7px 13px; border: 1px solid var(--vp-c-brand-1); border-radius: 6px; color: var(--vp-c-brand-1); cursor: pointer; }
.release-spinner { width: 18px; height: 18px; border: 2px solid var(--vp-c-divider); border-top-color: var(--vp-c-brand-1); border-radius: 50%; animation: release-spin .8s linear infinite; }
.release-entry { padding-bottom: 28px; border-bottom: 1px solid var(--vp-c-divider); }
.release-entry:last-child { padding-bottom: 0; border-bottom: 0; }
.release-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 14px; }
.release-header > div { display: flex; min-width: 0; align-items: center; flex-wrap: wrap; gap: 9px; }
.release-header h2 { margin: 0; padding: 0; border: 0; font-size: 1.35rem; }
.release-header time { flex: 0 0 auto; color: var(--vp-c-text-2); font-size: .84rem; }
.release-badge { padding: 2px 7px; border: 1px solid var(--vp-c-warning-1); border-radius: 999px; color: var(--vp-c-warning-1); font-size: .72rem; }
.release-body { margin-bottom: 12px; color: var(--vp-c-text-1); font-size: .94rem; line-height: 1.75; overflow-wrap: anywhere; }
.release-body :deep(> :first-child) { margin-top: 0; }
.release-body :deep(> :last-child) { margin-bottom: 0; }
.release-body :deep(h1), .release-body :deep(h2), .release-body :deep(h3), .release-body :deep(h4) { margin: 22px 0 10px; padding: 0; border: 0; letter-spacing: 0; }
.release-body :deep(h1) { font-size: 1.3rem; }
.release-body :deep(h2) { font-size: 1.18rem; }
.release-body :deep(h3), .release-body :deep(h4) { font-size: 1.05rem; }
.release-body :deep(p), .release-body :deep(ul), .release-body :deep(ol), .release-body :deep(blockquote), .release-body :deep(pre), .release-body :deep(table) { margin: 12px 0; }
.release-body :deep(ul), .release-body :deep(ol) { padding-left: 24px; }
.release-body :deep(li + li) { margin-top: 4px; }
.release-body :deep(blockquote) { padding: 2px 0 2px 14px; border-left: 3px solid var(--vp-c-brand-1); color: var(--vp-c-text-2); }
.release-body :deep(pre) { overflow-x: auto; padding: 14px 16px; border-radius: 8px; background: var(--vp-code-block-bg); }
.release-body :deep(code) { font-size: .88em; }
.release-body :deep(:not(pre) > code) { padding: 2px 5px; border-radius: 4px; background: var(--vp-c-bg-soft); color: var(--vp-code-color); }
.release-body :deep(table) { display: block; width: 100%; overflow-x: auto; }
.release-body :deep(th), .release-body :deep(td) { padding: 8px 12px; border: 1px solid var(--vp-c-divider); }
.release-body :deep(img) { max-width: 100%; height: auto; border-radius: 8px; }
.release-body :deep(hr) { margin: 22px 0; border: 0; border-top: 1px solid var(--vp-c-divider); }
.release-empty { color: var(--vp-c-text-2); }
.release-link { display: inline-flex; align-items: center; font-size: .88rem; font-weight: 600; }
@keyframes release-spin { to { transform: rotate(360deg); } }
@media (max-width: 640px) {
  .release-header { flex-direction: column; gap: 6px; }
}
</style>
