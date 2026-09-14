# -ATB507-cv

## 本地开发

需要 Node.js 18 或更高版本，推荐使用 Node.js 20+。启动开发环境：

```sh
npm run dev
```

然后打开 <http://127.0.0.1:4173>。

`npm run dev` 使用 Node 原生 `--watch` 监听服务器文件，开发响应会禁用浏览器缓存。修改 `index.html`、`app.js`、`data.js` 或 `styles.css` 后刷新浏览器即可看到最新内容。

生产式启动：

```sh
npm start
```

也可以通过环境变量修改监听地址和端口：

```sh
HOST=0.0.0.0 PORT=4174 npm run dev
```

`npm run preview` 作为兼容旧用法的别名保留。

## 内容更新

页面内容集中在 `data.js`：

- `profile`：姓名、简介、所在地、邮箱、关键词和联系文案
- `projects`：作品标题、类型、年份、简介、筛选分类和视觉样式
- `experience`：工作经历、时间、角色和说明
- `about` / `skills`：个人介绍与能力模块

`app.js` 只负责把数据渲染到页面并处理作品筛选、移动端菜单等交互；`styles.css` 负责视觉样式。新增内容时优先编辑 `data.js`，无需修改页面结构。