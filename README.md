# Pichi Web

这是一个基于 [Pichi](https://github.com/pichi-router/pichi) 开源项目开放的 RESTful API 而实现的一个使用 Web 界面进行设置的项目

主体由 React16 + Router4 + Redux + Antd 实现

## 环境
推荐 Node.js v10.x 以上

确保 [Pichi](https://github.com/pichi-router/pichi) 项目已经成功运行

## 运行
如果你想要开始用该项目操作 Pichi

`yarn run start -p [pichi的端口号]` 或者 `npm run start -p [pichi的端口号]` 

如果你想要修改 Web 页面

`yarn run dev -p [pichi的端口号]` 或者 `npm run dev -p [pichi的端口号]`

如果你想要构建出页面，然后部署在自己的 Nginx 服务器

`yarn run build` 或者 `yarn run build`

根目录下的 build 文件夹就是你的 Web 项目文件夹，拷贝到设置好的 Nginx 对应 Web 目录重启 Nginx 就可以了

Nginx 对应简单配置例子如下：

```
server {
  listen 8082;
  root /Users/rbackrock/Code/frontend/pichi-router-web/build;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://localhost:8000/;
  }
}
```
