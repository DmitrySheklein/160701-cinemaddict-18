const TransformKeysObject = class {
  #obj = {};

  constructor(obj) {
    this.#obj = obj;
  }

  #strCamelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

  #strToCamelCase = (str) => {
    let newStr = '';
    if (str) {
      const wordArr = str.split(/[-_]/g);
      for (const i in wordArr) {
        if (i > 0) {
          newStr += wordArr[i].charAt(0).toUpperCase() + wordArr[i].slice(1);
        } else {
          newStr += wordArr[i];
        }
      }
    } else {
      return newStr;
    }
    return newStr;
  };

  #getTransformedObject = (obj, transformFunc) =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      const isObject = typeof value === 'object' && !Array.isArray(value) && value !== null;
      acc[transformFunc(key)] = isObject ? this.#getTransformedObject(value, transformFunc) : value;

      return acc;
    }, {});

  toCamelCase = () => this.#getTransformedObject(this.#obj, this.#strToCamelCase);
  fromCamelToSnakeCase = () => this.#getTransformedObject(this.#obj, this.#strCamelToSnakeCase);
};

export { TransformKeysObject };
