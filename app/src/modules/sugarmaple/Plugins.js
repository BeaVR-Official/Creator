import AbstractPlugin from './plugins/AbstractPlugin';

class Plugins {
  constructor(render) {
    const options = render.tree.options;

    if (options.plugins === undefined) return;
    for (let pName in options.plugins) {
      const pOptions = options.plugins[pName];
      const pClass   = pName.substr(0, 1).toUpperCase() + pName.substr(1);
      const Plugin   = require('./plugins/' + pName + '/' + pClass).default;

      this[pName] = new Plugin(render, pOptions);
    }
  }

  onTreeRendered($holder) {
    for (let pluginName in this)
      if (this[pluginName] instanceof AbstractPlugin)
        this[pluginName].onTreeRendered($holder);
  }

  onNodeRendered($node) {
    for (let pluginName in this)
      if (this[pluginName] instanceof AbstractPlugin)
        this[pluginName].onNodeRendered($node);
  }
}

export default Plugins;