(() => {
  const currentScript = document.currentScript;
  if (!currentScript?.src) return;

  const rootUrl = new URL(".", currentScript.src);
  const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh");
  const languageRoot = isChinese ? new URL("zh/", rootUrl) : rootUrl;
  const pageUrl = (path) => new URL(path, languageRoot).href;
  const rootPageUrl = (path) => new URL(path, rootUrl).href;
  const currentUrl = new URL(window.location.href);
  const rootPath = decodeURI(rootUrl.pathname);
  const relativePath = decodeURI(currentUrl.pathname).startsWith(rootPath)
    ? decodeURI(currentUrl.pathname).slice(rootPath.length)
    : "";
  const languageRelativePath = relativePath.startsWith("zh/") ? relativePath.slice(3) : relativePath;
  const alternateUrl = isChinese
    ? rootPageUrl(languageRelativePath || "index.html")
    : rootPageUrl(`zh/${languageRelativePath || "index.html"}`);

  const copy = isChinese
    ? {
        home: "首页",
        about: "关于我们",
        products: "产品与解决方案",
        manufacturing: "制造与质量",
        cooperation: "B2B 合作",
        shop: "在线购买",
        news: "新闻与合规",
        contact: "联系我们",
        discuss: "洽谈 B2B 合作",
        menuOpen: "打开导航菜单",
        navLabel: "主导航",
        aboutItems: [
          ["关于 R&M Trading", "about-us.html#about-rm"],
          ["R&M 与怡泰食品", "about-us.html#relationship"],
          ["怡泰食品制造背景", "about-us.html#manufacturing-background"],
          ["企业理念", "about-us.html#philosophy"],
        ],
        productItems: [
          ["粉末冲调饮品", "products-solutions.html#powdered"],
          ["浓缩饮品", "products-solutions.html#concentrates"],
          ["即饮饮品", "products-solutions.html#ready-to-drink"],
          ["燕麦与谷物食品", "products-solutions.html#oats"],
          ["餐饮解决方案", "products-solutions.html#foodservice"],
          ["零售与渠道解决方案", "products-solutions.html#retail-distribution"],
        ],
        manufacturingItems: [
          ["生产制造能力", "manufacturing-quality.html#manufacturing"],
          ["研发与配方能力", "manufacturing-quality.html#research"],
          ["食品安全与质量管理", "manufacturing-quality.html#quality"],
          ["实验室与检测", "manufacturing-quality.html#laboratory"],
          ["批次追溯", "manufacturing-quality.html#traceability"],
          ["供应链与出口交付", "manufacturing-quality.html#fulfillment"],
        ],
        cooperationItems: [
          ["餐饮客户合作", "b2b-cooperation.html#foodservice"],
          ["经销与批发合作", "b2b-cooperation.html#distribution"],
          ["OEM 与 Private Label", "b2b-cooperation.html#oem"],
          ["产品开发流程", "b2b-cooperation.html#process"],
          ["申请样品", "samples.html"],
          ["获取产品目录", "downloads.html"],
        ],
        shopItems: [
          ["零售购买", "shop-retail.html"],
          ["批发购买", "shop-wholesale.html"],
          ["大宗与定制询价", "contact.html?channel=private-label-oem#inquiry"],
          ["询盘清单", "inquiry.html"],
        ],
        newsItems: [
          ["公司新闻", "news.html#company-news"],
          ["食品安全与合规", "news.html#compliance"],
          ["专业文章", "news.html#insights"],
          ["客户案例", "news.html#case-studies"],
        ],
        footerTagline: "连接成熟制造能力与北美食品饮料市场",
        footerCompany: "企业",
        footerCapabilities: "能力",
        footerBusiness: "合作与购买",
        footerResources: "资料",
        footerLegal: "隐私政策 · 使用条款 · 无障碍声明 · Cookie 设置",
      }
    : {
        home: "Home",
        about: "About Us",
        products: "Products & Solutions",
        manufacturing: "Manufacturing & Quality",
        cooperation: "B2B Cooperation",
        shop: "Shop",
        news: "News & Compliance",
        contact: "Contact",
        discuss: "Discuss B2B Cooperation",
        menuOpen: "Open navigation menu",
        navLabel: "Primary navigation",
        aboutItems: [
          ["About R&M Trading", "about-us.html#about-rm"],
          ["R&M & Yitai Food", "about-us.html#relationship"],
          ["Yitai Manufacturing Background", "about-us.html#manufacturing-background"],
          ["Our Philosophy", "about-us.html#philosophy"],
        ],
        productItems: [
          ["Powdered Beverages", "products-solutions.html#powdered"],
          ["Beverage Concentrates", "products-solutions.html#concentrates"],
          ["Ready-to-Drink Beverages", "products-solutions.html#ready-to-drink"],
          ["Oats & Grain-Based Foods", "products-solutions.html#oats"],
          ["Foodservice Solutions", "products-solutions.html#foodservice"],
          ["Retail & Distribution Solutions", "products-solutions.html#retail-distribution"],
        ],
        manufacturingItems: [
          ["Manufacturing Capabilities", "manufacturing-quality.html#manufacturing"],
          ["R&D and Formulation", "manufacturing-quality.html#research"],
          ["Food Safety & Quality Management", "manufacturing-quality.html#quality"],
          ["Laboratory & Testing", "manufacturing-quality.html#laboratory"],
          ["Traceability", "manufacturing-quality.html#traceability"],
          ["Supply Chain & Export Fulfillment", "manufacturing-quality.html#fulfillment"],
        ],
        cooperationItems: [
          ["Foodservice Cooperation", "b2b-cooperation.html#foodservice"],
          ["Distribution & Wholesale", "b2b-cooperation.html#distribution"],
          ["OEM & Private Label", "b2b-cooperation.html#oem"],
          ["Product Development Process", "b2b-cooperation.html#process"],
          ["Request Samples", "samples.html"],
          ["Request a Product Catalog", "downloads.html"],
        ],
        shopItems: [
          ["Retail Shop", "shop-retail.html"],
          ["Wholesale Shop", "shop-wholesale.html"],
          ["Bulk & Custom Inquiry", "contact.html?channel=private-label-oem#inquiry"],
          ["Inquiry List", "inquiry.html"],
        ],
        newsItems: [
          ["Company News", "news.html#company-news"],
          ["Food Safety & Compliance", "news.html#compliance"],
          ["Insights", "news.html#insights"],
          ["Case Studies", "news.html#case-studies"],
        ],
        footerTagline: "Connecting established manufacturing with the North American food and beverage market",
        footerCompany: "Company",
        footerCapabilities: "Capabilities",
        footerBusiness: "Business & Shop",
        footerResources: "Resources",
        footerLegal: "Privacy · Terms · Accessibility · Cookie Preferences",
      };

  const dropdown = (label, href, items, extraClass = "") => `
    <div class="nav-group ${extraClass}">
      <a class="nav-parent" href="${pageUrl(href)}">${label}</a>
      <div class="nav-dropdown">
        ${items.map(([itemLabel, itemHref]) => `<a href="${pageUrl(itemHref)}">${itemLabel}</a>`).join("")}
      </div>
    </div>`;

  const header = document.querySelector(".site-header");
  if (header) {
    header.innerHTML = `
      <a class="brand" href="${pageUrl("index.html")}" aria-label="R&M Trading LLC">
        <img class="brand-logo" src="${rootPageUrl("assets/rm-trading-logo.png")}" alt="R&M Trading LLC" />
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="${copy.menuOpen}">
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav hierarchy-nav" id="site-nav" aria-label="${copy.navLabel}">
        <a href="${pageUrl("index.html")}">${copy.home}</a>
        ${dropdown(copy.about, "about-us.html", copy.aboutItems)}
        ${dropdown(copy.products, "products-solutions.html", copy.productItems)}
        ${dropdown(copy.manufacturing, "manufacturing-quality.html", copy.manufacturingItems)}
        ${dropdown(copy.cooperation, "b2b-cooperation.html", copy.cooperationItems)}
        ${dropdown(copy.shop, "shop.html", copy.shopItems, "shop-nav-group")}
        ${dropdown(copy.news, "news.html", copy.newsItems)}
        <a href="${pageUrl("contact.html")}">${copy.contact}</a>
        <div class="language-toggle" aria-label="Language">
          ${isChinese ? `<a href="${alternateUrl}" lang="en">EN</a><span aria-current="page">中</span>` : `<span aria-current="page">EN</span><a href="${alternateUrl}" lang="zh-CN">中</a>`}
        </div>
        <a class="nav-cta hierarchy-cta" href="${pageUrl("contact.html?channel=b2b-cooperation#inquiry")}">${copy.discuss}</a>
      </nav>`;
  }

  const footer = document.querySelector(".site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="section-inner hierarchy-footer-grid">
        <div class="footer-brand-block">
          <img src="${rootPageUrl("assets/rm-trading-logo.png")}" alt="R&M Trading LLC" />
          <p>${copy.footerTagline}</p>
          <a href="mailto:marsyang@rmrefresher.com">marsyang@rmrefresher.com</a>
        </div>
        <nav aria-label="${copy.footerCompany}">
          <strong>${copy.footerCompany}</strong>
          <a href="${pageUrl("about-us.html")}">${copy.about}</a>
          <a href="${pageUrl("about-us.html#relationship")}">${isChinese ? "R&M 与怡泰食品" : "R&M & Yitai Food"}</a>
          <a href="${pageUrl("news.html")}">${copy.news}</a>
          <a href="${pageUrl("contact.html")}">${copy.contact}</a>
        </nav>
        <nav aria-label="${copy.footerCapabilities}">
          <strong>${copy.footerCapabilities}</strong>
          <a href="${pageUrl("products-solutions.html")}">${copy.products}</a>
          <a href="${pageUrl("manufacturing-quality.html")}">${copy.manufacturing}</a>
          <a href="${pageUrl("b2b-cooperation.html")}">${copy.cooperation}</a>
          <a href="${pageUrl("products.html")}">${isChinese ? "全部产品" : "All Products"}</a>
        </nav>
        <nav aria-label="${copy.footerBusiness}">
          <strong>${copy.footerBusiness}</strong>
          <a href="${pageUrl("shop.html")}">${copy.shop}</a>
          <a href="${pageUrl("shop-retail.html")}">${isChinese ? "零售购买" : "Retail Shop"}</a>
          <a href="${pageUrl("shop-wholesale.html")}">${isChinese ? "批发购买" : "Wholesale Shop"}</a>
          <a href="${pageUrl("samples.html")}">${isChinese ? "申请样品" : "Request Samples"}</a>
        </nav>
        <nav aria-label="${copy.footerResources}">
          <strong>${copy.footerResources}</strong>
          <a href="${pageUrl("downloads.html")}">${isChinese ? "产品目录" : "Product Catalog"}</a>
          <a href="${pageUrl("inquiry.html")}">${isChinese ? "询盘清单" : "Inquiry List"}</a>
          <a href="${pageUrl("faq.html")}">FAQ</a>
          <a href="${pageUrl("sitemap.html")}">${isChinese ? "网站地图" : "Sitemap"}</a>
        </nav>
      </div>
      <div class="section-inner footer-legal-row">
        <span>© 2026 R&M Trading LLC</span>
        <span>${copy.footerLegal}</span>
        <nav aria-label="${isChinese ? "法律页面" : "Legal pages"}">
          <a href="${pageUrl("privacy.html")}">${isChinese ? "隐私政策" : "Privacy"}</a>
          <a href="${pageUrl("terms.html")}">${isChinese ? "使用条款" : "Terms"}</a>
          <a href="${pageUrl("accessibility.html")}">${isChinese ? "无障碍声明" : "Accessibility"}</a>
          <a href="${pageUrl("cookies.html")}">${isChinese ? "Cookie 设置" : "Cookie Preferences"}</a>
        </nav>
      </div>`;
  }
})();
