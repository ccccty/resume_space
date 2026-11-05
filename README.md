# 在线简历 · 一版多向

同一套版式，按投递方向切换内容。地址：<https://ccccty.github.io/resume_space/>

- 右上角下拉切换方向，切换后地址带 `?v=<方向>`，可直接分享某一方向的链接。
- PDF：[assets/resume.pdf](assets/resume.pdf)，由 `resume-print.html` 经 `一键生成PDF.bat` 生成（Chrome / Edge 无头打印，A4 单页）。
- 纸质简历上的二维码指向本站。

## 目录

```
index.html                页面外壳：导航 + 空容器 + 三个脚本
assets/css/style.css      版式（不要动，改样式会影响全部方向）
assets/js/app.js          渲染器：把 variants 里的内容填进固定版式
assets/js/main.js         交互：滚动淡入、导航高亮、进度条、卡片光斑
assets/data/variants.js   内容库（唯一需要改的文件）
assets/img/               头像、获奖照片、站点二维码
assets/resume.pdf         单页 PDF
resume-print.html         A4 打印版（另一样式，供 PDF 用）
一键生成PDF.bat           双击即重出 PDF
```

## 新增一个投递方向

1. 打开 `assets/data/variants.js`，复制一个 variant 块，改 `key`（英文短名）与 `label`（下拉菜单显示名），再替换内容。
2. 把新 key 加进顶部的 `order` 数组，下拉菜单会自动出现该项（选项由 `D.order` 生成，无需改 HTML）。
3. 需要单独的 PDF 时，改 `resume-print.html` 后跑 `一键生成PDF.bat`，把产物另存为 `assets/resume-<key>.pdf`，并在 variants 里给该方向加 `pdf` 字段指向它（渲染器已支持替换下载链接时会读取该字段）。

字段说明：`eyebrow / role` 是首屏两段；`about.paras / facts / stats` 是「关于我」；`experience[]`、`projects[]`、`opensource[]`、`education[]`、`skills[]`、`honors[]` 依次对应下方各节，`contact` 是页尾那句。字符串里可以直接写 `<strong>` 等行内标签。

## 本地预览

直接双击 `index.html` 即可（脚本用相对路径，无构建步骤、无网络依赖）。切换方向后刷新会记住上次选择（localStorage）。
