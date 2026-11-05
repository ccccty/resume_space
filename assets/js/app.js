/* ============================================================
   app.js — 版式固定，内容取自 assets/data/variants.js
   ============================================================ */
(function () {
  "use strict";

  var D = window.RESUME;
  var qs = new URLSearchParams(window.location.search);
  var stored = null;
  try { stored = localStorage.getItem("resume-variant"); } catch (e) {}
  var key = qs.get("v") || stored || D.order[0];
  if (!D.variants[key]) key = D.order[0];

  var ICON = {
    loc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 1 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    school: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 4l9 5.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9.5 20v-5h5v5"/></svg>',
    person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/></svg>'
  };

  function head(kicker, title, desc) {
    return '<div class="section__head reveal"><span class="section__kicker">' + kicker + '</span>' +
      '<h2 class="section__title">' + title + '</h2>' +
      (desc ? '<p class="section__desc">' + desc + '</p>' : '') + '</div>';
  }

  function hero(v) {
    var meta = [["loc", "上海"], ["school", "南京航空航天大学 · 硕士"], ["person", "25 岁 · 男"]];
    return '<section class="hero"><div class="wrap hero__inner"><div>' +
      '<p class="hero__eyebrow">' + v.eyebrow + '</p>' +
      '<h1 class="hero__name">崔天一<small>Cui Tianyi</small></h1>' +
      '<p class="hero__role">' + v.role + '</p>' +
      '<ul class="hero__meta">' + meta.map(function (m) {
        return '<li>' + ICON[m[0]] + m[1] + '</li>';
      }).join('') + '</ul>' +
      '<div class="hero__cta">' +
        '<a class="btn btn--primary" href="assets/resume.pdf" target="_blank" rel="noopener">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5v11"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4.5 19.5h15"/></svg>下载 PDF 简历</a>' +
        '<a class="btn btn--ghost" href="mailto:503575179@qq.com">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.6 6.6 8.4 6 8.4-6"/></svg>503575179@qq.com</a>' +
      '</div></div>' +
      '<div class="hero__avatar"><img src="assets/img/avatar.jpg" alt="崔天一" width="520" height="689"></div>' +
    '</div></section>';
  }

  function about(v) {
    var a = v.about;
    return '<section class="section section--alt" id="about"><div class="wrap">' +
      head('About', '关于我', '') +
      '<div class="about">' +
        '<div class="about__text reveal">' + a.paras.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>' +
        '<aside class="facts reveal"><dl>' + a.facts.map(function (f) {
          return '<div class="facts__row"><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>';
        }).join('') + '</dl></aside>' +
      '</div>' +
      '<div class="stats reveal">' + a.stats.map(function (s) {
        return '<div class="stat"><span class="stat__num">' + s[0] + '</span><span class="stat__label">' + s[1] + '</span></div>';
      }).join('') + '</div>' +
    '</div></section>';
  }

  function experience(v) {
    return '<section class="section" id="experience"><div class="wrap">' +
      head('Experience', '工作与实习经历', '从卫星遥感影像的融合解译，到多源探测数据的统一处理与工程交付。') +
      '<ol class="timeline reveal">' + v.experience.map(function (e) {
        var cls = e.now ? 'tl-item tl-item--now' : 'tl-item';
        var out = '<li class="' + cls + '"><div class="tl-head"><div>' +
          '<h3 class="tl-title">' + e.title + (e.now ? '<span class="badge-now">在职</span>' : '') + '</h3>' +
          '<div class="tl-org">' + e.org + '</div></div>' +
          '<span class="tl-date">' + e.date + '</span></div>' +
          '<div class="tl-body"><ul>' + e.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul></div>';
        if (e.sub) {
          out += '<div class="tl-sub"><div class="tl-sub__head"><span class="tl-sub__role">' + e.sub.role + '</span>' +
            '<span class="tl-date">' + e.sub.date + '</span></div>' +
            '<div class="tl-body"><ul>' + e.sub.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul></div></div>';
        }
        return out + '</li>';
      }).join('') + '</ol></div></section>';
  }

  function card(c) {
    var title = c.url
      ? '<a href="' + c.url + '" target="_blank" rel="noopener">' + c.title + '</a>'
      : c.title;
    var links = (c.links || []).map(function (l) {
      return '<a href="' + l[1] + '"' + (l[1].indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') + '>' + l[0] + '</a>';
    }).join('');
    return '<article class="card' + (c.wide ? ' card--wide' : '') + ' reveal">' +
      '<div class="card__top"><span class="tag">' + c.tag + '</span><span class="card__date">' + c.date + '</span></div>' +
      '<h3 class="card__title">' + title + '</h3>' +
      '<p class="card__desc">' + c.desc + '</p>' +
      '<div class="card__stack">' + c.chips.map(function (t) { return '<span class="chip">' + t + '</span>'; }).join('') + '</div>' +
      '<div class="card__links">' + links + '</div>' +
    '</article>';
  }

  function cardsSection(id, kicker, title, desc, list) {
    return '<section class="section section--alt" id="' + id + '"><div class="wrap">' +
      head(kicker, title, desc) +
      '<div class="projects">' + list.map(card).join('') + '</div>' +
    '</div></section>';
  }

  function education(v) {
    return '<section class="section" id="education"><div class="wrap">' +
      head('Education', '教育背景', '') +
      '<ol class="timeline reveal">' + v.education.map(function (e) {
        return '<li class="tl-item"><div class="tl-head"><div>' +
          '<h3 class="tl-title">' + e.school + '</h3><div class="tl-org">' + e.major + '</div></div>' +
          '<span class="tl-date">' + e.date + '</span></div>' +
          '<div class="tl-body"><ul>' + e.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul></div></li>';
      }).join('') + '</ol></div></section>';
  }

  function skills(v) {
    return '<section class="section section--alt" id="skills"><div class="wrap">' +
      head('Skills', '专业能力', '') +
      '<div class="skills reveal">' + v.skills.map(function (g) {
        return '<div><p class="skill__label">' + g[0] + '</p><ul class="skill__list">' +
          g[1].map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul></div>';
      }).join('') + '</div></div></section>';
  }

  function honors(v) {
    return '<section class="section" id="honors"><div class="wrap">' +
      head('Honors', '荣誉与科研成果', '') +
      '<ul class="honors reveal">' + v.honors.map(function (h) {
        return '<li><span class="honors__year">' + h[0] + '</span><span class="honors__name">' + h[1] +
          (h[2] ? '<span class="chip" style="margin-left:8px">' + h[2] + '</span>' : '') + '</span></li>';
      }).join('') + '</ul>' +
      '<figure class="evidence reveal"><a href="assets/img/award-2026.jpg" target="_blank" rel="noopener">' +
        '<img src="assets/img/award-2026.jpg" alt="2026 年上海市质量协会质量技术奖（成果）三等奖 颁奖现场" loading="lazy"></a>' +
        '<figcaption class="evidence__cap"><strong>2026 年上海市质量协会质量技术奖（成果）三等奖</strong>' +
        '于 CIHF 2026 中国工业论坛 · 质量创新论坛暨数字化技术研讨会现场领奖。</figcaption>' +
      '</figure></div></section>';
  }

  function contact(v) {
    return '<section class="contact" id="contact"><div class="wrap">' +
      '<h2 class="contact__title">联系方式</h2><p class="contact__desc">' + v.contact + '</p>' +
      '<div class="contact__actions">' +
        '<a class="btn btn--primary" href="mailto:503575179@qq.com">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.6 6.6 8.4 6 8.4-6"/></svg>503575179@qq.com</a>' +
        '<a class="btn btn--ghost" href="tel:18837831302">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7.6 3.5h2.2l1.6 4-2 1.3a11 11 0 0 0 5.8 5.8l1.3-2 4 1.6v2.2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5.6 5.7a2 2 0 0 1 2-2.2z"/></svg>188 3783 1302</a>' +
        '<a class="btn btn--ghost" href="assets/resume.pdf" target="_blank" rel="noopener">下载 PDF 简历</a>' +
      '</div>' +
      '<div class="footer"><span>© <span id="year">2026</span> 崔天一</span>' +
      '<span>纯 HTML / CSS 构建 · 无框架依赖</span></div>' +
    '</div></section>';
  }

  function paint() {
    var v = D.variants[key];
    document.title = v.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', v.description);
    var og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute('content', v.title);
    var ogd = document.querySelector('meta[property="og:description"]');
    if (ogd) ogd.setAttribute('content', v.eyebrow);

    document.getElementById("app").innerHTML =
      hero(v) + about(v) + experience(v) +
      cardsSection('projects', 'Projects', '项目经历', '', v.projects) +
      education(v) + skills(v) +
      cardsSection('opensource', 'Open Source', '开源作品', '将可复用的遥感与工程方法整理为开源工具，源码与运行方式均可公开查阅。', v.opensource) +
      honors(v) + contact(v);

    var sel = document.getElementById("variantSelect");
    if (sel) {
      if (!sel.options.length) {
        D.order.forEach(function (k) {
          var o = document.createElement("option");
          o.value = k;
          o.textContent = D.variants[k].label || k;
          sel.appendChild(o);
        });
      }
      sel.value = key;
    }
  }

  function rebindReveal() {
    var items = document.querySelectorAll(".reveal:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var ob = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        ob.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { ob.observe(el); });

    if (window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll(".card").forEach(function (card) {
        card.addEventListener("pointermove", function (e) {
          var r = card.getBoundingClientRect();
          card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
          card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        });
      });
    }
  }

  paint();

  var sel = document.getElementById("variantSelect");
  if (sel) {
    sel.addEventListener("change", function () {
      key = sel.value;
      try { localStorage.setItem("resume-variant", key); } catch (e) {}
      var url = window.location.pathname + "?v=" + key;
      window.history.replaceState(null, "", url);
      paint();
      rebindReveal();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
