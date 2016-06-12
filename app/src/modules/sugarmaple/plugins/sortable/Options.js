class Options {
  constructor(overrides) {
    this.events = {
      onDrag: undefined,
      onDrop: undefined
    };

    this.parameters = {
      easing:           'swing',
      revertDuration:   200,
      effectsDuration:  400,
      defaultFoldable:  true,
      defaultDroppable: true,
      defaultDraggable: true,
      scrollSensitivity: 20,
      scrollSpeed:       10
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
