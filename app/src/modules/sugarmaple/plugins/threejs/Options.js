class Options {
  constructor(overrides) {
    this.applyOverrides(overrides);

    this.templates = {
      deleteBtn: '<span class="node-deleteBtn"><img src="assets/images/cross.png" style="width:11px;" /></span>'
    };

    this.applyOverrides(overrides);
  }

  applyOverrides(overrides) {
    if (overrides !== 'undefined')
      $.extend(true, this, overrides);
  }
}

export default Options;
