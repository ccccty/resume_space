# 在线简历 · 太空 / 遥感方向

单一定位的静态简历站：卫星遥感图像处理与星上边缘计算（光学—SAR 多源融合、物候约束样本生成、MSAFNet、星上/边缘部署）。

- 线上地址：<https://ccccty.github.io/resume_space/>
- 印刷简历与 PDF 上的二维码指向本站，扫码直接落到这一份简历
- 本站只讲太空/遥感方向，**不包含方向切换、不包含具身智能内容**

## 目录

```
index.html                中文首页（完整版）
en/index.html             英文版（信息与中文版一一对应）
resume-print.html         A4 单页打印版，供生成 PDF
assets/css/style.css      全站样式
assets/js/main.js         交互：滚动淡入、导航高亮、阅读进度
assets/img/               头像、获奖照片、站点二维码
assets/resume.pdf         单页 PDF（由 resume-print.html 生成）
一键生成PDF.bat           双击即重出 assets/resume.pdf
.nojekyll                 关闭 Jekyll，保证静态资源原样发布
```

无构建步骤，纯静态；GitHub Pages 直接从 `main` 分支根目录发布。

## 重出 PDF

方法一：双击 `一键生成PDF.bat`（自动找 Chrome 或 Edge，无头打印 A4 单页）。

方法二：命令行，注意先把文件路径转成 `file:///` URL：

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --user-data-dir="$env:TEMP\chrome_pdf_space" `
  "--print-to-pdf=D:\work\resume_space\assets\resume.pdf" `
  "file:///D:/work/resume_space/resume-print.html"
```

改简历内容时同时改 `resume-print.html`，否则 PDF 与网页会不一致。

## 更换二维码

二维码内容必须精确等于本站地址 `https://ccccty.github.io/resume_space/`。`assets/img/qr-site.png`（打印页用）与 `qr-site.svg` 都由下面这段生成，参数固定，不要换成别的库或参数以免版式不一致：

```python
import qrcode
from qrcode.image.svg import SvgPathImage

url = "https://ccccty.github.io/resume_space/"
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=24, border=4)
qr.add_data(url, optimize=0)
qr.make(fit=True)
qr.make_image(fill_color="black", back_color="white").save("assets/img/qr-site.png")
qrcode.make(url, image_factory=SvgPathImage, box_size=24, border=4).save("assets/img/qr-site.svg")
```

生成后务必解码校验，确认字符串完全一致（可用 `zxingcpp.read_barcodes`），再重出 PDF：

```python
import zxingcpp
from PIL import Image
Image.open("assets/img/qr-site.png")
print([r.text for r in zxingcpp.read_barcodes(Image.open("assets/img/qr-site.png").convert("L"))])
```

## 与 A 库的关系

本站与 A 库 `ccccty/resume_Embodied_AI`（具身智能 / 边缘感知方向）是两套**完全独立**的仓库与站点：

- 内容互不引用、不交叉链接，二维码各自指向自己的站点；
- 两份站点共用同一套版式结构，但事实表述按方向分别撰写；
- 改这个仓库不要动 A 库目录，反之亦然。
