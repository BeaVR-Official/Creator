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
   * Calls the _onNodeRendered method for all the (active) plugins
   * When this is called, the HTMLElement of the Node is already
   * appended and the plugins can modify it
   * @param $node
   */
  _onNodeRendered($node) {
    for (let pluginName in this)
      if (this[pluginName] instanceof AbstractPlugin)
        this[pluginName]._onNodeRendered($node);
  }

  /**
   * Calls the _initNode method for all the (active) plugins
   * When this is called, the HTMLElement of the Node is already
   * appended and the plugins can add their data structure to the Node
   * in order to be saved. This is called after _onNodeRendered
   * @param $node
   */
  _initNode(node) {
    for (let pluginName in this)
      if (this[pluginName] instanceof AbstractPlugin)
        this[pluginName]._initNode(node);
  }
}

export default Plugins;