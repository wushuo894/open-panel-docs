---
layout: home

hero:
  name: Open Panel
  text: 自托管服务导航面板
  tagline: 在一个清爽、响应式的页面中管理常用网站、家庭服务、主机信息与 Docker 容器。
  image:
    src: /logo.svg
    alt: Open Panel
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/
    - theme: alt
      text: 查看 GitHub
      link: https://github.com/wushuo894/open-panel

features:
  - icon: 🧭
    title: 灵活导航
    details: 自定义内外网地址、分组、图标和打开方式，并支持拖拽调整卡片位置。
  - icon: 📊
    title: 状态聚合
    details: 展示系统指标、Docker 状态，以及 Emby、ani-rss、qBittorrent、OpenList 的服务摘要。
  - icon: 🖼️
    title: 个性页面
    details: 大封面与列表两种模式，支持自定义壁纸、遮罩、Banner、搜索引擎和页脚。
  - icon: 🔒
    title: 访问控制
    details: 提供 JWT 登录、匿名只读、单会话、IP 绑定、登录限流和反向代理信任设置。
  - icon: 🐳
    title: Docker 管理
    details: 读取容器状态与运行时间，管理员可直接启动、停止和重启指定容器。
  - icon: 🔎
    title: 服务发现
    details: 扫描授权主机上的 Web 服务，识别标题、图标和简介后批量添加到首页。
---

## 从这里开始

推荐使用 Docker Compose 部署。首次打开右上角登录入口，完成管理员用户名和密码初始化后即可编辑页面。

[查看安装步骤 →](/guide/)
