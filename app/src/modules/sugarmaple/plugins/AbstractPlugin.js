class AbstractPlugin {
  constructor(renderer, overrides) {
    // Check that the plugin is implemented correctly
    if (new.target === AbstractPlugin)
      throw new TypeError('Cannot construct an Abstract Class');
    if (typeof this.onNodeRendered !== 'function')
      throw new TypeError('You must implement onNodeRendered($node)');

    // Load the default Options for the plugin
    let modulePath = this.constructor.name.toLowerCase();
    let Options    = require('./' + modulePath + '/Options.js').default;

    // Make tools easily available for plugin
    this.renderer = renderer;
    this.tree     = renderer.tree;
    this.$holder  = renderer.$holder;
    this.options  = new Options(overrides);

    // Make the plugin events available to jQuery
    this._subscribeEvents();
  }

  /**
   * Delegated method from Renderer
   * @param node
   * @returns {*|jQuery|HTMLElement}
   */
  elementFromNode(node) {
    return this.renderer._elementFromNode(node);
  }

  /**
   * Delegated method from Renderer
   * @param $node
   * @returns {*|jQuery|HTMLElement}
   */
  nodeFromElement($node) {
    return this.renderer._nodeFromElement($node);
  }

  /**
   * Makes the events defined in the
   * plugin Option available to jQuery
   * @private
   */
  _subscribeEvents() {
    if (this.options.hasOwnProperty('events')) {
      const events = this.options.events;
      // Iterate on the event methods
      for (const event in events) {
        const eventName = this._getEventName(event);
        // Add the the event to jQuery
        this.$holder.on(eventName, events[event]);
      }
    }
  }

  /**
   * Removes the on prefix from the name of a function event
   * @param eventName
   * @returns eventName eventName without the 'on' prefix
   * @private
   */
  _getEventName(eventName) {
    if (eventName.substring(0, 2) === 'on')
      eventName = eventName.slice(2, eventName.length);

    return eventName.charAt(0).toLowerCase() + eventName.slice(1);
  }
}

export default AbstractPlugin;

