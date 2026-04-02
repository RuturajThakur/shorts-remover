const SHORTS_PATH_PREFIX = "/shorts/";

const selectorsToHide = [
  'a[href^="/shorts/"]',
  'ytd-rich-section-renderer',
  'ytd-reel-shelf-renderer',
  'ytd-rich-shelf-renderer',
  'ytd-reel-video-renderer',
  'ytd-guide-entry-renderer a[href="/shorts"]',
  'tp-yt-paper-item a[href="/shorts"]'
];

function textIncludesShorts(value) {
  return typeof value === "string" && value.toLowerCase().includes("shorts");
}

function hideElement(element) {
  if (!element || element.dataset.shortsRemoverHidden === "true") {
    return;
  }

  element.dataset.shortsRemoverHidden = "true";
  element.style.setProperty("display", "none", "important");
}

function hideShortsLinks() {
  document.querySelectorAll('a[href^="/shorts/"]').forEach((link) => {
    const container =
      link.closest("ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, ytd-video-renderer") ||
      link;

    hideElement(container);
  });
}

function hideShortsShelves() {
  document.querySelectorAll("ytd-rich-section-renderer, ytd-rich-shelf-renderer, ytd-reel-shelf-renderer").forEach((section) => {
    if (textIncludesShorts(section.innerText)) {
      hideElement(section);
    }
  });
}

function hideShortsNavEntries() {
  document.querySelectorAll('a[href="/shorts"], a[title="Shorts"]').forEach((link) => {
    const container = link.closest("ytd-guide-entry-renderer, tp-yt-paper-item, ytd-mini-guide-entry-renderer") || link;
    hideElement(container);
  });
}

function hideBySelector() {
  selectorsToHide.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      if (selector.includes('href="/shorts"')) {
        const container = node.closest("ytd-guide-entry-renderer, tp-yt-paper-item, ytd-mini-guide-entry-renderer") || node;
        hideElement(container);
        return;
      }

      hideElement(node);
    });
  });
}

function removeShorts() {
  hideBySelector();
  hideShortsLinks();
  hideShortsShelves();
  hideShortsNavEntries();
}

function redirectIfOnShortsPage() {
  if (window.location.pathname.startsWith(SHORTS_PATH_PREFIX)) {
    window.location.replace("https://www.youtube.com/");
  }
}

const observer = new MutationObserver(() => {
  redirectIfOnShortsPage();
  removeShorts();
});

redirectIfOnShortsPage();
removeShorts();

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
