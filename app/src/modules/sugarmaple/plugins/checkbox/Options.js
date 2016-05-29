class Options {
  constructor(overrides) {
    this.events = {
      onCheck: undefined,
      onUnCheck: undefined,
      onEnable: undefined,
      onDisable: undefined
    };

    this.templates = {
      checkbox: '<input type="checkbox" class="item-checkbox"/>'
    };

    this.parameters = {
      defaultChecked: false,
      defaultEnabled: false
    };

    this.applyOverrides(overrides);
  }

  applyOverrides(overrides) {
    if (overrides !== 'undefined')
      $.extend(true, this, overrides);
  }
}

export default Options;