const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const mobileNavigationQuery = window.matchMedia("(max-width: 980px)");
const navGroups = Array.from(document.querySelectorAll(".nav-group"));
const closeMobileDropdowns = () => {
  navGroups.forEach((group) => {
    group.classList.remove("is-open");
    group.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
  });
};

navGroups.forEach((group, index) => {
  const dropdown = group.querySelector(".nav-dropdown");
  const parent = group.querySelector(".nav-parent");
  if (!dropdown || !parent) return;

  const toggle = document.createElement("button");
  const dropdownId = `mobile-submenu-${index + 1}`;
  toggle.className = "nav-dropdown-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-controls", dropdownId);
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", `展开${parent.textContent?.trim() || "导航"}子菜单`);
  dropdown.id = dropdownId;
  group.append(toggle);

  toggle.addEventListener("click", () => {
    if (!mobileNavigationQuery.matches) return;
    const willOpen = !group.classList.contains("is-open");
    closeMobileDropdowns();
    group.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
  });
});

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    if (!isOpen) closeMobileDropdowns();
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "关闭导航菜单" : "打开导航菜单");
  });

  siteNav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      closeMobileDropdowns();
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "打开导航菜单");
    }
  });
}
window.addEventListener("resize", () => {
  if (!mobileNavigationQuery.matches) closeMobileDropdowns();
});

const header = document.querySelector("[data-header]");

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const productMainImage = document.querySelector("[data-product-main-image]");

if (productMainImage instanceof HTMLImageElement) {
  document.querySelectorAll("[data-gallery-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextImage = button.getAttribute("data-gallery-image");
      if (!nextImage) return;
      const previousImage = productMainImage.src;
      productMainImage.src = nextImage;
      button.setAttribute("data-gallery-image", previousImage);
      const thumbnail = button.querySelector("img");
      if (thumbnail instanceof HTMLImageElement) thumbnail.src = previousImage;
    });
  });
}

const productSearch = document.querySelector("[data-product-search]");

if (productSearch) {
  const input = productSearch.querySelector("[data-product-search-input]");
  const filterButtons = Array.from(
    productSearch.querySelectorAll("[data-product-filter]"),
  );
  const cards = Array.from(document.querySelectorAll("[data-product-search-card]"));
  const status = productSearch.querySelector("[data-product-search-status]");
  const showAllButton = productSearch.querySelector("[data-product-show-all]");
  const emptyState = document.querySelector("[data-product-search-empty]");
  const defaultLimit = Number(productSearch.getAttribute("data-default-limit")) || 12;
  let activeFilter = "all";
  let showAll = defaultLimit >= cards.length;

  const normalizeSearch = (value) =>
    value.toLocaleLowerCase("zh-CN").replace(/\s+/g, "");

  const updateProductResults = () => {
    const query =
      input instanceof HTMLInputElement ? normalizeSearch(input.value) : "";
    const matches = cards.filter((card) => {
      const searchText = normalizeSearch(card.getAttribute("data-search") || "");
      const category = card.getAttribute("data-category");
      const isSourPlum = card.getAttribute("data-sour-plum") === "true";
      const matchesFilter =
        activeFilter === "all" ||
        category === activeFilter ||
        (activeFilter === "sour-plum" && isSourPlum);
      return matchesFilter && (!query || searchText.includes(query));
    });
    const useLimit = activeFilter === "all" && !query && !showAll;

    cards.forEach((card) => {
      const matchIndex = matches.indexOf(card);
      (card.closest(".product-search-item") || card).hidden =
        matchIndex === -1 || (useLimit && matchIndex >= defaultLimit);
    });

    if (status) {
      status.textContent = useLimit
        ? `展示前 ${Math.min(defaultLimit, matches.length)} 个，共 ${matches.length} 个产品`
        : `找到 ${matches.length} 个产品`;
    }
    if (emptyState) emptyState.hidden = matches.length !== 0;
    if (showAllButton instanceof HTMLButtonElement) {
      showAllButton.hidden =
        !useLimit || matches.length <= defaultLimit;
      showAllButton.textContent = `查看全部 ${matches.length} 个产品`;
    }
  };

  if (input instanceof HTMLInputElement) {
    input.addEventListener("input", () => {
      showAll = false;
      updateProductResults();
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.getAttribute("data-product-filter") || "all";
      showAll = false;
      filterButtons.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      updateProductResults();
    });
  });

  if (showAllButton instanceof HTMLButtonElement) {
    showAllButton.addEventListener("click", () => {
      showAll = true;
      updateProductResults();
    });
  }

  updateProductResults();
}

const siteSearch = document.querySelector("[data-site-search]");

