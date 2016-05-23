class Options {
  constructor(overrides) {
    this.events = {
      onImport: undefined,
      onExport: undefined,
      onRender: (node) => {
        return node._name;
      }
    };

    this.templates = {
      list:        '<ul class="list-group"><br></ul>',
      item:        '<li class="list-group-item"></li>',
      itemContent: '<div class="item-content"></div>',
      icon:        '<span class="icon"></span>',
      badge:       '<span class="badge"></span>',
      link:        '<a href="#"></a>',
      checkbox:    '<input type="checkbox">'
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