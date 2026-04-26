(function () {
  const BUTTON_CLASS = "aump-copy-page";
  const ACTIONS_CLASS = "aump-page-actions";
  const COPIED_LABEL = "Copied";
  const DEFAULT_LABEL = "Copy page";
  const ERROR_LABEL = "Copy failed";

  function cleanArticleClone(article) {
    const clone = article.cloneNode(true);
    clone
      .querySelectorAll(
        [
          `.${ACTIONS_CLASS}`,
          ".headerlink",
          ".md-clipboard",
          "script",
          "style",
          "noscript",
        ].join(","),
      )
      .forEach((node) => node.remove());
    return clone;
  }

  function normalizeText(value) {
    return value
      .replace(/\u00a0/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function pageText(article) {
    const clone = cleanArticleClone(article);
    const text = normalizeText(clone.innerText || clone.textContent || "");
    const url = window.location.href.split("#")[0];
    return `${text}\n\nSource: ${url}\n`;
  }

  async function writeClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function setButtonLabel(button, label) {
    button.querySelector(".aump-copy-page__label").textContent = label;
  }

  function addCopyButton() {
    document.querySelectorAll(`.${ACTIONS_CLASS}`).forEach((node) => node.remove());

    const article = document.querySelector(".md-content__inner");
    if (!article) return;

    const actions = document.createElement("div");
    actions.className = ACTIONS_CLASS;

    const button = document.createElement("button");
    button.type = "button";
    button.className = BUTTON_CLASS;
    button.setAttribute("aria-label", "Copy all page content");
    button.innerHTML = [
      '<span class="aump-copy-page__icon" aria-hidden="true">',
      '<svg viewBox="0 0 24 24" focusable="false">',
      '<path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8C6.9 5 6 5.9 6 7v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>',
      "</svg>",
      "</span>",
      `<span class="aump-copy-page__label">${DEFAULT_LABEL}</span>`,
    ].join("");

    button.addEventListener("click", async () => {
      button.disabled = true;
      try {
        await writeClipboard(pageText(article));
        setButtonLabel(button, COPIED_LABEL);
      } catch (_error) {
        setButtonLabel(button, ERROR_LABEL);
      } finally {
        window.setTimeout(() => {
          setButtonLabel(button, DEFAULT_LABEL);
          button.disabled = false;
        }, 1600);
      }
    });

    actions.appendChild(button);
    article.insertBefore(actions, article.firstChild);
  }

  if (window.document$) {
    window.document$.subscribe(addCopyButton);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addCopyButton);
  } else {
    addCopyButton();
  }
})();
