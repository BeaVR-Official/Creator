class Options {
  constructor(overrides) {
    this.events = {
      onCheck: undefined
    };

    this.templates = {
      checkbox: '<input type="checkbox" class="item-checkbox">'
    };

    this.parameters = {
      defaultValue: 'unchecked',
      defaultState: 'enabled'
    };

    this.applyOverrides(overrides);
  }

  applyOverrides(overrides) {
    if (overrides !== 'undefined')
      $.extend(true, this, overrides);
  }
}

export default Options;