if (siteSearch instanceof HTMLFormElement) {
  const input = siteSearch.querySelector("[data-site-search-input]");
  const cards = Array.from(document.querySelectorAll("[data-site-search-card]"));
  const status = siteSearch.querySelector("[data-site-search-status]");
  const emptyState = document.querySelector("[data-site-search-empty]");
  const showAllButton = document.querySelector("[data-site-search-show-all]");
  const defaultLimit = Number(siteSearch.getAttribute("data-default-limit")) || 18;
  const params = new URLSearchParams(window.location.search);
  let showAll = false;

  const normalizeSearch = (value) =>
    value.toLocaleLowerCase("zh-CN").replace(/\s+/g, "");

  const updateSiteSearchResults = () => {
    const query =
      input instanceof HTMLInputElement ? normalizeSearch(input.value) : "";
    const matches = cards.filter((card) =>
      normalizeSearch(card.getAttribute("data-search") || "").includes(query),
    );
    const useLimit = !query && !showAll;

    cards.forEach((card) => {
      const matchIndex = matches.indexOf(card);
      card.hidden =
        matchIndex === -1 || (useLimit && matchIndex >= defaultLimit);
    });

    if (status) {
      status.textContent = useLimit
        ? `展示前 ${Math.min(defaultLimit, matches.length)} 个，共收录 ${matches.length} 个站内入口`
        : `找到 ${matches.length} 个相关入口`;
    }
    if (emptyState) emptyState.hidden = matches.length !== 0;
    if (showAllButton instanceof HTMLButtonElement) {
      showAllButton.hidden = !useLimit || matches.length <= defaultLimit;
      showAllButton.textContent = `查看全部 ${matches.length} 个站内入口`;
    }
  };

  if (input instanceof HTMLInputElement) {
    input.value = params.get("q") || "";
    input.addEventListener("input", () => {
      showAll = false;
      updateSiteSearchResults();
    });
  }

  siteSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    showAll = false;
    const query = input instanceof HTMLInputElement ? input.value.trim() : "";
    const nextUrl = new URL(window.location.href);
    if (query) {
      nextUrl.searchParams.set("q", query);
    } else {
      nextUrl.searchParams.delete("q");
    }
    window.history.replaceState(null, "", nextUrl);
    updateSiteSearchResults();
  });

  if (showAllButton instanceof HTMLButtonElement) {
    showAllButton.addEventListener("click", () => {
      showAll = true;
      updateSiteSearchResults();
    });
  }

  updateSiteSearchResults();
}

const inquiryForm = document.querySelector("[data-inquiry-form]");

if (inquiryForm instanceof HTMLFormElement) {
  const params = new URLSearchParams(window.location.search);
  const productName = params.get("product") || params.get("category") || "";
  const productCode = params.get("code") || "";
  const productSpec = params.get("spec") || "";
  const sourceCategory = params.get("category") || "";
  const inquiryKind = params.get("inquiry") || "";
  const productInput = inquiryForm.querySelector("[data-inquiry-product]");
  const codeInput = inquiryForm.querySelector("[data-inquiry-code]");
  const specInput = inquiryForm.querySelector("[data-inquiry-spec]");
  const categoryInput = inquiryForm.querySelector("[data-inquiry-category]");
  const sourceInput = inquiryForm.querySelector("[data-inquiry-source]");
  const typeSelect = inquiryForm.querySelector("[data-inquiry-type]");

  if (productInput instanceof HTMLInputElement) productInput.value = productName;
  if (codeInput instanceof HTMLInputElement) codeInput.value = productCode;
  if (specInput instanceof HTMLInputElement) specInput.value = productSpec;
  if (categoryInput instanceof HTMLInputElement) categoryInput.value = sourceCategory;
  if (sourceInput instanceof HTMLInputElement) sourceInput.value = document.referrer || window.location.href;
  if (typeSelect instanceof HTMLSelectElement) {
    if (inquiryKind === "product") typeSelect.value = "产品资料与样品";
    if (/OEM|ODM/i.test(sourceCategory)) typeSelect.value = "OEM/ODM 定制";
  }

  const success = document.querySelector("[data-inquiry-success]");
  if (success && params.get("submitted") === "1") {
    success.hidden = false;
  }
}

const qrPreviewButtons = Array.from(document.querySelectorAll("[data-qr-preview]"));

