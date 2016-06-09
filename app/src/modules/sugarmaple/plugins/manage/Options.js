class Options {
  constructor(overrides) {
    this.events = {
      onAttach: undefined,
      onDetach: undefined
    };

    this.parameters = {
      easing:          'swing',
      effectsDuration: 400
    };

    this.applyOverrides(overrides);
  }

  applyOverrides(overrides) {
    if (overrides !== 'undefined')
      $.extend(true, this, overrides);
  }
}

export default Options;
