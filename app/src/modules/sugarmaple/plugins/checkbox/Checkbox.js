import AbstractPlugin from '../AbstractPlugin';

class Checkbox extends AbstractPlugin {
  constructor(render, options) {
    super(render, options);
  }

  onTreeRendered() {
    // nothing to be done for that plugin
  }

  onNodeRendered($node) {
    const node      = $node.data('node');
    const $checkbox = $(this._options.templates.checkbox);

    this.initNode(node);

    $checkbox.change(function () {
      let isChecked = $(this).prop('checked');
      $(this).parent('.list-group-item')
             .find('.item-checkbox')
             .prop('checked', isChecked);
    });
    $checkbox.prop('checked', node._checkbox.value === 'checked');
    $checkbox.attr('disabled', node._checkbox.state !== 'enabled');

    $node.prepend($checkbox);
  }

  initNode(node) {
    if (node._checkbox === undefined)
      node._checkbox = {
        value: this._options.parameters.defaultValue,
        state: this._options.parameters.defaultState
      };
  }


  disable(node) {
    this.initNode(node);
    node._checkbox.state = 'disabled';
    this._render.redrawNode(node);
  }

  enable(node) {
    this.initNode(node);
    node._checkbox.state = 'enabled';
    this._render.redrawNode(node);
  }

  toggleDisable(node) {
    this.initNode(node);
    if (node._checkbox.state === 'enabled')
      this.disable(node);
    else
      this.enable(node);
    this._render.redrawNode(node);
  }

  check(node) {
    this.initNode(node);
    node._checkbox.value = 'checked';
    this._render.redrawNode(node);
  }

  uncheck(node) {
    this.initNode(node);
    node._checkbox.value = 'unchecked';
    this._render.redrawNode(node);
  }

  toggleCheck(node) {
    this.initNode(node);
    if (node._checkbox.value === 'checked')
      this.uncheck(node);
    else
      this.check(node);
    this._render.redrawNode(node);
  }
}

export default Checkbox;