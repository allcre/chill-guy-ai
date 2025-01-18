let lastPopupTime = 0;

function createChillGuyElement(text) {
  const chillGuy = document.createElement('div');
  chillGuy.style.position = 'fixed';
  chillGuy.style.bottom = '20px';
  chillGuy.style.right = '20px';
  chillGuy.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  chillGuy.style.color = 'white';
  chillGuy.style.padding = '10px';
  chillGuy.style.borderRadius = '5px';
  chillGuy.style.zIndex = '9999';
  chillGuy.textContent = text;
  return chillGuy;
}

function activateChillGuy() {
  const currentTime = Date.now();
  if (currentTime - lastPopupTime < 10000) {
    return; // Don't show popup if less than 10 seconds have passed
  }

  chrome.runtime.sendMessage({ action: "generateContent", input: "Activate Chill Guy" }, (response) => {
    if (response.success) {
      const chillGuy = createChillGuyElement(response.data.text);
      document.body.appendChild(chillGuy);
      lastPopupTime = currentTime;
      setTimeout(() => {
        chillGuy.remove();
      }, 5000);
    }
  });
}

function checkForRizz() {
  const pageContent = document.body.innerText.toLowerCase();
  if (pageContent.includes('rizz')) {
    activateChillGuy();
  }
}

// Activate Chill Guy when TikTok is loaded
if (window.location.hostname.includes('tiktok.com')) {
  window.addEventListener('load', activateChillGuy);
}

// Run the "rizz" check every 5 seconds on all pages
setInterval(checkForRizz, 5000);

// Keep the existing message listener for manual activation
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "activateChillGuy") {
    activateChillGuy();
  }
});
