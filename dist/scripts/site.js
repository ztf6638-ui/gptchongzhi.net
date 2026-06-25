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
    .nav-ai-link {
      gap: 8px !important;
    }

    .nav-ai-label {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.28);
      line-height: 1.1;
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
      min-width: 1.1rem;
      font-size: 1.15rem;
      line-height: 1;
      font-weight: 700;
      transform: translateY(-1px);
    }

    .nav-ai-icon--openai { color: #10a37f; }
    .nav-ai-icon--claude { color: #e7774f; }
    .nav-ai-icon--grok { color: currentColor; }
    .nav-ai-icon--gemini { color: #4f8df6; }
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
      <span class="nav-ai-icon nav-ai-icon--${item.key}" aria-hidden="true">${item.icon}</span>
      <span>${item.label}</span>
    </span>
    ${chevronMarkup}
  `;
}

function enhanceAiNavigation() {
  injectNavEnhancerStyles();

  const items = [
    { href: "/chatgpt-plus", key: "openai", icon: "❋", label: "ChatGPT/Codex" },
    { href: "/claude-pro", key: "claude", icon: "✺", label: "Claude" },
    { href: "/grok", key: "grok", icon: "⌀", label: "Grok" },
    { href: "/gemini-advanced", key: "gemini", icon: "✦", label: "Gemini" }
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
}

document.addEventListener("DOMContentLoaded", () => {
  enhanceAiNavigation();
});
