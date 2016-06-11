import AbstractPlugin from '../AbstractPlugin';

class Checkbox extends AbstractPlugin {
  constructor(render, options) {
    super(render, options);
  }

  onTreeRendered() {
    // nothing to be done for that plugin
  }

  onNodeRendered($node) {
    const node          = $node.data('node');
    const $checkbox     = $(this.options.templates.checkbox);
    const $checkboxCont = $(this.options.templates.checkboxCont);

    this.initNode(node);

    $checkbox.prop('checked', node.checkbox.checked);
    $checkbox.prop('disabled', !node.checkbox.enabled);
    $checkbox.on('pCheck', () => this.check(node));
    $checkbox.on('pUnCheck', () => this.unCheck(node));
    $checkbox.on('pToggleCheck', () => this.toggleCheck(node));
    $checkbox.on('pEnable', () => this.enable(node));
    $checkbox.on('pDisable', () => this.disable(node));
    $checkbox.on('pToggleDisable', () => this.toggleEnable(node));
    $checkbox.click((event) => {
      this.toggleCheck(node);
      event.stopPropagation();
    });
    $checkboxCont.append($checkbox);

    $node.find('.node-content').eq(0).append($checkboxCont);
  }

  initNode(node) {
    if (node.checkbox === undefined)
      node.checkbox = {
        checked: this.options.parameters.defaultChecked,
        enabled: this.options.parameters.defaultEnabled
      };
  }

  checkboxOf(node) {
    return $(this.elementFromNode(node).find('.node-checkbox').eq(0));
  }

  checkboxesOf(node) {
    return this.elementFromNode(node).find('.node-checkbox');
  }

  getChecked(node) {
    const $node        = this.elementFromNode(node);
    const $checked     = $node.find('.child-group-node:has(.node-checkbox:checked)');
    const checkedNodes = [];

    for (let checked of $checked)
      checkedNodes.push($(checked).data('node'));

    return checkedNodes;
  }

  getUnChecked(node) {
    const $node          = this.elementFromNode(node);
    const $unChecked     = $node.find('.child-group-node:has(.node-checkbox:not(:checked))');
    const unCheckedNodes = [];

    for (let unChecked of $unChecked)
      unCheckedNodes.push($(unChecked).data('node'));

    return unCheckedNodes;
  }

  getDisabled(node) {
    const $node         = this.elementFromNode(node);
    const $disabled     = $node.find('.child-group-node:has(.node-checkbox:disabled)');
    const disabledNodes = [];

    for (let disabled of $disabled)
      disabledNodes.push($(disabled).data('node'));

    return disabledNodes;
  }

  getEnabled(node) {
    const $node        = this.elementFromNode(node);
    const $enabled     = $node.find('.child-group-node:has(.node-checkbox:not(:disabled))');
    const enabledNodes = [];

    for (let enabled of $enabled)
      enabledNodes.push($(enabled).data('node'));

    return enabledNodes;
  }

  enable(node) {
    this.initNode(node);
    node.checkbox.enabled = true;
    this.checkboxOf(node).prop('disabled', false);
    this.$holder.trigger('enable', node);
  }

  disable(node) {
    this.initNode(node);
    node.checkbox.enabled = false;
    this.checkboxOf(node).prop('disabled', true);
    this.$holder.trigger('disable', node);
  }

  toggleEnable(node) {
    this.initNode(node);
    if (node.checkbox.enabled)
      this.disable(node);
    else
      this.enable(node);
  }

  enableAll(node) {
    this.checkboxesOf(node).trigger('pEnable');
  }

  disableAll(node) {
    this.checkboxesOf(node).trigger('pDisable');
  }

  toggleEnableAll(node) {
    this.checkboxesOf(node).trigger('pToggleDisable');
  }

  check(node) {
    this.initNode(node);
    node.checkbox.checked = true;
    this.checkboxOf(node).prop('checked', true);
    this.$holder.trigger('check', node);
  }

  unCheck(node) {
    this.initNode(node);
    node.checkbox.checked = false;
    this.checkboxOf(node).prop('checked', false);
    this.$holder.trigger('unCheck', node);
  }

  toggleCheck(node) {
    this.initNode(node);
    if (node.checkbox.checked)
      this.unCheck(node);
    else
      this.check(node);
  }

  checkAll(node) {
    this.checkboxesOf(node).trigger('pCheck');
  }

  unCheckAll(node) {
    this.checkboxesOf(node).trigger('pUnCheck');
  }

  toggleCheckAll(node) {
    this.checkboxesOf(node).trigger('pToggleCheck');
  }
}

export default Checkbox;