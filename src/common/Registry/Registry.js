export default class Registry {
  /**
   * @static
   * @param {string} slug
   * @param {string} selector
   * @return {object}
   */
  static get(slug, selector) {
    Registry.setGlobal();

    return window.Registry.instances[selector] ? window.Registry.instances[selector][slug] : null;
  }

  /**
   * @static
   * @param {string} slug
   * @param {string} selector
   * @param {string|object} instance
   * @return {Registry}
   */
  static set(slug, selector, instance) {
    Registry.setGlobal();

    window.Registry.instances[selector] = window.Registry.instances[selector] || {};
    window.Registry.instances[selector][slug] = instance;
    return window.Registry;
  }

  /**
   * @static
   * @param {string} slug
   * @param {string} selector
   * @return {Registry}
   */
  static forget(slug, selector) {
    Registry.setGlobal();
    if (typeof window.Registry.instances[selector] !== 'undefined') {
      delete window.Registry.instances[selector][slug];
    }
    return window.Registry;
  }

  /**
   * @static
   */
  static setGlobal() {
    if (typeof window.Registry === 'undefined') {
      Registry.instances = {};
      window.Registry = Registry;
    }
  }
};
