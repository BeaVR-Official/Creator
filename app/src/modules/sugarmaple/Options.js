class Options {
  constructor(overrides) {
    this.events = {
      onImport: undefined,
      onExport: undefined,
      onRender: undefined
    };

    this.templates = {
      list:      '<ul class="list-group"></ul>',
      item:      '<li class="list-group-item"></li>',
      container: '<div class="item-container"></div>',
      title:     '<div class="item-title"></div>',
      content:   '<div class="item-content"></div>',
      icon:      '<span class="icon"></span>',
      badge:     '<span class="badge"></span>',
      link:      '<a href="#"></a>',
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