# 趣伴云起官网

独立的静态介绍网站，使用原生 HTML、CSS 和 JavaScript。网站源码、样式、脚本和素材全部放在 `web_home/` 中；无需安装依赖、运行构建命令或配置后端。

## 本地预览

在仓库根目录打开终端，执行：

```powershell
cd web_home
python -m http.server 8000
```

然后打开 [http://localhost:8000/](http://localhost:8000/)。Windows 如果使用 Python Launcher，可将第二行改为 `py -m http.server 8000`。在终端按 `Ctrl+C` 停止服务。

## 发布到 GitHub Pages

部署工作流位于仓库根目录的 `.github/workflows/deploy-web-home.yml`，直接上传 `web_home/`，不执行安装或构建。

1. 将项目和工作流推送到你自己的 GitHub 仓库。当前项目使用 Gitee 远程地址，GitHub Pages 需要另行指定 GitHub 仓库并推送；本次只提供可部署文件。
2. 打开 GitHub 仓库的 **Settings → Pages**，在 **Build and deployment → Source** 中选择 **GitHub Actions**。本项目已有工作流，无需再生成模板。
3. 向 `main` 或 `master` 分支推送 `web_home/` 或工作流的变更后会自动部署。也可在 **Actions → Deploy web_home to GitHub Pages → Run workflow** 中手动运行；首次配置 Pages 后可用此方式触发。
4. 等待 Actions 中部署成功，再从 **Settings → Pages** 或工作流的 `github-pages` 环境链接访问网站。

普通项目仓库的网址为 `https://<GitHub用户名>.github.io/<仓库名>/`；仓库名为 `<GitHub用户名>.github.io` 时，网址为 `https://<GitHub用户名>.github.io/`。站点入口是 `web_home/index.html`，部署后直接作为网站首页，无需在网址后添加 `web_home/`。页面资源使用相对路径，可在仓库子路径下加载。

如果发布分支不是 `main` 或 `master`，修改工作流中的 `on.push.branches` 为实际分支，并检查 `github-pages` 环境的部署分支设置是否允许该分支。工作流只在网站或自身发生变化时自动运行；其他小程序文件变更不会触发此部署。

工作流只把 `web_home/` 打包成 Pages 网站，不上传 `miniprogram/`、`cloudfunctions/` 或仓库中的其他项目文件。GitHub 仓库自身的可见性由仓库设置决定，与 Pages 上传目录分别配置。

## 素材与小程序入口

| 文件 | 用途 |
| --- | --- |
| `assets/miniprogram-code.jpg` | 用户提供的真实小程序码，供页面展示、放大和保存 |
| `assets/landscape.jpg` | 复用现有小程序的山水插画 |
| `assets/app-icon.svg` | 山野风品牌图标：青山、日出与溪流；页头、页尾和浏览器标签共用 |

替换素材时保留文件名即可同步更新引用。请保持小程序码原图的清晰度和完整边缘，不要裁掉识别区域或用其他图案覆盖。方形二维码展示通过 CSS 取原横幅左侧，完整原图仍用于下载；如果将来换成不同布局的图片，需要同时调整 `styles.css` 中 `.qr-square` 的显示规则。

有效小程序码应使用微信官方生成或已经验证的真实图片，不能仅凭 `appid` 在静态网页中伪造。当前 `miniprogram-code.jpg` 使用用户原图。电脑访问可用微信扫码；手机访问可保存原图，再通过微信“扫一扫”中的相册入口识别，在支持识别的微信页面中也可长按原图识别。普通网页不保证能直接唤起小程序。

## GitHub 官方参考

- [使用自定义工作流部署 GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)：本工作流采用官方示例的 `actions/checkout@v6`、`actions/configure-pages@v5`、`actions/upload-pages-artifact@v4` 和 `actions/deploy-pages@v4`。
- [配置 GitHub Pages 的发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)：选择 GitHub Actions 作为 Source。
- [GitHub Pages 网站类型和默认网址](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)。
