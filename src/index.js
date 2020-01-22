import { name, version } from '../package.json';
import { noop } from './utils';

const removeFromDDG = () => {
  const DDGw3Els = document.querySelectorAll("div[data-hostname='www.w3schools.com']"); // :not([style*="display:none"])
  DDGw3Els.forEach((el) => {
    const parent = el;
    const childATag = parent.querySelector('a');
    const href = childATag.getAttribute('href');
    console.info(`${name}: removing ${href}`);
    parent.style.display = 'none';
  });
};
const removeFromGoogle = () => {
  // CREDIT: selector from https://github.com/GMaiolo/remove-w3schools/blob/master/scripts/remover.js#L6
  const googleW3Els = document.querySelectorAll('div.g:not([style*="display:none"]):not([style*="display: none"]) .r > a[href*="www.w3schools.com"]');
  googleW3Els.forEach((el) => {
    const parent = el.closest('#rso div.g');
    if (!parent) return console.warn(`${name}: Google selectors need to be updated.`);
    parent.style.display = 'none';
    return noop;
  });
};

const unsupportedWarning = (domain) => console.warn(`${name}: ${domain} is not supported.`);

const removeW3Elements = (domain) => ({
  'duckduckgo.com': removeFromDDG,
  'google.com': removeFromGoogle,
})[domain] || unsupportedWarning(domain);

const app = () => {
  console.info(`${name} v${version} loaded.`);
  window.onload = () => {
    removeW3Elements(window.location.hostname.replace('www.', ''))();
  };
};
app();
