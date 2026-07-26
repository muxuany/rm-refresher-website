import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const siteDir = resolve(scriptDir, "..");
const sourceDir = resolve(siteDir, "..", "yitai-website");
const zhDir = join(siteDir, "zh");

const htmlFiles = (root) => {
  const results = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory)) {
      const absolute = join(directory, entry);
      const rel = relative(root, absolute);
      const stats = statSync(absolute);
      if (stats.isDirectory()) {
        if (rel === "en" || rel.startsWith(`en${sep}`) || rel === "milk-tea" || rel.startsWith(`milk-tea${sep}`)) {
          continue;
        }
        visit(absolute);
      } else if (entry.endsWith(".html")) {
        results.push(absolute);
      }
    }
  };
  visit(root);
  return results;
};

const depthFor = (relPath) => relPath.split(sep).length - 1;
const prefixFor = (depth) => "../".repeat(depth);

const englishNav = (rootPrefix, zhHref) => `
      <nav class="site-nav" id="site-nav">
        <a href="${rootPrefix}index.html#home" data-home-replay>Home</a>
        <a href="${rootPrefix}milk-tea.html">MilkTea Collection</a>
        <div class="nav-group">
          <a href="${rootPrefix}products.html" class="nav-parent">Products</a>
          <div class="nav-dropdown">
            <span class="dropdown-label">Plant-Based Beverages</span>
            <a href="${rootPrefix}categories/instant-beverage.html">Instant Beverages</a>
            <a href="${rootPrefix}categories/concentrated-beverage.html">Concentrated Beverages</a>
            <a href="${rootPrefix}categories/ready-to-drink.html">Ready-to-Drink</a>
            <a href="${rootPrefix}sour-plum.html">Sour Plum Collection</a>
            <span class="dropdown-label">Oat Nutrition</span>
            <a href="${rootPrefix}categories/pure-oat.html">Pure Oats</a>
            <a href="${rootPrefix}categories/blended-oat.html">Blended Oats</a>
          </div>
        </div>
        <div class="nav-group">
          <a href="${rootPrefix}about/index.html" class="nav-parent">Yitai Partnership</a>
          <div class="nav-dropdown about-dropdown">
            <a href="${rootPrefix}about/focus.html">Philosophy &amp; Responsibility</a>
            <a href="${rootPrefix}about/quality-control.html">Quality &amp; Compliance</a>
            <a href="${rootPrefix}about/planting-base.html">Raw Materials &amp; Research</a>
            <a href="${rootPrefix}about/oem-odm.html">OEM/ODM Support</a>
            <a href="${rootPrefix}sour-plum.html">Sour Plum Collection</a>
          </div>
        </div>
        <a href="${rootPrefix}news.html">News</a>
        <form class="site-search-form" action="${rootPrefix}search.html" method="get" role="search">
          <label class="sr-only" for="site-search-en">Search the R&amp;M Trading LLC website</label>
          <input id="site-search-en" name="q" type="search" placeholder="Search site" autocomplete="off" />
          <button class="site-search-submit" type="submit" aria-label="Submit site search"></button>
        </form>
        <div class="language-toggle" aria-label="Language">
          <span aria-current="page">EN</span>
          <a href="${zhHref}" lang="zh-CN" aria-label="切换到中文">中</a>
        </div>
        <a class="nav-cta" href="${rootPrefix}contact.html">Contact</a>
      </nav>`;

const chineseNav = (internalPrefix, englishHref) => `
      <nav class="site-nav" id="site-nav">
        <a href="${internalPrefix}index.html#home" data-home-replay>首页</a>
        <a href="${internalPrefix}milk-tea.html">MilkTea Collection</a>
        <div class="nav-group">
          <a href="${internalPrefix}products.html" class="nav-parent">产品中心</a>
          <div class="nav-dropdown">
            <span class="dropdown-label">植物饮品系列</span>
            <a href="${internalPrefix}categories/instant-beverage.html">固体冲饮</a>
            <a href="${internalPrefix}categories/concentrated-beverage.html">浓缩饮品</a>
            <a href="${internalPrefix}categories/ready-to-drink.html">即饮饮品</a>
            <a href="${internalPrefix}sour-plum.html">酸梅晶 / 酸梅汤专区</a>
            <span class="dropdown-label">燕麦营养食品系列</span>
            <a href="${internalPrefix}categories/pure-oat.html">纯燕麦</a>
            <a href="${internalPrefix}categories/blended-oat.html">复合燕麦</a>
          </div>
        </div>
        <div class="nav-group">
          <a href="${internalPrefix}about/index.html" class="nav-parent">怡泰合作</a>
          <div class="nav-dropdown about-dropdown">
            <a href="${internalPrefix}about/focus.html">企业理念与责任</a>
            <a href="${internalPrefix}about/quality-control.html">企业资质与品控体系</a>
            <a href="${internalPrefix}about/planting-base.html">原料基地与科研合作</a>
            <a href="${internalPrefix}about/oem-odm.html">合作支持与口味定制</a>
            <a href="${internalPrefix}sour-plum.html">酸梅晶 / 酸梅汤专区</a>
          </div>
        </div>
        <a href="${internalPrefix}news.html">新闻</a>
        <form class="site-search-form" action="${internalPrefix}search.html" method="get" role="search">
          <label class="sr-only" for="site-search-zh">搜索全站内容</label>
          <input id="site-search-zh" name="q" type="search" placeholder="搜索全站" autocomplete="off" />
          <button class="site-search-submit" type="submit" aria-label="提交全站搜索"></button>
        </form>
        <div class="language-toggle" aria-label="语言">
          <a href="${englishHref}" lang="en" aria-label="Switch to English">EN</a>
          <span aria-current="page">中</span>
        </div>
        <a class="nav-cta" href="${internalPrefix}contact.html">联系我们</a>
      </nav>`;

