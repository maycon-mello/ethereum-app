/**
 * Simple mock for localStorage
 */

let data = {};

export default {
  setItem(key, value) {
    data[key] = value;
  },

  getItem(key) {
    return data[key];
  },

  removeItem(key) {
    delete data[key];
  },

  clear() {
    data = {};
  },

  get keys() {
    return Object.keys(data);
  }
}