
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
  toggle.setAttribute("aria-label", `Show ${parent.textContent?.trim() || "navigation"} submenu`);
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
    const open = siteNav.classList.toggle("is-open");
    if (!open) closeMobileDropdowns();
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  });
  siteNav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      closeMobileDropdowns();
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
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
const productSearch = document.querySelector("[data-product-search]");
if (productSearch) {
  const input = productSearch.querySelector("[data-product-search-input]");
  const buttons = [...productSearch.querySelectorAll("[data-product-filter]")];
  const cards = [...document.querySelectorAll("[data-product-search-card]")];
  const status = productSearch.querySelector("[data-product-search-status]");
  const empty = document.querySelector("[data-product-search-empty]");
  let filter = "all";
  const update = () => {
    const query = (input?.value || "").toLowerCase().replace(/\s+/g, "");
    const matches = cards.filter((card) => {
      const text = (card.dataset.search || "").toLowerCase().replace(/\s+/g, "");
      return (filter === "all" || card.dataset.category === filter) && (!query || text.includes(query));
    });
    cards.forEach((card) => {
      (card.closest(".product-search-item") || card).hidden = !matches.includes(card);
    });
    if (status) status.textContent = matches.length + " products";
    if (empty) empty.hidden = matches.length !== 0;
  };
  input?.addEventListener("input", update);
  buttons.forEach((button) => button.addEventListener("click", () => {
    filter = button.dataset.productFilter || "all";
    buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    update();
  }));
  update();
}
const siteSearch = document.querySelector("[data-site-search]");
if (siteSearch) {
  const input = siteSearch.querySelector("[data-site-search-input]");
  const cards = [...document.querySelectorAll("[data-site-search-card]")];
  const status = siteSearch.querySelector("[data-site-search-status]");
  const empty = document.querySelector("[data-site-search-empty]");
  const update = () => {
    const query = (input?.value || "").toLowerCase().replace(/\s+/g, "");
    const matches = cards.filter((card) => (card.dataset.search || "").toLowerCase().replace(/\s+/g, "").includes(query));
    cards.forEach((card) => { card.hidden = !matches.includes(card); });
    if (status) status.textContent = matches.length + " results";
    if (empty) empty.hidden = matches.length !== 0;
  };
  siteSearch.addEventListener("submit", (event) => { event.preventDefault(); update(); });
  input?.addEventListener("input", update);
  update();
}

const qrPreviewButtons = Array.from(document.querySelectorAll("[data-qr-preview]"));
if (qrPreviewButtons.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "qr-lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = '<div class="qr-lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="qr-lightbox-title"><button class="qr-lightbox-close" type="button" aria-label="Close QR preview">×</button><img alt="" /><p id="qr-lightbox-title"></p></div>';
  document.body.append(lightbox);
  const lightboxImage = lightbox.querySelector("img");
  const lightboxTitle = lightbox.querySelector("p");
  const closeButton = lightbox.querySelector("button");
  const closeLightbox = () => { lightbox.hidden = true; };
  qrPreviewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-qr-preview");
      const title = button.getAttribute("data-qr-title") || "QR code";
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
    autoplayTimer = window.setInterval(() => updateSceneDeck(activeScene + 1), 3200);
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
      if (!scrollCueDismissed && window.scrollY < 12 && !document.hidden) scrollCue.classList.add("is-visible");
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
      window.history.replaceState(null, "", window.location.pathname + window.location.search + "#home");
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
      const nextSection = hero?.nextElementSibling;
      if (!(nextSection instanceof HTMLElement)) return;
      const startY = window.scrollY;
      const headerHeight = header?.offsetHeight ?? 0;
      const targetY = nextSection.getBoundingClientRect().top + startY - headerHeight;
      if (motionQuery.matches) {
        window.scrollTo(0, targetY);
        return;
      }
      const duration = 1200;
      const startedAt = performance.now();
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      const easeInOutCubic = (progress) => progress < 0.5 ? 4 * progress ** 3 : 1 - ((-2 * progress + 2) ** 3) / 2;
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
  window.addEventListener("scroll", () => { if (window.scrollY > 4) hideScrollCue(); }, { passive: true });
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

const inquiryChannel = document.querySelector('select[name="channel"]');
const requestedChannel = new URLSearchParams(window.location.search).get("channel");
if (inquiryChannel instanceof HTMLSelectElement && requestedChannel) {
  const matchingOption = Array.from(inquiryChannel.options).find((option) => option.value === requestedChannel);
  if (matchingOption) inquiryChannel.value = matchingOption.value;
}
