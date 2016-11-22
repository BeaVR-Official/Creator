/**
 * Basic enum type
 */
class Enum {

  /**
   * Sets the Key-Values set
   * this[key] -> value
   * @param en
   */
  constructor(en) {
    const props = Object.keys(en);
    for (const prop of props)
      this[prop] = en[prop];
  }

  /**
   * @returns {Array} of values
   */
  values() {
    return Object.keys(this).map(key => this[key]);
  }

  /**
   * @returns {Array} of keys
   */
  keys() {
    return Object.keys(this);
  }

  /**
   * @param key
   * @returns {*} value from a key
   */
  value(key) {
    return this[key];
  }
}

module.exports = (en) => {
  return new Enum(en);
};