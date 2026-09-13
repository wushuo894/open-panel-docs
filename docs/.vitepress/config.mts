import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Open Panel',
  description: '面向家庭服务器和自托管服务的导航面板',
  base: './',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#101418' }],
    ['link', { rel: 'icon', href: './logo.svg', type: 'image/svg+xml' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Open Panel 文档',
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/' },
      { text: '功能', link: '/features/cards' },
      { text: '配置参考', link: '/reference/configuration' },
      { text: '更新记录', link: '/reference/update' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '快速开始',
          items: [
            { text: '开始使用', link: '/guide/' },
            { text: 'Docker 部署', link: '/guide/docker' },
            { text: '运行 JAR', link: '/guide/jar' }
          ]
        }
      ],
      '/features/': [
        {
          text: '功能指南',
          items: [
            { text: '分组与卡片', link: '/features/cards' },
            { text: '软件服务', link: '/features/services' },
            { text: 'Docker 容器', link: '/features/docker' },
            { text: '页面与外观', link: '/features/appearance' },
            { text: '安全设置', link: '/features/security' },
            { text: 'Web 服务扫描', link: '/features/web-scan' }
          ]
        }
      ],
      '/reference/': [
        {
          text: '参考',
          items: [
            { text: '配置说明', link: '/reference/configuration' },
            { text: '更新与升级', link: '/reference/update' }
          ]
        }
      ]
    },
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wushuo894/open-panel' }
    ],
    editLink: {
      pattern: 'https://github.com/wushuo894/open-panel/edit/main/open-panel-docs/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    outline: {
      level: [2, 3],
      label: '本页内容'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '深色模式',
    footer: {
      message: '基于 GNU GPL v2.0 开源',
      copyright: 'Copyright © 2026 Open Panel'
    }
  }
})
