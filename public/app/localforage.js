import localforage from 'localforage';

export class LocalForage {
  storage;

  constructor() {
    this.storage = localforage.createInstance({
      name: 'toptaltest'
    });
  }

  /**
   * stores key/value pair by stringifying data
   * @param {string} key
   * @param {mixed} data
   */
  store(key, data) {
    this.storage.setItem(key, JSON.stringify(data));
  }

  /**
   * removes stored data from storage
   * @param {?string} key
   */
  reset(key) {
    if (key) {
      this.storage.removeItem(key);
    } else {
      this.storage.clear();
    }
  }

  /**
   * returns data stored in localforage
   * @param {string} key
   * @returns {Promise<mixed>}
   */
  load(key) {
    return new Promise((resolve, reject) => {
      this.storage.getItem(key, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(JSON.parse(data));
      });
    });
  }
}

const instance = new LocalForage();
export default instance;
