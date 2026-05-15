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
