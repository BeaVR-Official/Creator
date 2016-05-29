class AbstractPlugin {
  constructor(render, overrides) {
    this.checkInstance();
    this.checkMethod(this.onTreeRendered, 'onTreeRendered($holder)');
    this.checkMethod(this.onNodeRendered, 'onNodeRendered($node)');

    let modulePath = this.constructor.name.toLowerCase();
    let Options    = require('./' + modulePath + '/Options.js').default;

    this._render  = render;
    this._tree    = render._tree;
    this._$holder = render._$holder;
    this._options = new Options(overrides);

    this.subscribeEvents();
  }

  subscribeEvents() {
    if (this._options.hasOwnProperty('events')) {
      const events = this._options.events;

      for (const event in events) {
        const eventName = this.getEventName(event);
        this._$holder.on(eventName, events[event]);
      }
    }
  }

  getEventName(eventName) {
    if (eventName.substring(0, 2) === 'on')
      eventName = eventName.slice(2, eventName.length);

    return eventName.charAt(0).toLowerCase() + eventName.slice(1);
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

