# 运行 JAR

## 环境要求

- JDK 25 或更高版本
- Maven 3.9
- pnpm 可访问的软件源

## 编译与启动

在项目根目录执行：

```bash
mvn -DskipTests package
java -jar open-panel-application/target/open-panel.jar
```

默认监听 `0.0.0.0:57788`，配置文件保存在当前工作目录的 `config/open-panel.json`。

## 自定义配置目录

```bash
OPEN_PANEL_CONFIG_DIR=/path/to/config java -jar open-panel.jar
```

请确保运行用户对配置目录和上传资源目录具有读写权限。存储卡片填写的路径也必须允许该用户读取。

## 自定义端口

```bash
SERVER_PORT=57788 java -jar open-panel.jar
```

## 自动更新

非容器、非 Windows 的 JAR 部署支持在设置页安装更新。Open Panel 会下载 GitHub Release 中的发行文件、校验 SHA-256，然后替换当前程序并重启。执行更新前仍建议备份配置目录。
