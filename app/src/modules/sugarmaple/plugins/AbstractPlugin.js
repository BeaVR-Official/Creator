class AbstractPlugin {
  constructor(renderer, overrides) {
    if (new.target === AbstractPlugin)
      throw new TypeError('Cannot construct an Abstract Class');
    if (typeof this.onNodeRendered !== 'function')
      throw new TypeError('You must implement onNodeRendered($node)');

    let modulePath = this.constructor.name.toLowerCase();
    let Options    = require('./' + modulePath + '/Options.js').default;

    this.render  = renderer;
    this.tree    = renderer.tree;
    this.$holder = renderer.$holder;
    this.options = new Options(overrides);

    this._subscribeEvents();
  }

  elementOf(node) {
    return $(this.$holder.find('[node-id=' + node.id + ']').eq(0));
  }

  _subscribeEvents() {
    if (this.options.hasOwnProperty('events')) {
      const events = this.options.events;

      for (const event in events) {
        const eventName = this._getEventName(event);
        this.$holder.on(eventName, events[event]);
      }
    }
  }

  _getEventName(eventName) {
    if (eventName.substring(0, 2) === 'on')
      eventName = eventName.slice(2, eventName.length);

    return eventName.charAt(0).toLowerCase() + eventName.slice(1);
  }
}

export default AbstractPlugin;

