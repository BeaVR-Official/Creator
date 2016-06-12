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
    const node      = this.nodeFromElement($node);
    const $checkbox = $(this.options.templates.checkbox);

    $node.find('.node-content').eq(0).append($checkbox);
    $checkbox.click(() => that.toggleChecked(node));

    this._update(node);
  }

  /**
   * @param node
   * @returns {*|jQuery|HTMLElement} Checkbox element of a node
   * @private
   */
  _checkboxFromNode(node) {
    return $(this.elementFromNode(node).find('.node-checkbox').eq(0));
  }

  /**
   * Check a checkbox
   * @param node
   */
  checked(node) {
    node.checkbox.checked = true;

    this._update(node);
    this.trigger('checked', node);
  }

  /**
   * Unchecks a checkbox
   * @param node
   */
  unchecked(node) {
    node.checkbox.checked = false;

    this._update(node);
    this.trigger('unchecked', node);
  }

  /**
   * Toggles a checkbox
   * @param node
   */
  toggleChecked(node) {
    if (node.checkbox.checked)
      this.unchecked(node);
    else this.checked(node);
  }

  /**
   * Retrieves all checked nodes
   * @param node
   */
  getChecked(node) {
    if (node === undefined) node = this.tree.getRootNode();

    let checkedNodes = [];
    this.iterateOverNode(node, (iNode) => {
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
    if (node === undefined) node = this.tree.getRootNode();

    let unCheckedNodes = [];
    this.iterateOverNode(node, (iNode) => {
      if (iNode.checkbox.checked === false)
        unCheckedNodes.push(iNode);
    });

    return unCheckedNodes;
  }

  /**
   * Enables a checkbox
   * @param node
   */
  enabled(node) {
    node.checkbox.enabled = true;

    this._update(node);
  }

  /**
   * Disables a checkbox
   * @param node
   */
  disabled(node) {
    node.checkbox.enabled = false;

    this._update(node);
  }

  /**
   * Toggles the state of a checkbox
   * @param node
   */
  toggleEnabled(node) {
    if (node.checkbox.enabled)
      this.disabled(node);
    else this.enabled(node);
  }

  /**
   * Retrieves all enabled nodes
   * @param node
   */
  getEnabled(node) {
    if (node === undefined) node = this.tree.getRootNode();

    let enabledNodes = [];
    this.iterateOverNode(node, (iNode) => {
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
    if (node === undefined) node = this.tree.getRootNode();

    let disabledNodes = [];
    this.iterateOverNode(node, (iNode) => {
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