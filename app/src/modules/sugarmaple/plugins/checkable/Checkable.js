import AbstractPlugin from '../AbstractPlugin';

class Checkable extends AbstractPlugin {
  constructor(render, options) {
    super(render, options);
  }

  _initNode(node) {
    if (node.checkbox === undefined)
      node.checkbox = {};
    if (node.checkbox.checked === undefined)
      node.checkbox.checked = this.options.parameters.defaultChecked;
    if (node.checkbox.enabled === undefined)
      node.checkbox.enabled = this.options.parameters.defaultEnabled;
  }

  _onNodeRendered($node) {
    const that      = this;
    const node      = this._nodeFromElement($node);
    const $checkbox = $(this.options.templates.checkbox);

    $node.find('.node-content').eq(0).append($checkbox);
    $checkbox.click(() => that.toggleCheck(node));

    this._update(node);
  }

  /**
   * @param node
   * @returns {*|jQuery|HTMLElement} Checkbox element of a node
   * @private
   */
  _checkboxFromNode(node) {
    return $(this._elementFromNode(node).find('.node-checkbox').eq(0));
  }

  /**
   * Check a checkbox
   * @param node
   */
  checked(node) {
    node.checkbox.checked = true;

    this._update(node);
    this._trigger('checked', [node]);
  }

  /**
   * Unchecks a checkbox
   * @param node
   */
  uncheck(node) {
    node.checkbox.checked = false;

    this._update(node);
    this._trigger('unchecked', [node]);
  }

  /**
   * Toggles a checkbox
   * @param node
   */
  toggleCheck(node) {
    if (node.checkbox.checked)
      this.uncheck(node);
    else this.checked(node);
  }

  /**
   * Retrieves all checked nodes
   * @param node
   */
  getChecked(node) {
    if (node === undefined) node = this.tree.getRoot();

    let checkedNodes = [];
    this._iterateOverNode(node, (iNode) => {
      if (iNode.checkbox.checked === true)
        checkedNodes.push(iNode);
    });

    return checkedNodes;
  }

  /**
   * Retrieves all unchecked nodes
   * @param node
   */
  getUnchecked(node) {
    if (node === undefined) node = this.tree.getRoot();

    let unCheckedNodes = [];
    this._iterateOverNode(node, (iNode) => {
      if (iNode.checkbox.checked === false)
        unCheckedNodes.push(iNode);
    });

    return unCheckedNodes;
  }

  /**
   * Enables a checkbox
   * @param node
   */
  enable(node) {
    node.checkbox.enabled = true;

    this._update(node);
  }

  /**
   * Disables a checkbox
   * @param node
   */
  disable(node) {
    node.checkbox.enabled = false;

    this._update(node);
  }

  /**
   * Toggles the state of a checkbox
   * @param node
   */
  toggleEnable(node) {
    if (node.checkbox.enabled)
      this.disable(node);
    else this.enable(node);
  }

  /**
   * Retrieves all enabled nodes
   * @param node
   */
  getEnabled(node) {
    if (node === undefined) node = this.tree.getRoot();

    let enabledNodes = [];
    this._iterateOverNode(node, (iNode) => {
      if (iNode.checkbox.enabled === true)
        enabledNodes.push(iNode);
    });

    return enabledNodes;
  }

  /**
   * Retrieves all disabled nodes
   * @param node
   */
  getDisabled(node) {
    if (node === undefined) node = this.tree.getRoot();

    let disabledNodes = [];
    this._iterateOverNode(node, (iNode) => {
      if (iNode.checkbox.enabled === true)
        disabledNodes.push(iNode);
    });

    return disabledNodes;
  }

  /**
   * Renders changes on a checkbox
   * @param node
   * @private
   */
  _update(node) {
    const $checkbox = this._checkboxFromNode(node);

    $checkbox.prop('checked', node.checkbox.checked);
    $checkbox.prop('disabled', !node.checkbox.enabled);
  }
}

export default Checkable;