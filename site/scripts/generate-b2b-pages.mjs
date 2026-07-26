import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const email = "marsyang@rmrefresher.com";
const shared = {
  en: {
    home: "Home", wholesale: "Wholesale", partnership: "Yitai Partnership", news: "News", contact: "Contact R&M", inquiry: "Inquiry List", samples: "Request Samples",
    formTitle: "Tell us what you are building.", formText: "Share your commercial requirements and R&M will coordinate the appropriate product, sample and manufacturing conversation.",
    fields: ["Name", "Company", "Business Email", "Country / Region", "Customer Type", "Products of Interest", "Estimated Purchase Volume", "OEM / Private Label Need", "Message", "Attachment"],
  },
  zh: {
    home: "首页", wholesale: "产品中心", partnership: "怡泰合作", news: "新闻", contact: "联系 R&M", inquiry: "询盘清单", samples: "申请样品",
    formTitle: "告诉我们您希望开发什么。", formText: "请分享您的商务需求，R&M 将协调适合的产品、样品及制造支持沟通。",
    fields: ["姓名", "公司", "商务邮箱", "国家 / 地区", "客户类型", "感兴趣产品", "预计采购量", "OEM / Private Label 需求", "留言", "附件"],
  },
};

function chrome(lang, title, body) {
  const z = lang === "zh";
  const c = shared[lang];
  const assetPrefix = z ? "../" : "";
  const pagePrefix = "";
  const script = z ? "../zh-script.js?v=20260724-2" : "en-script.js?v=20260724-2";
  const css = z ? "../styles.css?v=20260725-10" : "styles.css?v=20260725-10";
  const language = z ? `<div class="language-toggle" aria-label="Language"><a href="../${title.file}">EN</a><span aria-current="page">中</span></div>` : `<div class="language-toggle" aria-label="Language"><span aria-current="page">EN</span><a href="zh/${title.file}">中</a></div>`;
  return `<!doctype html><html lang="${z ? "zh-CN" : "en"}"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${title.text} | R&amp;M Trading LLC</title><meta name="description" content="${title.description}" /><link rel="icon" type="image/png" href="${assetPrefix}assets/rm-favicon.png" /><link rel="stylesheet" href="${css}" /></head><body><header class="site-header" data-header><a class="brand" href="${pagePrefix}index.html#home" data-home-replay aria-label="R&M Trading LLC"><img class="brand-logo" src="${assetPrefix}assets/rm-trading-logo.png" alt="R&M Trading LLC" /></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="${z ? "打开导航菜单" : "Open navigation menu"}"><span></span><span></span><span></span></button><nav class="site-nav" id="site-nav"><a href="${pagePrefix}index.html#home" data-home-replay>${c.home}</a><a href="${pagePrefix}milk-tea.html">${z ? "奶茶系列" : "MilkTea Collection"}</a><a href="${pagePrefix}products.html">${c.wholesale}</a><a href="${pagePrefix}about/index.html">${c.partnership}</a><a href="${pagePrefix}news.html">${c.news}</a><a href="${pagePrefix}inquiry.html">${c.inquiry}<span data-inquiry-count></span></a>${language}<a class="nav-cta" href="${pagePrefix}samples.html">${c.samples}</a></nav></header>${body}<footer class="site-footer"><div class="section-inner footer-grid"><div><strong>R&amp;M Trading LLC</strong><p>${z ? "怡泰食品美国进口商与 B2B 渠道合作伙伴" : "U.S. Importer and B2B Channel Partner for Yitai Food"}</p></div><nav aria-label="Footer navigation"><a href="${pagePrefix}products.html">${c.wholesale}</a><a href="${pagePrefix}downloads.html">${z ? "资料下载" : "Downloads"}</a><a href="${pagePrefix}samples.html">${c.samples}</a><a href="${pagePrefix}privacy.html">${z ? "隐私政策" : "Privacy"}</a><a href="${pagePrefix}terms.html">${z ? "使用条款" : "Terms"}</a><a href="${pagePrefix}sitemap.html">Sitemap</a></nav></div></footer><script src="${script}"></script><script src="${assetPrefix}b2b.js?v=20260725-8"></script></body></html>`;
}

