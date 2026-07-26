import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { PDFDocument, StandardFonts, rgb } = require("/Users/marsmuxuanyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdf-lib");

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const productsDir = join(root, "products");
const outputDir = join(root, "assets", "downloads", "specs");
const categoryOutputDir = join(root, "assets", "downloads", "category-specs");
mkdirSync(outputDir, { recursive: true });
mkdirSync(categoryOutputDir, { recursive: true });
const files = readdirSync(productsDir).filter((file) => file.endsWith(".html"));
const clean = (value) => value.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const find = (html, expression) => clean(html.match(expression)?.[1] || "");
const wrap = (text, font, size, width) => {
  const words = text.replaceAll("\n", " \n ").split(" "); const lines = []; let line = "";
  words.forEach((word) => { if (word === "\n") { if (line) lines.push(line); line = ""; return; } const next = line ? `${line} ${word}` : word; if (font.widthOfTextAtSize(next, size) > width && line) { lines.push(line); line = word; } else line = next; });
  if (line) lines.push(line); return lines;
};
async function pdf(lines, file) {
  const doc = await PDFDocument.create(); const page = doc.addPage([612, 792]); const bold = await doc.embedFont(StandardFonts.HelveticaBold); const regular = await doc.embedFont(StandardFonts.Helvetica);
  let y = 740; page.drawText("R&M TRADING LLC", { x: 48, y, font: bold, size: 14, color: rgb(0.04, 0.29, 0.16) }); y -= 28;
  lines.forEach(([label, value, heading]) => {
    if (heading) { page.drawText(value, { x: 48, y, font: bold, size: 22, color: rgb(0.03, 0.18, 0.1) }); y -= 34; return; }
    page.drawText(label.toUpperCase(), { x: 48, y, font: bold, size: 8, color: rgb(0.05, 0.42, 0.24) }); y -= 14;
    wrap(value, regular, 10, 500).forEach((line) => { page.drawText(line, { x: 48, y, font: regular, size: 10, color: rgb(0.1, 0.16, 0.13) }); y -= 14; }); y -= 8;
  });
  page.drawText("For B2B review only. Final specification, case configuration, MOQ and compliance scope are confirmed per project.", { x: 48, y: 42, font: regular, size: 8, color: rgb(0.35, 0.4, 0.36) });
  writeFileSync(file, await doc.save());
}
const catalog = [];
for (const file of files) {
  const html = readFileSync(join(productsDir, file), "utf8");
  const code = find(html, /<p class="eyebrow">Product\s+(\d+)<\/p>/i);
  const name = find(html, /<h1>([\s\S]*?)<\/h1>/i);
  const category = find(html, /<nav class="breadcrumb">[\s\S]*?<a[^>]*>Products<\/a>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i);
  const spec = find(html, /<h3>Specification<\/h3><p>([\s\S]*?)<\/p>/i);
  const application = find(html, /<h3>Applications<\/h3><p>([\s\S]*?)<\/p>/i);
  const commercial = find(html, /<h3>Commercial Value<\/h3><p>([\s\S]*?)<\/p>/i);
  if (!code || !name) continue;
  await pdf([["", name, true], ["Product Number", code], ["Product Format", category || "Available on request"], ["Specification", spec || "Available on request"], ["Applications", application || "Available on request"], ["Packaging Format", "Confirmed by final specification"], ["Units per Case", "Confirmed by final specification"], ["Shelf Life", "Confirmed by final specification"], ["Preparation / Dilution Ratio", "Confirmed by final specification"], ["Storage Conditions", "Confirmed by final specification"], ["Target Channels", "Foodservice, private label/OEM, retail and distribution"], ["Customizable Elements", "Flavor, packaging, pack size and label scope subject to project review"], ["MOQ", "Confirmed by product and packaging scope"], ["Sample Availability", "Subject to product availability and project review"], ["Applicable Certifications", "Provided as applicable during compliance review"], ["Commercial Value", commercial || "Available on request"]], join(outputDir, `RM-product-${code}.pdf`));
  catalog.push(`${code}  ${name}  |  ${category}  |  ${spec}`);
}
await pdf([["", "R&M Trading LLC Product Catalog", true], ["Overview", "Focused beverage and oat nutrition formats for foodservice, private label/OEM, retail and distribution."], ["Product Range", `${catalog.length} product references across powder-form beverages, concentrated beverages, ready-to-drink beverages and oat products.`], ["Commercial Review", "Request the current product list, individual specification sheets, samples, applicable compliance materials and project-specific MOQ or packaging guidance from R&M Trading LLC."], ["B2B Formats", "Powder, concentrate and ready-to-drink formats with project-specific flavor, packaging, label and channel discussions."], ["Next Step", "Use the online Inquiry List to select products, then submit commercial requirements in one request."]], join(root, "assets", "downloads", "rm-product-catalog.pdf"));
const categorySheets = [
  ["instant-beverage", "Powder-Form Beverages", "Shelf-stable beverage powders for flexible preparation across retail, foodservice and commercial programs.", "Home preparation, office beverages, foodservice support, retail and commercial beverage programs."],
  ["concentrated-beverage", "Concentrated Beverages", "Concentrated plant-based beverages for flexible dilution, stable flavor and commercial application.", "Foodservice beverage programs, beverage bases, culinary applications and commercial product development."],
  ["ready-to-drink", "Ready-to-Drink Beverages", "Finished beverage formats for convenient retail, dining and on-the-go consumption.", "Retail, foodservice pairings, convenience, office and seasonal cold beverage programs."],
  ["oat-products", "Oat Products", "Pure and blended oat products for breakfast, nutrition and repeat purchase occasions.", "Retail, breakfast programs, nutrition-focused offerings and private-label discussions."],
  ["pure-oat", "Pure Oat Products", "Straightforward oat formats built around familiar breakfast and nutrition occasions.", "Retail, breakfast programs and everyday nutrition offerings."],
  ["blended-oat", "Blended Oat Products", "Oat-based blends developed for convenient nutrition and flexible product development.", "Breakfast, nutrition programs, retail and private-label discussions."],
];
for (const [slug, name, overview, applications] of categorySheets) {
  await pdf([["", name, true], ["Category Overview", overview], ["Applications", applications], ["Product References", "See the online category list for current products and individual product specification sheets."], ["Packaging & Specifications", "Confirmed by product, channel and project requirements."], ["Sample Availability", "Subject to product availability and project review."], ["Commercial Review", "R&M Trading LLC can coordinate samples, current product details, packaging discussions and project-specific specifications."]], join(categoryOutputDir, `RM-category-${slug}.pdf`));
}
console.log(`Generated ${catalog.length} product specification PDFs, ${categorySheets.length} category specification PDFs and catalog.`);
