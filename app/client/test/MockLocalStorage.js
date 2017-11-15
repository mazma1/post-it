let localStorage = {};

const MockLocalStorage = {
  setItem(key, value) {
    return Object.assign(localStorage, { [key]: value });
  },
  getItem(key) {
    return localStorage[key];
  },
  removeItem(key) {
    return delete localStorage[key];
  },
  clear() {
    localStorage = {};
  }
};

export default MockLocalStorage;
