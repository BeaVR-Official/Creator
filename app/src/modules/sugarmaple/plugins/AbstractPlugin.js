class AbstractPlugin {
  constructor(render, overrides) {
    this.checkInstance();
    this.checkMethod(this.onTreeRendered, 'onTreeRendered($holder)');
    this.checkMethod(this.onNodeRendered, 'onNodeRendered($node)');

    let modulePath = this.constructor.name.toLowerCase();
    let Options    = require('./' + modulePath + '/Options.js').default;

    this._render  = render;
    this._tree    = render._tree;
    this._options = new Options(overrides);
  }

  checkInstance() {
    if (new.target === AbstractPlugin)
      throw new TypeError('Cannot construct an Abstract Class');
  }

  checkMethod(func, proto) {
    if (typeof func !== 'function')
      throw new TypeError('You must implement ' + proto);
  }
}

export default AbstractPlugin;

