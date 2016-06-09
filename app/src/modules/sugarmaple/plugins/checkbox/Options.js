class Options {
  constructor(overrides) {
    this.events = {
      onCheck:   undefined,
      onUnCheck: undefined
    };

    this.templates = {
      checkboxCont: '<div class="node-checkbox-container"/></div>',
      checkbox:     '<input type="checkbox" class="node-checkbox"/>'
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