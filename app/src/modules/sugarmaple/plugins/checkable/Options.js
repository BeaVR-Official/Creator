class Options {
  constructor(overrides) {
    this.events = {
      onChecked:   undefined,
      onUnchecked: undefined
    };

    this.templates = {
      checkbox: '<div class="roundedOne"><input type="checkbox" value="None" class="node-checkbox" name="check" /><label for="roundedOne"></label></div>'
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