function form(lang, kind, selected = false) {
  const z = lang === "zh";
  const c = shared[lang];
  const isSample = kind === "sample";
  const subject = isSample ? "New R&M Trading LLC sample request" : "New R&M Trading LLC B2B inquiry";
  const next = `https://rmrefresher.com/${z ? "zh/" : ""}thanks.html`;
  const select = (name, options) => `<label><span>${name} *</span><select name="${name}" required><option value="">${z ? "请选择" : "Select"}</option>${options.map((x) => `<option>${x}</option>`).join("")}</select></label>`;
  return `<form class="inquiry-form-shell" action="https://formsubmit.co/${email}" method="POST" enctype="multipart/form-data" data-b2b-form><input type="hidden" name="_subject" value="${subject}" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_next" value="${next}" /><input type="hidden" name="_autoresponse" value="${z ? "感谢联系 R&M Trading LLC。我们已收到您的信息，并将尽快回复。" : "Thank you for contacting R&M Trading LLC. We received your information and will follow up shortly."}" /><input type="text" name="_honey" class="form-honeypot" tabindex="-1" autocomplete="off" /><input type="hidden" name="Selected products" data-selected-products /><div class="form-grid"><label><span>${c.fields[0]} *</span><input name="Name" autocomplete="name" required /></label><label><span>${c.fields[1]} *</span><input name="Company" autocomplete="organization" required /></label><label><span>${c.fields[2]} *</span><input name="email" type="email" autocomplete="email" required /></label><label><span>${c.fields[3]} *</span><input name="Country or region" autocomplete="country-name" required /></label>${select(c.fields[4], z ? ["餐饮渠道", "自有品牌 / OEM", "零售与商超", "经销商", "其他"] : ["Foodservice", "Private Label / OEM", "Retail & Grocery", "Distributor", "Other"])}<label><span>${c.fields[5]}</span><input name="Products of interest" /></label><label><span>${c.fields[6]}</span><input name="Estimated purchase volume" /></label>${select(c.fields[7], z ? ["OEM", "Private Label", "两者都需要", "暂不需要"] : ["OEM", "Private Label", "Both", "Not required"])}${isSample ? `<label><span>${z ? "样品数量 / 规格" : "Sample Quantity / Format"} *</span><input name="Sample quantity or format" required /></label><label><span>${z ? "收货地址" : "Shipping Address"} *</span><input name="Shipping address" required /></label>` : ""}<label class="full"><span>${c.fields[8]} *</span><textarea name="Message" rows="5" required placeholder="${z ? "请说明目标渠道、产品需求、包装形式、时间安排及其他关键要求。" : "Tell us the target channel, product needs, packaging format, timing and key requirements."}"></textarea></label><label class="full"><span>${c.fields[9]}</span><input name="attachment" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" /><small class="form-file-note">${z ? "可选。附件总大小上限为 10MB。" : "Optional. Maximum total upload size: 10MB."}</small></label></div><div class="inquiry-submit-row"><p data-form-status>${z ? "表单受垃圾信息验证保护。提交后您会收到自动确认邮件。" : "Protected by spam verification. You will receive an automatic confirmation email after submission."}</p><button class="button primary" type="submit">${isSample ? (z ? "提交样品申请" : "Submit Sample Request") : (z ? "提交 B2B 询盘" : "Submit B2B Inquiry")}</button></div></form>`;
}

function page(lang, file, title, body) { return chrome(lang, { file, text: title, description: title }, body); }
function portal(lang, eyebrow, heading, text, content) {
  return `<main class="portal-main"><section class="portal-hero"><div class="section-inner"><p class="eyebrow">${eyebrow}</p><h1>${heading}</h1><p>${text}</p></div></section>${content}</main>`;
}

