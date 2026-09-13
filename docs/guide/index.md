# 开始使用

Open Panel 可以通过 Docker 或可执行 JAR 部署。家庭服务器、NAS 等长期运行环境推荐使用 Docker；需要直接访问本机目录或便于调试时，也可以运行 JAR。

## 部署方式

| 方式 | 适合场景 | 运行要求 |
| --- | --- | --- |
| [Docker](/guide/docker) | NAS、家庭服务器、长期运行 | Docker 与 Docker Compose |
| [JAR](/guide/jar) | 本机运行、开发调试 | JDK 25 或更高版本 |

## 首次初始化

1. 打开 Open Panel 首页。
2. 点击右上角登录按钮。
3. 首次启动会进入管理员初始化页面，设置用户名与至少 8 位的密码。
4. 登录后进入设置页调整页面、安全和更新选项。

默认允许免登录访问首页，匿名访客只有只读权限，不能打开设置或控制 Docker 容器。需要完全关闭公开访问时，可在“设置 → 安全”中关闭免登录访问。

## 默认内容

首次启动会按以下顺序创建分组：

1. **系统信息**：CPU、RAM、Network。
2. **Docker**：检测到 Docker Socket 或 `DOCKER_HOST` 时创建。
3. **常用网站**：知乎、百度贴吧、QQ 邮箱、GitHub、哔哩哔哩、YouTube、ChatGPT 和 Cloudflare。

大封面模式默认不在首屏显示分组，向下滚动后展示完整导航。你也可以选择一个分组放入封面区域。

## 下一步

- 在[分组与卡片](/features/cards)中了解四种卡片类型。
- 在[页面与外观](/features/appearance)中设置壁纸和 Banner。
- 对公网部署进行配置前，先阅读[安全设置](/features/security)。
