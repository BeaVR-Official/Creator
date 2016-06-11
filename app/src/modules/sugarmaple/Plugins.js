import AbstractPlugin from './plugins/AbstractPlugin';

/**
 * Loads the plugins that will be attached to the Renderer
 */
class Plugins {
  constructor(render) {
    const options = render.tree.options;

    if (options.plugins === undefined) return;
    // Creates new instances of the Renderer plugins
    for (let pName in options.plugins) {
      const pOptions = options.plugins[pName];
      const pClass   = pName.substr(0, 1).toUpperCase() + pName.substr(1);
      const Plugin   = require('./plugins/' + pName + '/' + pClass).default;

      // Adds loaded plugin to the class
      this[pName] = new Plugin(render, pOptions);
    }
  }

  /**
   * Calls the onNodeRendered method for all the (active) plugins
   * @param $node
   */
  onNodeRendered($node) {
    for (let pluginName in this)
      if (this[pluginName] instanceof AbstractPlugin)
        this[pluginName].onNodeRendered($node);
  }
}

export default Plugins;