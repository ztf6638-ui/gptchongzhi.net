function trackEvent(eventName) {
  if (window.gtag) {
    window.gtag("event", eventName);
  }
}

async function copyTextValue(value, successMessage) {
  try {
    await navigator.clipboard.writeText(value);
    showToast(successMessage);
  } catch (error) {
    const input = document.createElement("input");
    input.value = value;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    showToast(successMessage);
  }
}

function copyWechat() {
  copyTextValue("aicz6638", "微信号已复制");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.left = "50%";
  toast.style.bottom = "28px";
  toast.style.transform = "translateX(-50%)";
  toast.style.padding = "12px 16px";
  toast.style.borderRadius = "999px";
  toast.style.background = "#111827";
  toast.style.color = "#ffffff";
  toast.style.fontSize = "14px";
  toast.style.zIndex = "100";
  toast.style.boxShadow = "0 12px 32px rgba(10,10,10,0.18)";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 1800);
}

function injectNavEnhancerStyles() {
  if (document.getElementById("nav-ai-enhancer-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "nav-ai-enhancer-styles";
  style.textContent = `
    .nav-links,
    .hidden.md\\:flex.items-center {
      flex-wrap: nowrap !important;
      white-space: nowrap;
    }

    .nav-links > a,
    .nav-links > .tutorial-dropdown,
    .hidden.md\\:flex.items-center > a,
    .hidden.md\\:flex.items-center > .tutorial-menu {
      flex: 0 0 auto;
    }

    .nav-ai-link {
      display: inline-flex !important;
      align-items: center;
      gap: 8px !important;
      white-space: nowrap;
      font-weight: 600 !important;
    }

    .nav-ai-label {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 7px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.28);
      line-height: 1.1;
      white-space: nowrap;
    }

    .nav-ai-link.active .nav-ai-label,
    .nav-ai-link.is-active .nav-ai-label,
    .nav-ai-link:hover .nav-ai-label,
    .nav-ai-link:focus-visible .nav-ai-label {
      border-bottom-color: currentColor;
    }

    .nav-ai-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      min-width: 22px;
      line-height: 1;
      transform: translateY(-0.5px);
    }

    .nav-ai-icon svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .nav-ai-icon--openai { color: #10a37f; }
    .nav-ai-icon--claude { color: #e7774f; }
    .nav-ai-icon--grok { color: currentColor; }
    .nav-ai-icon--gemini { color: #4f8df6; }
    .nav-ai-icon--teal { color: #10a37f; }
    .nav-ai-icon--orange { color: #e7774f; }
    .nav-ai-icon--blue { color: #4f8df6; }

    #smart-nav .max-w-7xl > .flex {
      gap: 16px;
    }

    #smart-nav .max-w-7xl > .flex > .hidden.md\\:flex.items-center {
      gap: 2px !important;
      margin-left: auto;
      min-width: 0;
    }

    #smart-nav .max-w-7xl > .flex > .flex.items-center.gap-3 {
      flex: 0 0 auto;
    }

    #smart-nav .max-w-7xl > .flex > .flex.items-center.gap-3 span {
      white-space: nowrap;
    }

    #smart-nav .hidden.md\\:flex.items-center > a:not(.nav-ai-link),
    #smart-nav .hidden.md\\:flex.items-center > .tutorial-menu > a:not(.nav-ai-link) {
      white-space: nowrap;
      font-size: 0.94rem;
      padding-left: 12px;
      padding-right: 12px;
    }

    .nav-ai-link .text-white\\/60,
    .nav-ai-link .tutorial-dropdown__chevron {
      margin-left: 1px;
    }

    @media (max-width: 1280px) {
      #smart-nav .max-w-7xl > .flex > .hidden.md\\:flex.items-center {
        gap: 0 !important;
      }

      #smart-nav .hidden.md\\:flex.items-center > a:not(.nav-ai-link),
      #smart-nav .hidden.md\\:flex.items-center > .tutorial-menu > a:not(.nav-ai-link) {
        font-size: 0.9rem;
        padding-left: 10px;
        padding-right: 10px;
      }

      .nav-ai-label {
        gap: 8px;
      }
    }

    #mobile-menu .mobile-section-title {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      letter-spacing: 0.16em;
    }

    #mobile-menu .mobile-ai-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      min-width: 16px;
    }

    #mobile-menu .mobile-ai-icon svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    #mobile-menu .mobile-entry {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    #mobile-menu .mobile-entry-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      min-width: 18px;
      color: rgba(255,255,255,0.82);
      font-size: 0.95rem;
      line-height: 1;
    }
  `;

  document.head.appendChild(style);
}

function enhanceNavTrigger(anchor, item) {
  if (!anchor || anchor.dataset.navEnhanced === "1") {
    return;
  }

  const children = Array.from(anchor.children);
  const lastChild = children.at(-1);
  const chevronMarkup =
    lastChild && /⌄|⌃/.test(lastChild.textContent || "") ? lastChild.outerHTML : "";

  anchor.classList.add("nav-ai-link");
  anchor.dataset.navEnhanced = "1";
  anchor.innerHTML = `
    <span class="nav-ai-label nav-ai-label--${item.key}">
      <span class="nav-ai-icon nav-ai-icon--${item.key}" aria-hidden="true">${item.iconMarkup}</span>
      <span>${item.label}</span>
    </span>
    ${chevronMarkup}
  `;
}

function enhanceAiNavigation() {
  injectNavEnhancerStyles();

  const iconMarkup = {
    openai: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M8.05 4.55a4.15 4.15 0 0 1 6.93-1.85 4.1 4.1 0 0 1 1.2 3.85l1.72 1a4.14 4.14 0 0 1 2.85 7.38 4.1 4.1 0 0 1-3.98.36l-1.72 1a4.15 4.15 0 0 1-6.93 1.85 4.1 4.1 0 0 1-1.2-3.85l-1.72-1a4.14 4.14 0 0 1-2.85-7.38 4.1 4.1 0 0 1 3.98-.36l1.72-1Z"></path>
        <path d="M8.05 4.55 12 6.83l4.18-.28"></path>
        <path d="M16.18 6.55 15.92 11l2.58 3.52"></path>
        <path d="M18.5 14.52 14.55 16.8l-1.82 3.8"></path>
        <path d="M12.73 20.6 8.78 18.32 4.6 18.6"></path>
        <path d="M4.6 18.6 4.86 14.15 2.28 10.63"></path>
        <path d="M2.28 10.63 6.23 8.35 8.05 4.55"></path>
        <path d="M6.23 8.35 9.99 10.52l.02 4.32 3.78 2.18"></path>
        <path d="M17.9 11.01 14.14 8.83 10.39 11l-3.77-2.18"></path>
        <path d="M8.78 18.32 8.76 14l3.74-2.16-.01-4.34"></path>
      </svg>
    `,
    claude: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" aria-hidden="true">
        <path d="M12 2.8v18.4"></path>
        <path d="M8.85 3.58 15.15 20.42"></path>
        <path d="M6.05 5.18 17.95 18.82"></path>
        <path d="M4.12 7.72 19.88 16.28"></path>
        <path d="M3.2 10.75h17.6"></path>
        <path d="M3.58 14.05 20.42 9.95"></path>
        <path d="M5.18 17.05 18.82 6.95"></path>
        <path d="M7.72 19.08 16.28 4.92"></path>
      </svg>
    `,
    grok: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M17.55 5.2 6.45 18.8"></path>
        <path d="M18.4 8.15a7.15 7.15 0 1 1-4.55-3.58"></path>
        <path d="M5.6 15.85a7.15 7.15 0 0 1 12.8-7.7"></path>
      </svg>
    `,
    gemini: `
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1.9c1.23 5.02 5.08 8.87 10.1 10.1-5.02 1.23-8.87 5.08-10.1 10.1C10.77 17.08 6.92 13.23 1.9 12 6.92 10.77 10.77 6.92 12 1.9Z"></path>
      </svg>
    `
  };

  const items = [
    { href: "/chatgpt-plus", key: "openai", iconMarkup: iconMarkup.openai, label: "ChatGPT/Codex" },
    { href: "/gemini-advanced", key: "gemini", iconMarkup: iconMarkup.gemini, label: "Gemini" },
    { href: "/claude-pro", key: "claude", iconMarkup: iconMarkup.claude, label: "Claude" },
    { href: "/grok", key: "grok", iconMarkup: iconMarkup.grok, label: "Grok" }
  ];

  for (const item of items) {
    const selector = [
      `a.tutorial-dropdown__trigger[href="${item.href}"]`,
      `a.tutorial-trigger[href="${item.href}"]`
    ].join(", ");

    document.querySelectorAll(selector).forEach((anchor) => {
      enhanceNavTrigger(anchor, item);
    });
  }

  const mobileTitleMap = {
    "ChatGPT/Codex": { iconMarkup: iconMarkup.openai, colorClass: "nav-ai-icon--teal" },
    "Gemini": { iconMarkup: iconMarkup.gemini, colorClass: "nav-ai-icon--blue" },
    "Claude": { iconMarkup: iconMarkup.claude, colorClass: "nav-ai-icon--orange" },
    "Grok": { iconMarkup: iconMarkup.grok, colorClass: "nav-ai-icon--grok" }
  };

  document.querySelectorAll("#mobile-menu .mobile-section-title[data-ai-title]").forEach((title) => {
    if (title.dataset.mobileEnhanced === "1") {
      return;
    }

    const config = mobileTitleMap[title.dataset.aiTitle];
    if (!config) {
      return;
    }

    title.dataset.mobileEnhanced = "1";
    title.innerHTML = `
      <span class="mobile-ai-icon ${config.colorClass}" aria-hidden="true">${config.iconMarkup}</span>
      <span>${title.dataset.aiTitle}</span>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  enhanceAiNavigation();
});
