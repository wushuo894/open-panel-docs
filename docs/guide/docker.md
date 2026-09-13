# Docker 部署

## Docker Compose

创建 `docker-compose.yml`：

```yaml
services:
  open-panel:
    image: ghcr.io/wushuo894/open-panel:latest
    container_name: open-panel
    restart: always
    network_mode: host
    environment:
      SERVER_PORT: 57788
      TZ: Asia/Shanghai
      PUID: 0
      PGID: 0
      UMASK: "022"
    volumes:
      - /volume1/docker/open-panel/config:/config
      - /var/run/docker.sock:/var/run/docker.sock:ro
      # 存储卡片需要读取宿主机目录时，请额外挂载对应路径
      # - /volume1:/volume1
```

启动容器：

```bash
docker compose up -d
```

访问 `http://服务器地址:57788`。

## 数据与权限

配置保存在容器的 `/config/open-panel.json`，因此必须持久化 `/config`。

挂载 Docker Socket 后，Open Panel 才能列出容器并执行启动、停止和重启操作。Docker Socket 具有较高的宿主机权限，只应提供给可信实例。若宿主机限制 Socket 的组权限，请将 `DOCKER_GID` 设置为宿主机 Docker 组的 GID。

存储信息卡片按填写的文件夹路径查找所在分区。容器内只能读取已挂载的目录，因此应把需要监控的宿主机路径映射到容器。

## 修改端口

项目使用 host 网络，监听端口由 `SERVER_PORT` 决定。修改该变量后重建容器即可。

## 自更新

进入设置的“关于”页面检查新版本。Docker 部署可以直接安装更新：Open Panel 下载 Release JAR 并校验 SHA-256，替换成功后由容器启动脚本自动重启 Java 进程，不需要重建容器。Docker 管理页会隐藏 Open Panel 自身容器。

也可以通过镜像完成完整升级：

```bash
docker compose pull
docker compose up -d
```
