# chatting-vue
项目演示见[demo](https://cdn.sxrekord.com/project/demo.gif)，项目介绍请前往[后端仓库](https://github.com/WebChatting/chatting)。

## Components
- [Vue2](https://v2.cn.vuejs.org/v2/guide/)
- [VueRouter3](https://v3.router.vuejs.org/zh/guide/)
- [Vuex3](https://v3.vuex.vuejs.org/zh/)
- [Element](https://element.eleme.io/#/zh-CN/component/installation)
- [Vue-i18n@8]

## Usage
### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Nginx proxy template

```conf
server {
    listen 8000;
    listen [::]:8000;
    server_name localhost;
    root /srv/http/chatting;

    location / {
        index index.php index.html index.htm;
    }

    location /chatting/ {
        proxy_pass http://localhost:8088;
    }
}
```

## Reference
- 聊天室界面——[https://github.com/JustCoding-Hai/subtlechat-vue/](https://github.com/JustCoding-Hai/subtlechat-vue)
