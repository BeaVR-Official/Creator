class Options {
  constructor(overrides) {
    this.events = {
      onChecked:   undefined,
      onUnchecked: undefined
    };

    this.templates = {
      checkbox: '<input type="checkbox" class="node-checkbox"/>'
    };

    this.parameters = {
      defaultChecked: false,
      defaultEnabled: true
    };

    this.applyOverrides(overrides);
  }

  applyOverrides(overrides) {
    if (overrides !== 'undefined')
      $.extend(true, this, overrides);
  }
}

export default Options;