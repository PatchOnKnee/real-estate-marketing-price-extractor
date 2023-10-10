chrome.tabs.onUpdated.addListener(function (tabId, info) {
  if (info.status === "complete") {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      if (url.includes("realestate.com.au")) {
        fetch(url)
          .then(function (response) {
            return response.text();
          })
          .then(function (html) {
            try {
              const priceRange = html
                .split("marketing_price_range")[1]
                .slice(17)
                .split("\\")[0]
                .replace("_", " - ");
              chrome.tabs.sendMessage(tabs[0].id, { priceRange });
            } catch (err) {}
          })
          .catch(function () {});
      }
    });
  }
});
