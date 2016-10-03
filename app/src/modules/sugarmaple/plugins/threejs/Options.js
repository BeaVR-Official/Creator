class Options {
  constructor(overrides) {
    this.applyOverrides(overrides);

    this.templates = {
      deleteBtn: '<span class="node-deleteBtn">Del</span>'
    };

    this.applyOverrides(overrides);
  }

  applyOverrides(overrides) {
    if (overrides !== 'undefined')
      $.extend(true, this, overrides);
  }
}

export default Options;
