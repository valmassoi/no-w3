import { name, version } from '../package.json';

const removeFromDDG = () => {
  const DDGw3Els = document.querySelectorAll("div[data-hostname='www.w3schools.com']"); // :not([style*="display:none"])
  DDGw3Els.forEach(w3El => {
    const childATag = w3El.querySelector('a');
    const href = childATag.getAttribute("href");
    console.info(`${name}: removing ${href}`);
    w3El.style.display = 'none';
  });
}

const removeFromGoogle = () => {
  // CREDIT: selector from https://github.com/GMaiolo/remove-w3schools/blob/master/scripts/remover.js#L6
  const googleW3Els = document.querySelectorAll('div.g:not([style*="display:none"]):not([style*="display: none"]) .r > a[href*="www.w3schools.com"]');
  googleW3Els.forEach(el => {
    const parent = el.closest('#rso div.g');
    if (!parent) return console.warn(`${name}: Google selectors need to be updated.`);
    parent.style.display = 'none';
  })
}

const removeW3Elements = (domain) => ({
  'www.duckduckgo.com': removeFromDDG(),
  'www.google.com': removeFromGoogle(),
})[domain] || console.warn(`${name}: ${domain} is not supported.`);

const app = () => {
  console.info(`${name} v${version} loaded.`);
  window.onload = () => {
    removeW3Elements(window.location.hostname + 'a');
  };
} 
app();
