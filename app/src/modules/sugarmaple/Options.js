class Options {
  constructor(overrides) {
    this.events = {
      onImport: undefined,
      onExport: undefined,
      onRender: undefined
    };

    this.templates = {
      node:        '<div class="node"></div>',
      title:       '<div class="node-title"></div>',
      content:     '<div class="node-content"></div>',
      icon:        '<span class="icon"></span>',
      badge:       '<span class="badge"></span>',
      child:       '<div class="node-child"></div>',
      childCont:   '<div class="node-child-container"></div>',
      link:        '<a href="#"></a>'
    };

    this.templates.icons = {
      expand:   'glyphicon glyphicon-plus',
      collapse: 'glyphicon glyphicon-minus',
      empty:    'glyphicon',
      node:     ''
    };

    this.applyOverrides(overrides);
  }

  applyOverrides(overrides) {
    if (overrides !== 'undefined')
      $.extend(true, this, overrides);
  }
}

export default Options;