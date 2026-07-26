(() => {
  const chinese = document.documentElement.lang.toLowerCase().startsWith("zh");
  const slug = new URLSearchParams(window.location.search).get("category") || "instant-beverage";
  const entries = {
    "instant-beverage": {
      en: { name: "Powder-Form Beverages", eyebrow: "Category Details", summary: "Shelf-stable drink powders for convenient preparation across retail, foodservice and everyday occasions.", image: "assets/solid-drink-group.png", alt: "Powder-form beverage products", points: [["Format", "Instant powders and granular drink mixes designed for simple preparation and stable storage."], ["Applications", "Household use, office refreshment, retail shelves, foodservice programs and commercial beverage service."], ["Commercial fit", "Flexible pack sizes and efficient storage support repeat purchasing and channel replenishment."]] },
      zh: { name: "粉末冲饮", eyebrow: "品类详情", summary: "适合零售、餐饮与日常冲泡的常温储存饮品粉末，兼顾便捷冲调与稳定储存。", image: "assets/solid-drink-group.png", alt: "粉末冲饮产品组合", points: [["产品形式", "包含速溶粉末与颗粒冲饮产品，便于日常冲调并保持稳定储存。"], ["应用场景", "家庭、办公室、零售陈列、餐饮配套及商用饮品服务。"], ["商用适配", "规格灵活、储存运输高效，适合长期复购和渠道补货。"]] },
    },
    "concentrated-beverage": {
      en: { name: "Concentrated Beverages", eyebrow: "Category Details", summary: "Concentrated beverage formats developed for flexible dilution, stable flavor and professional preparation.", image: "assets/concentrated-group.png", alt: "Concentrated beverage products", points: [["Format", "Concentrated juices, syrups and beverage bases for controlled dilution and flavor development."], ["Applications", "Foodservice mixing, beverage bases, kitchen use, smoothies, desserts and commercial product development."], ["Commercial fit", "High concentration and varied packaging help operators improve storage efficiency and preparation consistency."]] },
      zh: { name: "浓缩饮品", eyebrow: "品类详情", summary: "用于灵活调配、稳定风味和专业饮品应用的浓缩饮品形式。", image: "assets/concentrated-group.png", alt: "浓缩饮品产品组合", points: [["产品形式", "包含浓缩汁、浓浆和饮品基底，便于控制稀释比例与风味表现。"], ["应用场景", "餐饮调饮、茶饮基底、后厨应用、冰沙、甜品与商用产品研发。"], ["商用适配", "浓缩倍率与多种包装提高储存效率，并帮助稳定出品。"]] },
    },
    "ready-to-drink": {
      en: { name: "Ready-to-Drink Beverages", eyebrow: "Category Details", summary: "Convenient ready-to-drink products for retail, dining and everyday refreshment occasions.", image: "assets/rtd-group.png", alt: "Ready-to-drink beverage products", points: [["Format", "Bottled, pouch and other ready-to-drink formats for immediate serving."], ["Applications", "Family use, meal pairing, convenience retail, office refreshment and chilled seasonal consumption."], ["Commercial fit", "Clear consumption occasions and consistent flavor support foodservice, grocery and convenience channels."]] },
      zh: { name: "即饮饮品", eyebrow: "品类详情", summary: "面向零售、餐饮与日常饮用场景的开盖即饮产品。", image: "assets/rtd-group.png", alt: "即饮饮品产品组合", points: [["产品形式", "包含瓶装、袋装等开盖即饮形式，适合直接供应与陈列。"], ["应用场景", "家庭饮用、餐饮配餐、便利零售、办公室补给及夏季冷饮。"], ["商用适配", "消费场景清晰、口味稳定，适合餐饮、商超与便利渠道。"]] },
    },
    "oat-products": {
      en: { name: "Oat Products", eyebrow: "Category Details", summary: "A focused oat portfolio covering pure oats and blended oat products for breakfast and long-term nutrition occasions.", image: "assets/oat-group.png", alt: "Oat product collection", points: [["Product ranges", "Pure oats for simple daily use and blended oats for convenient breakfast and varied nutrition needs."], ["Applications", "Family breakfast, office meals, meal pairing and long-term household nutrition."], ["Commercial fit", "Stable breakfast habits and adaptable formats support retail, foodservice and private-label conversations."]] },
      zh: { name: "燕麦产品", eyebrow: "品类详情", summary: "以纯燕麦与复合燕麦为核心，服务早餐与长期营养消费场景。", image: "assets/oat-group.png", alt: "燕麦产品组合", points: [["产品分区", "纯燕麦适合简洁日常食用；复合燕麦满足便捷早餐与多元营养需求。"], ["应用场景", "家庭早餐、办公室早餐、餐食搭配及长期家庭营养。"], ["商用适配", "稳定的早餐消费习惯和灵活规格支持零售、餐饮及定制沟通。"]] },
    },
    "pure-oat": {
      en: { name: "Pure Oat Series", eyebrow: "Category Details", summary: "Straightforward oat products for daily breakfast, family nutrition and long-term household consumption.", image: "assets/pure-oat-group.png", alt: "Pure oat products", points: [["Product focus", "Simple oat products that keep the ingredient and preparation experience straightforward."], ["Applications", "Breakfast bowls, milk or hot-water preparation, office breakfast and family pantry use."], ["Commercial fit", "A familiar, repeatable breakfast category with clear retail and household use cases."]] },
      zh: { name: "纯燕麦系列", eyebrow: "品类详情", summary: "配方简洁的燕麦产品，适合日常早餐、家庭营养与长期储备。", image: "assets/pure-oat-group.png", alt: "纯燕麦产品", points: [["产品重点", "以燕麦本身为核心，提供简单直观的食用体验。"], ["应用场景", "早餐碗、牛奶或热水冲泡、办公室早餐与家庭常备。"], ["商用适配", "消费习惯清晰、复购稳定，适合零售与家庭食品渠道。"]] },
    },
    "blended-oat": {
      en: { name: "Blended Oat Series", eyebrow: "Category Details", summary: "Oat and grain blends developed around convenient breakfast and varied nutrition needs.", image: "assets/blended-oat-group.png", alt: "Blended oat products", points: [["Product focus", "Oat blends developed with grains and nutrition ingredients for a more varied breakfast format."], ["Applications", "Convenient breakfasts, meal replacement occasions, office meals and household nutrition support."], ["Commercial fit", "The formula can be discussed around target consumers, nutrition direction and private-label requirements."]] },
      zh: { name: "复合燕麦系列", eyebrow: "品类详情", summary: "燕麦与谷物复合产品，适合便捷早餐与多元营养需求。", image: "assets/blended-oat-group.png", alt: "复合燕麦产品", points: [["产品重点", "围绕燕麦、谷物和营养原料组合，丰富早餐的口感与营养方向。"], ["应用场景", "便捷早餐、代餐、办公室快餐与家庭营养补充。"], ["商用适配", "可围绕目标人群、营养方向和定制需求进一步沟通配方。"]] },
    },
    "sour-plum": {
      en: { name: "Sour Plum Collection", eyebrow: "Category Details", summary: "A signature collection spanning instant crystals, ready-to-drink beverages and concentrates rooted in Yitai's sour plum beverage heritage.", image: "assets/brochure/sour-plum-crystal-classic.webp", alt: "Sour plum crystal product", points: [["Product ranges", "Instant sour plum crystals, ready-to-drink sour plum beverages, concentrates and foodservice syrups."], ["Ingredients & process", "Built around smoked plum, hawthorn, licorice and osmanthus with accumulated extraction and processing experience."], ["Commercial fit", "A recognizable traditional flavor with retail, restaurant, beverage service and commercial preparation applications."]] },
      zh: { name: "酸梅汤系列", eyebrow: "品类详情", summary: "以怡泰酸梅饮品传承为基础，覆盖酸梅晶、即饮酸梅汤与浓缩饮品。", image: "assets/brochure/sour-plum-crystal-classic.webp", alt: "酸梅晶产品", points: [["产品分区", "包含酸梅晶、即饮酸梅汤、浓缩汁及餐饮浓浆等产品形式。"], ["原料与工艺", "围绕乌梅、山楂、甘草、桂花等原料，持续积累提取与加工经验。"], ["商用适配", "传统风味认知清晰，可用于零售、餐饮、饮品服务与商用调制。"]] },
    },
  };
  const entry = entries[slug]?.[chinese ? "zh" : "en"] || entries["instant-beverage"][chinese ? "zh" : "en"];
  const root = document.querySelector("[data-category-detail]");
  if (!root) return;
  const assetPrefix = chinese ? "../" : "";
  const productsHref = slug === "sour-plum" ? "sour-plum.html" : `categories/${slug}.html`;
  const backLabel = chinese ? "查看该品类所有产品" : "View All Products in This Category";
  const wholesaleLabel = chinese ? "产品中心" : "Wholesale";
  const languageLink = document.querySelector(".language-toggle a");
  if (languageLink) languageLink.href = `${chinese ? "../category-details.html" : "zh/category-details.html"}?category=${encodeURIComponent(slug)}`;
  document.title = `${entry.name} | R&M Trading LLC`;
  root.innerHTML = `
    <section class="detail-hero"><div class="section-inner">
      <nav class="breadcrumb" aria-label="${chinese ? "面包屑" : "Breadcrumb"}"><a href="products.html">${wholesaleLabel}</a><span>/</span><span>${entry.name}</span></nav>
      <div class="detail-hero-grid"><div><p class="eyebrow">${entry.eyebrow}</p><h1>${entry.name}</h1><p>${entry.summary}</p><div class="category-detail-actions"><a class="button primary" href="${productsHref}">${backLabel}</a></div></div><div class="detail-hero-img"><img src="${assetPrefix}${entry.image}" alt="${entry.alt}" /></div></div>
    </div></section>
    <section class="detail-section alt"><div class="section-inner detail-grid"><div><h2>${chinese ? "品类信息" : "Category Overview"}</h2></div><div class="info-card-grid">${entry.points.map(([title, text]) => `<article class="info-card"><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>
  `;
})();
