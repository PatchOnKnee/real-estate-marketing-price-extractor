function injectPrice() {
  const propertyInfoHeader = document.querySelector(
    "div.property-info__header"
  );
  const injectedPrice = document.querySelector("p#injected-marketing-price");
  if (propertyInfoHeader && !injectedPrice) {
    const markup = document.documentElement.innerHTML;
    if (markup && markup.includes("marketing_price_range")) {
      try {
        const priceRange = markup
          .split("marketing_price_range")[1]
          .slice(17)
          .split("\\")[0]
          .replace("_", " - ");

        const marketingPrice = document.createElement("p");
        marketingPrice.id = "injected-marketing-price";
        marketingPrice.textContent = `Marketing price range: ${priceRange}`;
        propertyInfoHeader.insertAdjacentElement("beforeend", marketingPrice);
      } catch (err) {}
    }
  }
}

function addLocationObserver(callback) {
  // Options for the observer (which mutations to observe)
  const config = { attributes: false, childList: true, subtree: false };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(document.body, config);
}

function observerCallback() {
  if (window.location.href.startsWith("https://www.realestate.com.au")) {
    injectPrice();
  }
}

addLocationObserver(observerCallback);
observerCallback();
