<script setup>
import GitHubReleases from '../.vitepress/theme/components/GitHubReleases.vue'
</script>

# 更新与升级

进入“关于”页面时，Open Panel 会自动检查 GitHub Releases。也可以在设置页手动检查，并填写 GitHub Token 避免匿名请求受到共享 IP 的频率限制。

## Docker 部署

Docker 部署可直接在关于页面安装更新。Open Panel 会下载并校验 GitHub Release JAR，在容器内替换程序后由启动脚本重启 Java 进程，不需要重建当前容器。

也可以通过镜像完成完整升级：

```bash
docker compose pull
docker compose up -d
```

## JAR 部署

非 Windows、非容器环境可以在设置页安装更新。更新过程会校验发行文件的 SHA-256，完成后替换程序并重启。

## 更新日志

以下内容通过 GitHub Releases API 实时获取。

<GitHubReleases />
