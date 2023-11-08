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

chrome.tabs.onCreated.addListener(function (tab) {
  sendOpenTabs();
});

function sendOpenTabs() {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    // Send message to the sidebar with all open tabs
    chrome.runtime.sendMessage({ type: 'openTabs', tabs: tabs });
  });
}

// Listen for a request from the sidebar for open tabs
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'getOpenTabs') {
    sendOpenTabs();
  }
});

chrome.tabs.onMoved.addListener(function (tabId, moveInfo) {
  sendOpenTabs(); // This function will fetch and send the updated order to the sidebar
});

// Object to keep track of tab times
let tabTimes = {};

chrome.tabs.onActivated.addListener(activeInfo => {
  // Update time for the previously active tab
  const now = Date.now();
  updateTabTime(activeInfo.tabId, now);
});

chrome.tabs.onRemoved.addListener(tabId => {
  // Remove the closed tab from our tracking
  delete tabTimes[tabId];
  // Save the updated object
  chrome.storage.local.set({ tabTimes });
});


function updateTabTime(tabId, now) {
  if (!tabTimes[tabId]) {
    tabTimes[tabId] = {
      lastActive: now,
      timeSpent: 0
    };
  } else {
    // Calculate the time spent on the tab since it was last active
    tabTimes[tabId].timeSpent += now - tabTimes[tabId].lastActive;
    tabTimes[tabId].lastActive = now;
  }
  // Save the updated timeSpent to storage
  chrome.storage.local.set({ tabTimes });
}

// This function should be inside your background script



// Function to sort tabs by their activity time
function sortTabsByActivity(callback) {
  chrome.storage.local.get(['tabTimes'], (result) => {
    if (chrome.runtime.lastError) {
      console.error('Error retrieving tabTimes:', chrome.runtime.lastError);
      callback(null, chrome.runtime.lastError); // Use callback to send error
      return;
    }

    if (result.tabTimes) {
      // Convert tabTimes object into an array, sort it, and convert it back
      const sortedTabTimes = Object.entries(result.tabTimes)
        .sort(([, a], [, b]) => b.timeSpent - a.timeSpent);

      const sortedTabIds = sortedTabTimes.map(([tabId]) => parseInt(tabId));
      callback(sortedTabIds); // Use callback to send the sorted tab IDs
    } else {
      callback([]); // Send an empty array if there are no tabTimes
    }
  });
}

// Example usage of sortTabsByActivity
sortTabsByActivity((sortedTabIds, error) => {
  if (error) {
    console.error('Failed to sort tabs by activity:', error);
    return;
  }
  
  // Do something with sortedTabIds, like updating the state or sending them to the content script
  console.log(sortedTabIds);
});





// // Whenever you need to sort the tabs
// sortTabsByActivity(sortedTabIds => {
//   // sortedTabIds now contains an array of tab IDs sorted by activity
//   // Here you would then fetch the tab details and send them to the UI
//   chrome.tabs.query({}, (tabs) => {
//     let sortedTabs = tabs.sort((a, b) => {
//       let posA = sortedTabIds.indexOf(a.id);
//       let posB = sortedTabIds.indexOf(b.id);
//       return posA - posB;
//     });
//     // Now sortedTabs contains the tabs sorted by activity time
//     // Send this sorted list to your UI
//     chrome.runtime.sendMessage({ type: 'sortedTabs', sortedTabs });
//   });
// });

