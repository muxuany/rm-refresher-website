import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const updates = [
  {
    file: resolve(siteDir, "search.html"),
    marker: '<a class="site-search-card" href="milk-tea.html"',
    card:
      '<a class="site-search-card" href="news.html" data-site-search-card data-search="News Public statements compliance certification recall updates"><span>R&amp;M Trading LLC</span><strong>News</strong><p>Public statements, certification materials and compliance updates</p><i aria-hidden="true"></i></a>',
  },
  {
    file: resolve(siteDir, "zh", "search.html"),
    marker: '<a class="site-search-card" href="milk-tea.html"',
    card:
      '<a class="site-search-card" href="news.html" data-site-search-card data-search="新闻 公开声明 合规 认证 召回 更新"><span>R&amp;M Trading LLC</span><strong>新闻</strong><p>公开声明、认证资料与合规信息更新</p><i aria-hidden="true"></i></a>',
  },
];

for (const update of updates) {
  let html = readFileSync(update.file, "utf8");
  if (html.includes(update.card)) continue;
  const index = html.indexOf(update.marker);
  if (index === -1) {
    throw new Error(`Search-card insertion marker was not found in ${update.file}`);
  }
  html = `${html.slice(0, index)}${update.card}${html.slice(index)}`;
  writeFileSync(update.file, html);
}

console.log("Added News to both site-search indexes.");
