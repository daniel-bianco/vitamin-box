(function () {
  var html = document.documentElement;
  var body = document.body;

  if (!body) {
    return;
  }

  var page = body.dataset.page || "home";
  var langButtons = Array.from(document.querySelectorAll("[data-lang-choice]"));
  var themeButtons = Array.from(document.querySelectorAll("[data-theme-choice]"));
  var langKey = "vitaminbox-lang";
  var themeKey = "vitaminbox-theme";
  var supportedLangs = ["en", "de"];
  var supportedThemes = ["light", "dark"];
  var systemThemeQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var state = {
    lang: readStored(langKey, "en"),
    theme: readStored(themeKey, getSystemTheme()),
  };

  var labels = {
    en: {
      all: "All",
      vitamins: "Vitamins",
      sports: "Sports",
      recovery: "Recovery",
      sleep: "Sleep",
      daily: "Daily",
      capsules: "capsules",
      powder: "powder",
      softgels: "softgels",
      open: "Open",
      dark: "Dark",
      light: "Light",
      home: "Home",
      about: "About",
      contact: "Contact",
      concept: "Concept",
      products: "Products",
      start: "Start",
      startPage: "Start page",
      mainPage: "main page",
      contactPage: "contact page",
      templateProducts: "template products",
      sortByType: "Sort by product type",
      productTypes: "Product types",
      product: "Product",
      price: "Price",
      type: "Type",
      format: "Format",
      details: "Get details",
      closeModal: "Close modal",
      directions: "Get directions",
      links: "Links",
      address: "Address",
      hours: "Hours",
      productTitle: "Products",
      contactTitle: "Contact",
      homeTitle: "VitaminBox Offenbach",
      conceptTitle: "VitaminBox Offenbach · Concept",
      productsTitle: "VitaminBox Offenbach · Products",
      contactPageTitle: "VitaminBox Offenbach · Contact",
    },
    de: {
      all: "Alle",
      vitamins: "Vitamine",
      sports: "Sport",
      recovery: "Regeneration",
      sleep: "Schlaf",
      daily: "Täglich",
      capsules: "Kapseln",
      powder: "Pulver",
      softgels: "Softgels",
      open: "Öffnen",
      dark: "Dunkel",
      light: "Hell",
      home: "Start",
      about: "Über",
      contact: "Kontakt",
      concept: "Konzept",
      products: "Produkte",
      start: "Start",
      startPage: "Startseite",
      mainPage: "Hauptseite",
      contactPage: "Kontaktseite",
      templateProducts: "Produktvorlagen",
      sortByType: "Nach Produkttyp sortieren",
      productTypes: "Produkttypen",
      product: "Produkt",
      price: "Preis",
      type: "Typ",
      format: "Format",
      details: "Details anzeigen",
      closeModal: "Modal schließen",
      directions: "Route anzeigen",
      links: "Links",
      address: "Adresse",
      hours: "Öffnungszeiten",
      productTitle: "Produkte",
      contactTitle: "Kontakt",
      homeTitle: "VitaminBox Offenbach",
      conceptTitle: "VitaminBox Offenbach · Konzept",
      productsTitle: "VitaminBox Offenbach · Produkte",
      contactPageTitle: "VitaminBox Offenbach · Kontakt",
    },
  };

  var copy = {
    home: {
      description: {
        en: "VitaminBox Offenbach",
        de: "VitaminBox Offenbach",
      },
      brand: {
        en: "Offenbach",
        de: "Offenbach",
      },
      lead: {
        en: "Bio supplements, proteins, and more for daily support, balance, and a healthy lifestyle.",
        de: "Nahrungsergänzung, Proteine und mehr zur täglichen Unterstützung, für Balance und einen gesunden Lebensstil.",
      },
      ctaProducts: {
        en: "PRODUCTS",
        de: "PRODUKTE",
      },
      ctaContact: {
        en: "Contact",
        de: "Kontakt",
      },
      footerPage: {
        en: "main page",
        de: "Hauptseite",
      },
      navAbout: {
        en: "About",
        de: "Über",
      },
      navContact: {
        en: "Contact",
        de: "Kontakt",
      },
    },
    about: {
      description: {
        en: "VitaminBox Offenbach context page",
        de: "Kontextseite von VitaminBox Offenbach",
      },
      brand: {
        en: "Products",
        de: "Produkte",
      },
      title: {
        en: "Products",
        de: "Produkte",
      },
      copy: {
        en: "Supplement catalogue. Minimal, black, handwritten, and built to read like a calm premium inventory.",
        de: "Ein Supplement-Katalog. Minimal, schwarz, handschriftlich und so aufgebaut, dass er sich wie ein ruhiges Premium-Inventar liest.",
      },
      toolbar: {
        en: "Sort by product type",
        de: "Nach Produkttyp sortieren",
      },
      filters: {
        all: { en: "All", de: "Alle" },
        vitamins: { en: "Vitamins", de: "Vitamine" },
        sports: { en: "Sports", de: "Sport" },
        recovery: { en: "Recovery", de: "Regeneration" },
        sleep: { en: "Sleep", de: "Schlaf" },
        daily: { en: "Daily", de: "Täglich" },
      },
      navHome: {
        en: "Home",
        de: "Start",
      },
      navContact: {
        en: "Contact",
        de: "Kontakt",
      },
      actionsHome: {
        en: "Home",
        de: "Start",
      },
      actionsContact: {
        en: "Contact",
        de: "Kontakt",
      },
      footerPage: {
        en: "template products",
        de: "Produktvorlagen",
      },
      modalTitle: {
        en: "Product",
        de: "Produkt",
      },
      modalLabels: {
        price: { en: "Price", de: "Preis" },
        type: { en: "Type", de: "Typ" },
        format: { en: "Format", de: "Format" },
      },
      modalCta: {
        en: "Get details",
        de: "Details anzeigen",
      },
      closeModal: {
        en: "Close modal",
        de: "Modal schließen",
      },
      products: {
        d3k2: {
          title: {
            en: "D3 + K2 Ritual",
            de: "D3 + K2 Ritual",
          },
          copy: {
            en: "Daily support stack for darker seasons. Clean capsule format with simple dosing.",
            de: "Täglicher Support-Stack für dunklere Jahreszeiten. Saubere Kapsel-Form mit einfacher Dosierung.",
          },
          aria: {
            en: "Open D3 plus K2 Ritual product details",
            de: "Produktdetails zu D3 + K2 Ritual öffnen",
          },
          typeKeys: ["vitamins", "daily"],
          formatKey: "capsules",
          price: "€24",
        },
        creatine: {
          title: {
            en: "Creatine Mono",
            de: "Creatine Mono",
          },
          copy: {
            en: "Unflavoured performance base for training, focus, and recovery routines.",
            de: "Unaromatisierte Performance-Basis für Training, Fokus und Regenerationsroutinen.",
          },
          aria: {
            en: "Open Creatine Mono product details",
            de: "Produktdetails zu Creatine Mono öffnen",
          },
          typeKeys: ["sports", "daily"],
          formatKey: "powder",
          price: "€19",
        },
        magnesium: {
          title: {
            en: "Magnesium Night",
            de: "Magnesium Night",
          },
          copy: {
            en: "Quiet evening formula with soft positioning for wind-down and recovery.",
            de: "Ruhige Abend-Formel mit sanfter Ausrichtung auf Entspannung und Regeneration.",
          },
          aria: {
            en: "Open Magnesium Night product details",
            de: "Produktdetails zu Magnesium Night öffnen",
          },
          typeKeys: ["recovery", "sleep"],
          formatKey: "powder",
          price: "€22",
        },
        omega: {
          title: {
            en: "Omega Softgel",
            de: "Omega Softgel",
          },
          copy: {
            en: "Basic omega support with a minimal form factor and a standard daily rhythm.",
            de: "Einfacher Omega-Support in minimaler Form mit einem klaren täglichen Rhythmus.",
          },
          aria: {
            en: "Open Omega Softgel product details",
            de: "Produktdetails zu Omega Softgel öffnen",
          },
          typeKeys: ["vitamins", "daily"],
          formatKey: "softgels",
          price: "€18",
        },
        sleepblend: {
          title: {
            en: "Sleep Blend",
            de: "Sleep Blend",
          },
          copy: {
            en: "Calm-formula template for evening use, designed to look soft and premium.",
            de: "Ruhige Formelvorlage für den Abend, gestaltet, um weich und hochwertig zu wirken.",
          },
          aria: {
            en: "Open Sleep Blend product details",
            de: "Produktdetails zu Sleep Blend öffnen",
          },
          typeKeys: ["sleep", "recovery"],
          formatKey: "capsules",
          price: "€29",
        },
        protein: {
          title: {
            en: "Protein Clean",
            de: "Protein Clean",
          },
          copy: {
            en: "Template sports nutrition SKU for post-training routines and everyday support.",
            de: "Vorlage für Sportnahrung nach dem Training und für den Alltag.",
          },
          aria: {
            en: "Open Protein Clean product details",
            de: "Produktdetails zu Protein Clean öffnen",
          },
          typeKeys: ["sports", "recovery"],
          formatKey: "powder",
          price: "€34",
        },
      },
    },
    contact: {
      description: {
        en: "VitaminBox Offenbach contact page",
        de: "Kontaktseite von VitaminBox Offenbach",
      },
      brand: {
        en: "Contact",
        de: "Kontakt",
      },
      navHome: {
        en: "Home",
        de: "Start",
      },
      navConcept: {
        en: "Concept",
        de: "Konzept",
      },
      copy: {
        en: "A quiet page for reaching the store. Minimal, direct, and built to feel like the same hand-drawn mark.",
        de: "Eine ruhige Seite, um den Store zu erreichen. Minimal, direkt und so gestaltet, dass sie sich wie dieselbe handgezeichnete Marke anfühlt.",
      },
      addressLabel: {
        en: "Address",
        de: "Adresse",
      },
      addressValue: {
        en: "Frankfurter Straße 27\n( Rückseite vom City Markt )\nOffenbach 63065",
        de: "Frankfurter Straße 27\n( Rückseite vom City Markt )\nOffenbach 63065",
      },
      hoursLabel: {
        en: "Hours",
        de: "Öffnungszeiten",
      },
      hoursValue: {
        en: "Monday-Friday 11am-7pm\nSaturday 11am-6pm",
        de: "Montag-Freitag 11-19 Uhr\nSamstag 11-18 Uhr",
      },
      directions: {
        en: "Get directions",
        de: "Route anzeigen",
      },
      linksTitle: {
        en: "Links",
        de: "Links",
      },
      open: {
        en: "Open",
        de: "Öffnen",
      },
      actionsHome: {
        en: "Home",
        de: "Start",
      },
      actionsConcept: {
        en: "Concept",
        de: "Konzept",
      },
      footerPage: {
        en: "contact page",
        de: "Kontaktseite",
      },
    },
  };

  function readStored(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStored(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {}
  }

  function clampLang(lang) {
    return supportedLangs.indexOf(lang) === -1 ? "en" : lang;
  }

  function clampTheme(theme) {
    return supportedThemes.indexOf(theme) === -1 ? getSystemTheme() : theme;
  }

  function getSystemTheme() {
    return systemThemeQuery && systemThemeQuery.matches ? "dark" : "light";
  }

  function labelFor(key) {
    var pack = labels[state.lang] || labels.en;
    return pack[key] || key;
  }

  function textFor(group, key) {
    var pack = copy[page] || {};
    var item = pack[group];
    if (!item) {
      return "";
    }
    if (typeof item === "string") {
      return item;
    }
    if (item[key]) {
      return item[key];
    }
    return item.en || "";
  }

  function setText(selector, value) {
    var element = document.querySelector(selector);
    if (element && typeof value === "string") {
      element.textContent = value;
    }
  }

  function setButtonText(selector, value) {
    var element = document.querySelector(selector);
    if (element && typeof value === "string") {
      element.textContent = value;
    }
  }

  function setMetaDescription(value) {
    var meta = document.querySelector('meta[name="description"]');
    if (meta && typeof value === "string") {
      meta.setAttribute("content", value);
    }
  }

  function setTitle(value) {
    if (typeof value === "string" && value) {
      document.title = value;
    }
  }

  function updateToggleButtons() {
    langButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.langChoice === state.lang));
    });

    themeButtons.forEach(function (button) {
      var pack = labels[state.lang] || labels.en;
      var isActive = button.dataset.themeChoice === state.theme;
      var label = pack[button.dataset.themeChoice] || button.dataset.themeChoice;
      button.setAttribute("aria-pressed", String(isActive));
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    });
  }

  function applyThemeFromSystem() {
    if (readStored(themeKey, "") === "") {
      applyTheme(getSystemTheme(), false);
    }
  }

  function applyTheme(theme, persist) {
    state.theme = clampTheme(theme);
    html.dataset.theme = state.theme;
    if (persist !== false) {
      writeStored(themeKey, state.theme);
    }
    updateToggleButtons();
  }

  function applyLanguage(lang, persist) {
    state.lang = clampLang(lang);
    html.lang = state.lang;
    if (persist !== false) {
      writeStored(langKey, state.lang);
    }
    translatePage();
    updateToggleButtons();
    window.dispatchEvent(
      new CustomEvent("vitaminbox:language-change", {
        detail: { page: page, lang: state.lang },
      })
    );
  }

  function translateHome() {
    setTitle(labels[state.lang].homeTitle);
    setMetaDescription(textFor("description", state.lang));
    setText(".brand-copy span", textFor("brand", state.lang));
    setText('.nav a[href="/about.html"]', textFor("navAbout", state.lang));
    setText('.nav a[href="/contact.html"]', textFor("navContact", state.lang));
    setText(".lead", textFor("lead", state.lang));
    setButtonText('.cta a[href="/about.html"]', textFor("ctaProducts", state.lang));
    setButtonText('.cta a[href="/contact.html"]', textFor("ctaContact", state.lang));
    setText('[data-footer-role="page"]', textFor("footerPage", state.lang));
  }

  function translateAbout() {
    setTitle(labels[state.lang].productsTitle);
    setMetaDescription(textFor("description", state.lang));
    setText(".brand-copy span", textFor("brand", state.lang));
    setText('.nav a[href="/index.html"]', textFor("navHome", state.lang));
    setText('.nav a[href="/contact.html"]', textFor("navContact", state.lang));
    setText(".title", textFor("title", state.lang));
    setText(".copy", textFor("copy", state.lang));
    setText(".toolbar-label", textFor("toolbar", state.lang));

    var filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
    filterButtons.forEach(function (button) {
      var key = button.dataset.filter;
      if (key && labels[state.lang][key]) {
        button.textContent = labels[state.lang][key];
      } else if (key === "all") {
        button.textContent = labelFor("all");
      }
    });

    var products = Array.from(document.querySelectorAll(".product[data-product-id]"));
    products.forEach(function (product) {
      var productId = product.dataset.productId;
      var entry = copy.about.products[productId];
      if (!entry) {
        return;
      }

      var title = product.querySelector("h3");
      var description = product.querySelector("p");
      var price = product.querySelector(".price");
      var tags = Array.from(product.querySelectorAll(".tag"));

      if (title) {
        title.textContent = entry.title[state.lang];
      }
      if (description) {
        description.textContent = entry.copy[state.lang];
      }
      if (price) {
        price.textContent = entry.price;
      }
      product.setAttribute("aria-label", entry.aria[state.lang]);

      tags.forEach(function (tag) {
        var classes = Array.from(tag.classList);
        var categoryClass = classes.find(function (value) {
          return value.indexOf("tag--") === 0;
        });

        if (categoryClass) {
          tag.textContent = labelFor(categoryClass.slice(4));
          return;
        }

        tag.textContent = labelFor(entry.formatKey);
      });
    });

    setButtonText('.actions a[href="/index.html"]', textFor("actionsHome", state.lang));
    setButtonText('.actions a[href="/contact.html"]', textFor("actionsContact", state.lang));
    setText('[data-footer-role="page"]', textFor("footerPage", state.lang));
    setText("#modal-title", textFor("modalTitle", state.lang));
  }

  function translateContact() {
    setTitle(labels[state.lang].contactPageTitle);
    setMetaDescription(textFor("description", state.lang));
    setText(".brand-copy span", textFor("brand", state.lang));
    setText('.nav a[href="/index.html"]', textFor("navHome", state.lang));
    setText('.nav a[href="/about.html"]', textFor("navConcept", state.lang));
    setText(".copy", textFor("copy", state.lang));
    var rowLabels = Array.from(document.querySelectorAll(".row .label"));
    if (rowLabels[0]) {
      rowLabels[0].textContent = textFor("addressLabel", state.lang);
    }
    if (rowLabels[1]) {
      rowLabels[1].textContent = textFor("hoursLabel", state.lang);
    }
    var rowValues = Array.from(document.querySelectorAll(".row .value"));
    if (rowValues[0]) {
      rowValues[0].innerHTML = textFor("addressValue", state.lang).split("\n").join("<br />");
    }
    if (rowValues[1]) {
      rowValues[1].innerHTML = textFor("hoursValue", state.lang).split("\n").join("<br />");
    }
    setText(".directions", textFor("directions", state.lang));
    setText(".links-title", textFor("linksTitle", state.lang));

    var linkPills = Array.from(document.querySelectorAll(".link-pill"));
    linkPills.forEach(function (pill) {
      var first = pill.querySelector("span:first-child");
      var second = pill.querySelector("span:last-child");
      if (first && second) {
        second.textContent = labelFor("open");
      }
    });

    setButtonText('.actions a[href="/index.html"]', textFor("actionsHome", state.lang));
    setButtonText('.actions a[href="/about.html"]', textFor("actionsConcept", state.lang));
    setText('[data-footer-role="page"]', textFor("footerPage", state.lang));
  }

  function translateSharedChrome() {
    var navHome = document.querySelector('.nav a[href="/index.html"]');
    if (navHome && page === "about") {
      navHome.textContent = textFor("navHome", state.lang);
    }
  }

  function translateAboutModalLabels() {
    var modalTitle = document.querySelector("#modal-title");
    var modalClose = document.querySelector(".modal-close");
    var modalCta = document.querySelector("#modal-cta");
    var modalLabels = Array.from(document.querySelectorAll(".modal-label"));

    if (modalTitle) {
      modalTitle.textContent = copy.about.modalTitle[state.lang];
    }
    if (modalClose) {
      modalClose.setAttribute("aria-label", copy.about.closeModal[state.lang]);
    }
    if (modalCta) {
      modalCta.textContent = copy.about.modalCta[state.lang];
    }
    if (modalLabels[0]) {
      modalLabels[0].textContent = labels[state.lang].price;
    }
    if (modalLabels[1]) {
      modalLabels[1].textContent = labels[state.lang].type;
    }
    if (modalLabels[2]) {
      modalLabels[2].textContent = labels[state.lang].format;
    }
  }

  function translatePage() {
    if (page === "home") {
      translateHome();
    } else if (page === "about") {
      translateAbout();
      translateAboutModalLabels();
    } else if (page === "contact") {
      translateContact();
    }
    translateSharedChrome();
  }

  langButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyLanguage(button.dataset.langChoice || "en");
    });
  });

  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyTheme(button.dataset.themeChoice || getSystemTheme());
    });
  });

  if (page === "about") {
    window.addEventListener("vitaminbox:language-change", translateAboutModalLabels);
  }

  applyTheme(state.theme, false);
  applyLanguage(state.lang, false);

  if (systemThemeQuery && typeof systemThemeQuery.addEventListener === "function") {
    systemThemeQuery.addEventListener("change", applyThemeFromSystem);
  } else if (systemThemeQuery && typeof systemThemeQuery.addListener === "function") {
    systemThemeQuery.addListener(applyThemeFromSystem);
  }
})();
