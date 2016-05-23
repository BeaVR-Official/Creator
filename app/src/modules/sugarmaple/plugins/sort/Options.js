class Options {
  constructor(overrides) {
    this.events = {
      onReceive: undefined,
      onOver: undefined,
      onOut: undefined,
      onStart: undefined,
      onStop: undefined
    };

    this.applyOverrides(overrides);
  }

  applyOverrides(overrides) {
    if (overrides !== 'undefined')
      $.extend(true, this, overrides);
  }
}

export default Options;