const replaceHeaderBrand = (html, logoPath, homePath, locale) =>
  html.replace(
    /<a class="brand"[\s\S]*?<\/a>/,
    `<a class="brand" href="${homePath}#home" data-home-replay aria-label="${locale === "en" ? "R&M Trading LLC homepage and replay opening animation" : "R&M Trading LLC 首页并重新播放开场动画"}">
        <img class="brand-logo" src="${logoPath}" alt="R&M Trading LLC" />
      </a>`,
  );

const replaceFirstNav = (html, nav) =>
  html.replace(/<nav class="site-nav" id="site-nav">[\s\S]*?<\/nav>/, nav);

mkdirSync(zhDir, { recursive: true });
for (const sourceFile of htmlFiles(sourceDir)) {
  const relPath = relative(sourceDir, sourceFile);
  const targetFile = join(zhDir, relPath);
  mkdirSync(dirname(targetFile), { recursive: true });
  copyFileSync(sourceFile, targetFile);
}
copyFileSync(join(sourceDir, "script.js"), join(siteDir, "zh-script.js"));

for (const file of htmlFiles(siteDir).filter((path) => !path.startsWith(`${zhDir}${sep}`))) {
  const relPath = relative(siteDir, file);
  const depth = depthFor(relPath);
  const rootPrefix = prefixFor(depth);
  const zhHref = `${rootPrefix}zh/${relPath.split(sep).join("/")}`;
  let html = readFileSync(file, "utf8");
  html = html.replace(
    /<link rel="icon"[^>]*>/,
    `<link rel="icon" type="image/png" href="${rootPrefix}assets/rm-favicon.png" />`,
  );
  html = replaceFirstNav(html, englishNav(rootPrefix, zhHref));
  html = html.replace(
    /<nav aria-label="Footer navigation">([\s\S]*?)<\/nav>/,
    (match, content) =>
      content.includes(">News<")
        ? match
        : `<nav aria-label="Footer navigation">${content}<a href="${rootPrefix}news.html">News</a></nav>`,
  );
  writeFileSync(file, html);
}

for (const file of htmlFiles(zhDir)) {
  const relPath = relative(zhDir, file);
  const depth = depthFor(relPath);
  const internalPrefix = prefixFor(depth);
  const sharedPrefix = prefixFor(depth + 1);
  const englishHref = `${sharedPrefix}${relPath.split(sep).join("/")}`;
  let html = readFileSync(file, "utf8");
  html = html.replace(/<html lang="[^"]+">/, '<html lang="zh-CN">');
  html = html.replace(
    /<link rel="icon"[^>]*>/,
    `<link rel="icon" type="image/png" href="${sharedPrefix}assets/rm-favicon.png" />`,
  );
  html = html.replace(/href="(?:\.\.\/)*styles\.css/g, `href="${sharedPrefix}styles.css`);
  html = html.replace(/src="(?:\.\.\/)*script\.js/g, `src="${sharedPrefix}zh-script.js`);
  html = html.replace(/(src|href)="(?:\.\.\/)*assets\//g, `$1="${sharedPrefix}assets/`);
  html = replaceHeaderBrand(
    html,
    `${sharedPrefix}assets/rm-trading-logo.png`,
    `${internalPrefix}index.html`,
    "zh",
  );
  html = replaceFirstNav(html, chineseNav(internalPrefix, englishHref));
  html = html.replace(
    /<nav aria-label="页脚导航">([\s\S]*?)<\/nav>/,
    (match, content) =>
      content.includes(">新闻<")
        ? match
        : `<nav aria-label="页脚导航">${content}<a href="${internalPrefix}news.html">新闻</a></nav>`,
  );
  writeFileSync(file, html);
}

console.log(`Synchronized ${htmlFiles(zhDir).length} Chinese pages and updated English navigation.`);