if (qrPreviewButtons.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "qr-lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="qr-lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="qr-lightbox-title">
      <button class="qr-lightbox-close" type="button" aria-label="关闭二维码预览">×</button>
      <img alt="" />
      <p id="qr-lightbox-title"></p>
    </div>`;
  document.body.append(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const lightboxTitle = lightbox.querySelector("p");
  const closeButton = lightbox.querySelector("button");

  const closeLightbox = () => {
    lightbox.hidden = true;
  };

  qrPreviewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-qr-preview");
      const title = button.getAttribute("data-qr-title") || "二维码";
      if (lightboxImage instanceof HTMLImageElement && src) {
        lightboxImage.src = src;
        lightboxImage.alt = title;
      }
      if (lightboxTitle) lightboxTitle.textContent = title;
      lightbox.hidden = false;
      if (closeButton instanceof HTMLButtonElement) closeButton.focus();
    });
  });

  closeButton?.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
}

document.querySelectorAll("[data-section-nav]").forEach((sectionNav) => {
  const links = Array.from(
    sectionNav.querySelectorAll('a[href^="#"]'),
  );
  const targets = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!targets.length || !("IntersectionObserver" in window)) return;

  const setActiveSection = (id) => {
    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  setActiveSection(targets[0].id);
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.id);
    },
    { rootMargin: "-22% 0px -62% 0px", threshold: [0.01, 0.2, 0.5] },
  );
  targets.forEach((target) => observer.observe(target));
});

const sceneDeck = document.querySelector("[data-scene-deck]");
const scrollCue = document.querySelector("[data-scroll-cue]");

if (sceneDeck) {
  const hero = sceneDeck.closest(".hero");
  const sceneCards = Array.from(sceneDeck.querySelectorAll("[data-scene-card]"));
  let activeScene = 0;
  let autoplayTimer = null;
  let introTimers = [];
  let scrollCueTimer = null;
  let scrollCueDismissed = false;

  const updateSceneDeck = (nextIndex) => {
    activeScene = (nextIndex + sceneCards.length) % sceneCards.length;

    sceneCards.forEach((card, index) => {
      let offset = (index - activeScene + sceneCards.length) % sceneCards.length;
      if (offset > sceneCards.length / 2) offset -= sceneCards.length;
      card.dataset.offset = String(offset);
      card.classList.toggle("is-active", offset === 0);
    });

  };

  const startAutoplay = () => {
    if (autoplayTimer !== null) window.clearInterval(autoplayTimer);
    autoplayTimer = window.setInterval(() => {
      updateSceneDeck(activeScene + 1);
    }, 3200);
  };

  const stopAutoplay = () => {
    if (autoplayTimer !== null) window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  };

  const clearIntroTimers = () => {
    introTimers.forEach((timer) => window.clearTimeout(timer));
    introTimers = [];
  };

  const scheduleIntro = (callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    introTimers.push(timer);
  };

  const hideScrollCue = () => {
    if (!scrollCue) return;
    scrollCue.classList.remove("is-visible");
    scrollCueDismissed = true;
    if (scrollCueTimer !== null) window.clearTimeout(scrollCueTimer);
    scrollCueTimer = null;
  };

  const scheduleScrollCue = () => {
    if (!scrollCue) return;
    scrollCueDismissed = false;
    scrollCue.classList.remove("is-visible");
    if (scrollCueTimer !== null) window.clearTimeout(scrollCueTimer);
    scrollCueTimer = window.setTimeout(() => {
      if (!scrollCueDismissed && window.scrollY < 12 && !document.hidden) {
        scrollCue.classList.add("is-visible");
      }
    }, 4000);
  };

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const playHeroIntro = () => {
    if (!hero) return;

    clearIntroTimers();
    stopAutoplay();
    activeScene = 0;
    updateSceneDeck(activeScene);

    hero.classList.add("is-resetting");
    hero.classList.remove("is-opening", "is-scene-intro", "is-copy-revealing");
    sceneDeck.classList.remove("is-intro");
    void hero.offsetWidth;

    if (motionQuery.matches) {
      hero.classList.remove("is-resetting");
      hero.classList.add("is-copy-revealing");
      scheduleScrollCue();
      return;
    }

    hero.classList.add("is-opening", "is-scene-intro");
    sceneDeck.classList.add("is-intro");
    void hero.offsetWidth;
    hero.classList.remove("is-resetting");
    scheduleScrollCue();

    scheduleIntro(() => {
      hero?.classList.remove("is-opening");
      scheduleIntro(() => {
        sceneDeck.classList.remove("is-intro");
        hero?.classList.add("is-copy-revealing");
        scheduleIntro(() => {
          hero?.classList.remove("is-scene-intro");
          scheduleIntro(startAutoplay, 900);
        }, 1550);
      }, 500);
    }, 1250);
  };

  playHeroIntro();

  document.querySelectorAll("[data-home-replay]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#home`);

      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;

      playHeroIntro();
    });
  });

  if (scrollCue) {
    scrollCue.addEventListener("click", () => {
      hideScrollCue();
      const products = document.querySelector("#products");
      if (!products) return;

      const startY = window.scrollY;
      const headerHeight = header?.offsetHeight ?? 0;
      const targetY = products.getBoundingClientRect().top + startY - headerHeight;

      if (motionQuery.matches) {
        window.scrollTo(0, targetY);
        return;
      }

      const duration = 1200;
      const startedAt = performance.now();
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";

      const easeInOutCubic = (progress) =>
        progress < 0.5
          ? 4 * progress ** 3
          : 1 - ((-2 * progress + 2) ** 3) / 2;

      const animateScroll = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = easeInOutCubic(progress);
        window.scrollTo(0, startY + (targetY - startY) * eased);

        if (progress < 1) {
          window.requestAnimationFrame(animateScroll);
        } else {
          document.documentElement.style.scrollBehavior = previousScrollBehavior;
        }
      };

      window.requestAnimationFrame(animateScroll);
    });
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 4) hideScrollCue();
  }, { passive: true });
  window.addEventListener("wheel", hideScrollCue, { passive: true });
  window.addEventListener("touchmove", hideScrollCue, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
      scrollCue?.classList.remove("is-visible");
    } else if (!motionQuery.matches && !sceneDeck.classList.contains("is-intro")) {
      startAutoplay();
    }
  });
}
