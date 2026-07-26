(() => {
  const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh");
  const siteBase = isChinese ? "/zh/" : "/";
  const labels = isChinese
    ? {
        inquiry: "询盘清单",
        add: "加入询盘",
        added: "已加入询盘",
        addedNotice: "已加入询盘清单",
        alreadyAdded: "该产品已在询盘清单中",
        openInquiry: "打开询盘清单",
        undo: "撤销",
        addCategory: "加入品类询盘",
        download: "下载产品规格页",
        downloadCategory: "下载品类规格页",
        empty: "尚未选择产品。可从产品中心或任一产品详情页加入询盘。",
        selected: "已选产品",
        remove: "移除",
        sending: "正在安全提交...",
        format: "产品形式",
        application: "应用场景",
        packaging: "包装形式",
        flavor: "风味",
        sugar: "糖度",
        service: "服务类型",
        pack: "规格",
        all: "全部",
      }
    : {
        inquiry: "Inquiry List",
        add: "Add to Inquiry",
        added: "Added to Inquiry",
        addedNotice: "Added to Inquiry List",
        alreadyAdded: "This product is already in the Inquiry List",
        openInquiry: "Open Inquiry List",
        undo: "Undo",
        addCategory: "Add Category to Inquiry",
        download: "Download Product Spec Sheet",
        downloadCategory: "Download Category Spec Sheet",
        empty: "No products selected yet. Add products from Wholesale or any product page.",
        selected: "Selected Products",
        remove: "Remove",
        sending: "Submitting securely...",
        format: "Product Format",
        application: "Application",
        packaging: "Packaging",
        flavor: "Flavor",
        sugar: "Sugar Level",
        service: "Service Type",
        pack: "Pack Size",
        all: "All",
      };
  const storageKey = "rm-b2b-inquiry-list-v1";
  const readList = () => {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  };
  const writeList = (items) => localStorage.setItem(storageKey, JSON.stringify(items));
  const normalize = (value) => String(value || "").trim();
  const updateListLinks = () => {
    const count = readList().length;
    document.querySelectorAll("[data-inquiry-count]").forEach((node) => {
      node.textContent = count ? ` (${count})` : "";
    });
  };
  const getProduct = (source) => {
    const card = source.closest(".product-search-card, .product-card");
    if (card) {
      const small = card.querySelector("small, .product-card-copy > span")?.textContent || "";
      const code = small.match(/(?:Product|产品编号)\s*(\d{3})/i)?.[1] || "";
      return {
        code,
        name: normalize(card.querySelector("strong, h3")?.textContent),
        spec: normalize(card.querySelector("em, small")?.textContent),
        category: normalize(card.classList.contains("product-card") ? card.closest(".detail-main")?.querySelector("h1")?.textContent : small.split("·")[0]),
        href: card.getAttribute("href") || card.querySelector(".product-card-image")?.getAttribute("href") || "",
      };
    }
    const main = source.matches?.(".detail-main") ? source : source.closest?.(".detail-main") || document.querySelector(".detail-main");
    if (!main) return null;
    const eyebrow = main.querySelector(".detail-hero .eyebrow")?.textContent || "";
    const code = eyebrow.match(/(\d{3})/)?.[1] || "";
    const specCard = [...main.querySelectorAll(".spec-card")].find((item) => /Specification|规格/i.test(item.querySelector("h3")?.textContent || ""));
    return {
      code,
      name: normalize(main.querySelector("h1")?.textContent),
      spec: normalize(specCard?.querySelector("p")?.textContent),
      category: normalize(main.querySelector(".breadcrumb a:nth-of-type(2)")?.textContent),
      href: window.location.pathname,
    };
  };
  const addProduct = (product) => {
    if (!product?.name) return false;
    const list = readList();
    const id = product.code || `${product.name}-${product.spec}`;
    const isNew = !list.some((item) => (item.code || `${item.name}-${item.spec}`) === id);
    if (isNew) {
      list.push(product);
      writeList(list);
    }
    updateListLinks();
    return isNew;
  };
  const productId = (product) => product?.code || `${product?.name || ""}-${product?.spec || ""}`;
  const removeProduct = (product) => {
    const id = productId(product);
    writeList(readList().filter((item) => productId(item) !== id));
    updateListLinks();
  };
  const showInquiryNotice = (messageText, product, onUndo) => {
    document.querySelector("[data-inquiry-notice]")?.remove();
    const notice = document.createElement("aside");
    notice.className = "inquiry-notice";
    notice.dataset.inquiryNotice = "";
    notice.setAttribute("role", "status");
    const message = document.createElement("strong");
    message.textContent = messageText;
    const open = document.createElement("a");
    open.className = "button secondary";
    open.href = `${siteBase}inquiry.html`;
    open.textContent = labels.openInquiry;
    notice.append(message, open);
    if (onUndo) {
      const undo = document.createElement("button");
      undo.type = "button";
      undo.className = "button primary";
      undo.textContent = labels.undo;
      undo.addEventListener("click", () => {
        removeProduct(product);
        onUndo();
        notice.remove();
      });
      notice.append(undo);
    }
    document.body.append(notice);
    window.setTimeout(() => notice.remove(), 8000);
  };
  const enhanceProductPage = () => {
    if (document.querySelector(".product-list-section")) return;
    const product = getProduct(document.body);
    if (!product) return;
    const target = document.querySelector(".detail-hero-grid > div:first-child");
    if (!target || target.querySelector("[data-add-detail-inquiry]")) return;
    const actions = document.createElement("div");
    actions.className = "b2b-product-actions";
    const add = document.createElement("button");
    add.type = "button";
    add.className = "button primary";
    add.dataset.addDetailInquiry = "";
    add.textContent = labels.add;
    add.addEventListener("click", () => {
      const isNew = addProduct(product);
      add.textContent = labels.added;
      showInquiryNotice(isNew ? labels.addedNotice : labels.alreadyAdded, product, isNew ? () => { add.textContent = labels.add; } : null);
    });
    const download = document.createElement("a");
    download.className = "button secondary";
    download.href = `/assets/downloads/specs/RM-product-${product.code}.pdf`;
    download.setAttribute("download", "");
    download.textContent = labels.download;
    actions.append(add, download);
    target.append(actions);
  };
  const enhanceCategoryPage = () => {
    const main = document.querySelector(".detail-main");
    const productList = main?.querySelector(".product-list-section");
    const target = main?.querySelector(".detail-hero-grid > div:first-child");
    const name = normalize(target?.querySelector("h1")?.textContent);
    if (!main || !productList || !target || !name || target.querySelector("[data-add-category-inquiry]")) return;
    const slug = window.location.pathname.split("/").pop()?.replace(/\.html$/i, "") || "category";
    const description = normalize(target.querySelector("p:not(.eyebrow)")?.textContent);
    const category = { code: `CATEGORY-${slug.toUpperCase()}`, name, spec: description, category: name, href: window.location.pathname };
    const actions = document.createElement("div");
    actions.className = "b2b-product-actions";
    const add = document.createElement("button");
    add.type = "button";
    add.className = "button primary";
    add.dataset.addCategoryInquiry = "";
    add.textContent = labels.addCategory;
    add.addEventListener("click", () => {
      const isNew = addProduct(category);
      add.textContent = labels.added;
      showInquiryNotice(isNew ? labels.addedNotice : labels.alreadyAdded, category, isNew ? () => { add.textContent = labels.addCategory; } : null);
    });
    const download = document.createElement("a");
    download.className = "button secondary";
    download.href = `/assets/downloads/category-specs/RM-category-${slug}.pdf`;
    download.setAttribute("download", "");
    download.textContent = labels.downloadCategory;
    actions.append(add, download);
    target.append(actions);
  };
  const enhanceSearchCards = () => {
    const addButton = (card, target) => {
      if (target.querySelector("[data-add-card-inquiry]")) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "product-add-button";
      button.dataset.addCardInquiry = "";
      button.textContent = labels.add;
      button.addEventListener("click", () => {
        const product = getProduct(card);
        const isNew = addProduct(product);
        button.textContent = labels.added;
        button.disabled = true;
        showInquiryNotice(isNew ? labels.addedNotice : labels.alreadyAdded, product, isNew ? () => {
          button.textContent = labels.add;
          button.disabled = false;
        } : null);
      });
      target.append(button);
    };
    [...document.querySelectorAll(".product-search-card")].forEach((card) => {
      if (card.parentElement?.classList.contains("product-search-item")) return;
      const wrapper = document.createElement("article");
      wrapper.className = "product-search-item";
      card.parentElement?.insertBefore(wrapper, card);
      wrapper.append(card);
      addButton(card, wrapper);
    });
    [...document.querySelectorAll(".product-card")].forEach((card) => addButton(card, card.querySelector(".product-card-copy") || card));
  };
  const formatData = (card) => {
    const title = normalize(card.querySelector("strong")?.textContent).toLowerCase();
    const small = normalize(card.querySelector("small")?.textContent).toLowerCase();
    const spec = normalize(card.querySelector("em")?.textContent).toLowerCase();
    const category = card.dataset.category || "";
    const text = `${title} ${small} ${spec}`;
    const packaging = /pouch|袋|bib/.test(text) ? "pouch" : /glass|玻璃/.test(text) ? "glass" : /bottle|瓶/.test(text) ? "bottle" : /jar|罐/.test(text) ? "jar" : "other";
    const flavor = /plum|梅|hawthorn|山楂|peach|蜜桃|taro|芋|ginger|姜|orange|橙|corn|玉米|oat|燕麦/.test(text) ? "flavored" : "classic";
    const sugar = /sugar free|无糖/.test(text) ? "sugar-free" : /low sugar|低糖/.test(text) ? "low-sugar" : "standard";
    const service = /foodservice|餐饮|1kg|4\.5kg|5kg|bib/.test(text) ? "foodservice" : "retail";
    return { category, packaging, flavor, sugar, service, spec };
  };
  const addSearchFilters = () => {
    const panel = document.querySelector("[data-product-search]");
    const cards = [...document.querySelectorAll("[data-product-search-card]")];
    if (!panel || !cards.length || panel.querySelector("[data-b2b-filters]")) return;
    const filters = [
      ["format", labels.format, ["instant-beverage", "concentrated-beverage", "ready-to-drink", "oat-products"]],
      ["application", labels.application, ["foodservice", "retail"]],
      ["packaging", labels.packaging, ["pouch", "bottle", "glass", "jar", "other"]],
      ["flavor", labels.flavor, ["flavored", "classic"]],
      ["sugar", labels.sugar, ["sugar-free", "low-sugar", "standard"]],
      ["service", labels.service, ["foodservice", "retail"]],
      ["pack", labels.pack, ["small", "medium", "large"]],
    ];
    const optionText = (value) => {
      const english = { "instant-beverage": "Powder-Form", "concentrated-beverage": "Concentrated", "ready-to-drink": "Ready-to-Drink", "oat-products": "Oat Products", foodservice: "Foodservice", retail: "Retail", pouch: "Pouch / BIB", bottle: "Bottle", glass: "Glass Bottle", jar: "Jar", other: "Other", flavored: "Flavored", classic: "Classic", "sugar-free": "Sugar Free", "low-sugar": "Low Sugar", standard: "Standard", small: "Small", medium: "Medium", large: "Large" };
      const chinese = { "instant-beverage": "粉末冲饮", "concentrated-beverage": "浓缩饮品", "ready-to-drink": "即饮饮品", "oat-products": "燕麦产品", foodservice: "餐饮", retail: "零售", pouch: "袋装 / BIB", bottle: "瓶装", glass: "玻璃瓶", jar: "罐装", other: "其他", flavored: "风味型", classic: "经典", "sugar-free": "无糖", "low-sugar": "低糖", standard: "常规", small: "小规格", medium: "中规格", large: "大规格" };
      return (isChinese ? chinese : english)[value] || value;
    };
    const box = document.createElement("div");
    box.className = "b2b-filter-grid";
    box.dataset.b2bFilters = "";
    const values = {};
    const apply = () => {
      const query = normalize(panel.querySelector("[data-product-search-input]")?.value).toLowerCase();
      const activeCategory = panel.querySelector("[data-product-filter][aria-pressed='true']")?.dataset.productFilter || "all";
      cards.forEach((card) => {
        const data = formatData(card);
        const matchesPack = !values.pack || (values.pack === "small" && /(?:g|ml)/.test(data.spec) && !/(?:1kg|1\.15kg|1\.8kg|2kg|4\.5kg|5kg)/.test(data.spec)) || (values.pack === "medium" && /(?:1kg|1\.15kg)/.test(data.spec)) || (values.pack === "large" && /(?:1\.8kg|2kg|4\.5kg|5kg)/.test(data.spec));
        const haystack = `${card.dataset.search || ""} ${data.spec}`.toLowerCase();
        const matches = (!query || haystack.includes(query)) && (activeCategory === "all" || data.category === activeCategory || (activeCategory === "sour-plum" && card.dataset.sourPlum === "true")) && (!values.format || data.category === values.format) && (!values.application || data.service === values.application) && (!values.packaging || data.packaging === values.packaging) && (!values.flavor || data.flavor === values.flavor) && (!values.sugar || data.sugar === values.sugar) && (!values.service || data.service === values.service) && matchesPack;
        const holder = card.closest(".product-search-item") || card;
        holder.hidden = !matches;
      });
    };
    filters.forEach(([key, title, options]) => {
      const label = document.createElement("label");
      label.innerHTML = `<span>${title}</span>`;
      const select = document.createElement("select");
      select.innerHTML = `<option value="">${labels.all}</option>${options.map((option) => `<option value="${option}">${optionText(option)}</option>`).join("")}`;
      select.addEventListener("change", () => { values[key] = select.value; apply(); });
      label.append(select);
      box.append(label);
    });
    panel.append(box);
    panel.querySelector("[data-product-search-input]")?.addEventListener("input", apply);
    panel.querySelectorAll("[data-product-filter]").forEach((button) => button.addEventListener("click", () => window.setTimeout(apply, 0)));
  };
  const renderInquiryPage = () => {
    const list = readList();
    const mount = document.querySelector("[data-inquiry-list]");
    const hidden = document.querySelector("[data-selected-products]");
    if (hidden) hidden.value = list.map((item) => `${item.code || "N/A"} | ${item.name} | ${item.spec || "Spec on request"}`).join("\n");
    if (!mount) return;
    mount.innerHTML = `<h2>${labels.selected}</h2>${list.length ? `<div class="inquiry-list-items">${list.map((item, index) => `<article><div><strong>${item.name}</strong><p>${item.code ? `#${item.code} · ` : ""}${item.spec || ""}${item.category ? ` · ${item.category}` : ""}</p></div><button type="button" data-remove-inquiry="${index}">${labels.remove}</button></article>`).join("")}</div>` : `<p class="inquiry-list-empty">${labels.empty}</p>`}`;
    mount.querySelectorAll("[data-remove-inquiry]").forEach((button) => button.addEventListener("click", () => {
      const next = readList();
      next.splice(Number(button.dataset.removeInquiry), 1);
      writeList(next);
      renderInquiryPage();
      updateListLinks();
    }));
  };
  const addNavInquiry = () => {
    const nav = document.querySelector(".site-nav");
    const cta = nav?.querySelector(".nav-cta");
    if (!nav || nav.querySelector("[data-inquiry-nav]")) return;
    const link = document.createElement("a");
    link.href = `${siteBase}inquiry.html`;
    link.dataset.inquiryNav = "";
    link.innerHTML = `${labels.inquiry}<span data-inquiry-count></span>`;
    nav.insertBefore(link, cta || null);
  };
  const addFooterLinks = () => {
    const nav = document.querySelector(".site-footer nav");
    if (
      !nav ||
      nav.querySelector("[data-b2b-footer-links]") ||
      nav.querySelector('a[href$="privacy.html"]')
    )
      return;
    const links = isChinese
      ? [["downloads.html", "资料下载"], ["samples.html", "申请样品"], ["privacy.html", "隐私政策"], ["terms.html", "使用条款"], ["accessibility.html", "无障碍声明"], ["cookies.html", "Cookie 偏好"], ["faq.html", "常见问题"], ["sample-policy.html", "样品政策"], ["sitemap.html", "Sitemap"]]
      : [["downloads.html", "Downloads"], ["samples.html", "Request Samples"], ["privacy.html", "Privacy"], ["terms.html", "Terms"], ["accessibility.html", "Accessibility"], ["cookies.html", "Cookie Preferences"], ["faq.html", "FAQ"], ["sample-policy.html", "Sample Policy"], ["sitemap.html", "Sitemap"]];
    const group = document.createElement("span");
    group.dataset.b2bFooterLinks = "";
    links.forEach(([href, text]) => { const link = document.createElement("a"); link.href = `${siteBase}${href}`; link.textContent = text; group.append(link); });
    nav.append(group);
  };
  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches("[data-b2b-form]")) return;
    const status = form.querySelector("[data-form-status]");
    if (status) status.textContent = labels.sending;
  });
  const requestedChannel = new URLSearchParams(window.location.search).get("channel");
  if (requestedChannel) {
    const channel = document.querySelector(isChinese ? 'select[name="客户类型"]' : 'select[name="Customer Type"]');
    const match = (isChinese
      ? { foodservice: "餐饮渠道", "private-label-oem": "自有品牌 / OEM", "retail-grocery": "零售与商超", "distributor-support": "经销商" }
      : { foodservice: "Foodservice", "private-label-oem": "Private Label / OEM", "retail-grocery": "Retail & Grocery", "distributor-support": "Distributor" })[requestedChannel];
    if (channel instanceof HTMLSelectElement && match) {
      const option = [...channel.options].find((item) => item.textContent?.trim() === match || item.textContent?.includes(match));
      if (option) channel.value = option.value;
    }
  }
  const requestedProduct = new URLSearchParams(window.location.search).get("product");
  const requestedCode = new URLSearchParams(window.location.search).get("code");
  if (requestedProduct) {
    document.querySelectorAll('[data-b2b-form] input[name="Products of interest"], [data-b2b-form] input[name="感兴趣产品"]').forEach((field) => {
      if (field instanceof HTMLInputElement && !field.value) field.value = requestedCode ? `${requestedProduct} (Product ${requestedCode})` : requestedProduct;
    });
  }
  addNavInquiry();
  addFooterLinks();
  updateListLinks();
  enhanceProductPage();
  enhanceCategoryPage();
  enhanceSearchCards();
  addSearchFilters();
  renderInquiryPage();
})();
