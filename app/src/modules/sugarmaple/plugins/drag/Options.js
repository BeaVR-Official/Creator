class Options {
  constructor(overrides) {
    this.events = {
      onDrag: undefined,
      onDrop: undefined
    };

    this.parameters = {
      easing:          'swing',
      revertDuration:  200,
      effectsDuration: 400,
      foldable:        true,
      droppable:       true,
      draggable:       true
    };

    this.templates = {
      placeholder: '<div class="placeholder"></div>'
    };

    this.applyOverrides(overrides);
  }

  applyOverrides(overrides) {
    if (overrides !== 'undefined')
      $.extend(true, this, overrides);
  }
}

export default Options;
