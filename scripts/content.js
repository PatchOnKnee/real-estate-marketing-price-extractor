chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message.priceRange) return;
  try {
    const propertyInfoHeader = document.querySelector(
      "div.property-info__header"
    );
    const injectedPrice = document.querySelector("p#injected-marketing-price");
    if (injectedPrice) {
      injectedPrice.remove();
    }

    if (propertyInfoHeader) {
      const marketingPrice = document.createElement("p");
      marketingPrice.id = "injected-marketing-price";
      marketingPrice.textContent = `Marketing price range: ${message.priceRange}`;
      propertyInfoHeader.insertAdjacentElement("beforeend", marketingPrice);
    }
  } catch (err) {}
  return false;
});
