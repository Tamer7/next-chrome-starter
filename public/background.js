console.log("background is running haaahhhah");

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const currentUrl = tab.url;

  // Enables the side panel if url matches .com website
  if (currentUrl.includes(".com")) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: "index.html",
      enabled: true,
    });
  } else {
    // Disables the side panel on all other sites if set to false
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: true,
    });
  }
});
