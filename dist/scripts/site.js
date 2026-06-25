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
      width: 18px;
      height: 18px;
      min-width: 18px;
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
      width: 14px;
      height: 14px;
      min-width: 14px;
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 3.4a3.6 3.6 0 0 1 3.6 3.6v2.1l1.8-1a3.6 3.6 0 0 1 4.9 1.3 3.6 3.6 0 0 1-1.3 4.9l-1.9 1.1 1.9 1.1a3.6 3.6 0 0 1 1.3 4.9 3.6 3.6 0 0 1-4.9 1.3l-1.8-1V17a3.6 3.6 0 0 1-7.2 0v-2.1l-1.8 1a3.6 3.6 0 0 1-4.9-1.3 3.6 3.6 0 0 1 1.3-4.9l1.9-1.1-1.9-1.1A3.6 3.6 0 0 1 1.7 9.4a3.6 3.6 0 0 1 4.9-1.3l1.8 1V7A3.6 3.6 0 0 1 12 3.4Z"></path>
        <circle cx="12" cy="12" r="2.35"></circle>
      </svg>
    `,
    claude: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 3v18"></path>
        <path d="M5.7 5.7 18.3 18.3"></path>
        <path d="M3 12h18"></path>
        <path d="M5.7 18.3 18.3 5.7"></path>
      </svg>
    `,
    grok: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.95" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M7.2 4.5h9.6"></path>
        <path d="M8.5 19.5h7"></path>
        <path d="M16.8 4.5 7.2 19.5"></path>
        <path d="M7.2 4.5c5 0 8 2.9 8 7.1 0 4.5-2.8 7.9-6.7 7.9"></path>
      </svg>
    `,
    gemini: `
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.5c1.4 4.2 4.8 7.9 9.5 9.5-4.7 1.6-8.1 5.3-9.5 9.5-1.4-4.2-4.8-7.9-9.5-9.5 4.7-1.6 8.1-5.3 9.5-9.5Z"></path>
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