for (const lang of ["en", "zh"]) {
  const z = lang === "zh";
  const out = (file, content) => { const dir = z ? resolve(root, "zh") : root; mkdirSync(dir, { recursive: true }); writeFileSync(resolve(dir, file), content); };
  const contact = portal(lang, z ? "联系 R&M" : "Contact R&M", z ? "沟通美国 B2B 产品机会" : "Discuss U.S. B2B product opportunities", z ? "R&M Trading LLC 为美国客户提供产品沟通、样品、规格讨论与商务跟进支持。" : "R&M Trading LLC supports customers with product communication, samples, specifications and commercial follow-up.", `<section class="detail-section"><div class="section-inner contact-info-grid"><article><h2>${z ? "公司" : "Company"}</h2><p>R&M Trading LLC</p></article><article><h2>${z ? "联系人" : "Contact"}</h2><p>Mars Yang</p></article><article><h2>${z ? "邮箱" : "Email"}</h2><p><a href="mailto:${email}">${email}</a></p></article><article><h2>${z ? "地址" : "Address"}</h2><p>5808 Lake Washington Blvd SE, Bellevue, WA 98006</p></article></div></section><section class="inquiry-section" id="inquiry"><div class="section-inner inquiry-layout"><div class="inquiry-intro"><p class="eyebrow">${z ? "专业询盘" : "Professional Inquiry"}</p><h2>${shared[lang].formTitle}</h2><p>${shared[lang].formText}</p></div>${form(lang, "contact")}</div></section>`);
  out("contact.html", page(lang, "contact.html", z ? "联系 R&M" : "Contact R&M", contact));
  const inquiry = portal(lang, z ? "B2B 询价清单" : "B2B Inquiry List", z ? "已选产品与合作需求" : "Selected Products & Commercial Requirements", z ? "将多个产品加入清单，再一次性提交产品、规格和合作需求。" : "Add several products to one list, then submit product, specification and commercial requirements together.", `<section class="detail-section"><div class="section-inner"><div class="inquiry-list" data-inquiry-list></div></div></section><section class="inquiry-section"><div class="section-inner inquiry-layout"><div class="inquiry-intro"><p class="eyebrow">${z ? "统一提交" : "One Submission"}</p><h2>${shared[lang].formTitle}</h2><p>${shared[lang].formText}</p></div>${form(lang, "inquiry", true)}</div></section>`);
  out("inquiry.html", page(lang, "inquiry.html", z ? "询盘清单" : "Inquiry List", inquiry));
  const samples = portal(lang, z ? "申请样品" : "Request Samples", z ? "为您的团队申请产品样品" : "Request Product Samples for Your Team", z ? "样品申请独立于普通咨询，便于确认样品产品、规格与物流信息。" : "A dedicated workflow for identifying sample products, formats and shipping requirements.", `<section class="inquiry-section"><div class="section-inner inquiry-layout"><div class="inquiry-intro"><p class="eyebrow">${z ? "样品流程" : "Sample Workflow"}</p><h2>${z ? "先确认适合测试的产品。" : "Start with the products worth testing."}</h2><p>${z ? "样品需视产品可用性、运输条件、合规文件和项目阶段进行确认。" : "Sample availability is confirmed by product availability, shipping conditions, compliance documentation and project stage."}</p></div>${form(lang, "sample")}</div></section>`);
  out("samples.html", page(lang, "samples.html", z ? "申请样品" : "Request Samples", samples));
  const downloads = portal(lang, z ? "资料下载" : "Downloads", z ? "产品目录与 B2B 资料" : "Catalogs & B2B Materials", z ? "下载产品集合资料，并在单品详情页获取规格页。" : "Download product collection materials and use individual product pages for specification sheets.", `<section class="detail-section"><div class="section-inner b2b-cta-grid"><a class="button primary" href="${z ? "../" : ""}assets/downloads/rm-product-catalog.pdf" download>${z ? "下载产品目录" : "Download Product Catalog"}</a><a class="button secondary" href="${z ? "../" : ""}assets/certifications/certification-logos.pdf" download>${z ? "下载合规资料" : "Download Compliance Overview"}</a><a class="button secondary" href="samples.html">${z ? "申请样品" : "Request Samples"}</a></div></section>`);
  out("downloads.html", page(lang, "downloads.html", z ? "资料下载" : "Downloads", downloads));
  const thanks = portal(lang, z ? "提交成功" : "Submission Received", z ? "我们已收到您的信息。" : "We received your information.", z ? "R&M 会根据产品、样品或合作需求进行后续沟通。" : "R&M will follow up based on the product, sample or commercial requirement you shared.", `<section class="detail-section"><div class="section-inner"><a class="button primary" href="${z ? "products.html" : "products.html"}">${z ? "继续浏览产品" : "Continue to Wholesale"}</a></div></section>`);
  out("thanks.html", page(lang, "thanks.html", z ? "提交成功" : "Submission Received", thanks));
  const legal = [
    ["privacy.html", z ? "隐私政策" : "Privacy Policy", z ? "说明网站如何处理询盘、样品申请与附件信息。" : "How R&M handles inquiry, sample-request and attachment information."],
    ["terms.html", z ? "使用条款" : "Terms of Use", z ? "网站资料仅用于商业信息参考与合作沟通。" : "Website materials are provided for commercial reference and business discussions."],
    ["accessibility.html", z ? "无障碍声明" : "Accessibility Statement", z ? "我们持续改善网站在不同设备与辅助技术下的可用性。" : "We continue to improve access across devices and assistive technologies."],
    ["cookies.html", z ? "Cookie 偏好" : "Cookie Preferences", z ? "本网站使用必要的本地存储来保留询盘清单。" : "This website uses necessary local storage to retain an inquiry list."],
    ["faq.html", z ? "常见问题" : "FAQ", z ? "了解样品、MOQ、OEM/Private Label、合规资料和交付沟通。" : "Learn about samples, MOQ, OEM/private label, compliance materials and delivery discussions."],
    ["sample-policy.html", z ? "样品政策" : "Sample Policy", z ? "样品按产品可用性、项目阶段、物流与合规条件确认。" : "Samples are confirmed by availability, project stage, shipping and compliance conditions."],
    ["sitemap.html", "Sitemap", z ? "快速进入产品、样品、下载、合规与联系页面。" : "Quick access to products, samples, downloads, compliance and contact pages."],
  ];
  legal.forEach(([file, heading, text]) => {
    const extra = file === "faq.html" ? `<div class="section-inner spec-grid"><article class="spec-card"><h3>MOQ</h3><p>${z ? "因产品、包装与项目而异，请提交询盘确认。" : "Varies by product, packaging and project; submit an inquiry to confirm."}</p></article><article class="spec-card"><h3>OEM / Private Label</h3><p>${z ? "可根据项目范围讨论。" : "Available for discussion by project scope."}</p></article><article class="spec-card"><h3>${z ? "合规资料" : "Compliance Materials"}</h3><p>${z ? "可在专业沟通中提供适用资料。" : "Applicable materials are shared during professional review."}</p></article></div>` : "";
    const map = file === "sitemap.html" ? `<div class="section-inner b2b-cta-grid"><a class="button secondary" href="products.html">${shared[lang].wholesale}</a><a class="button secondary" href="inquiry.html">${shared[lang].inquiry}</a><a class="button secondary" href="samples.html">${shared[lang].samples}</a><a class="button secondary" href="downloads.html">${z ? "资料下载" : "Downloads"}</a><a class="button secondary" href="news.html">${shared[lang].news}</a><a class="button secondary" href="contact.html">${shared[lang].contact}</a></div>` : "";
    out(file, page(lang, file, heading, portal(lang, heading, heading, text, `<section class="detail-section"><div class="section-inner"><p>${z ? "如有关于信息使用、资料下载、样品申请或合作沟通的问题，请联系 R&M Trading LLC。" : "For questions about information use, downloads, samples or commercial discussions, contact R&M Trading LLC."}</p></div></section>${extra}${map}`)));
  });
}
