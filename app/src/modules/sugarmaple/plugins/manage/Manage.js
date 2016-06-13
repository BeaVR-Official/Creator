import AbstractPlugin from '../AbstractPlugin';
import {Node} from '../../Tree';

/**
 * Manage plugin, helps to deal with Nodes
 */
class Manage extends AbstractPlugin {
  constructor(renderer, options) {
    super(renderer, options);
  }

  _initNode(node) {
    // nothing to be done for this plugin
  }

  _onNodeRendered($node) {
    // nothing to be done for this plugin
  }

  /**
   * Creates a new Node
   * @param name
   * @param data Additional Node information
   * @returns {Node}
   */
  create(name, data) {
    return new Node(name, data);
  }

  /**
   * Sets a new root Node on the Tree
   * and displays it
   * @param node
   */
  setRoot(node) {
    this.tree.setRoot(node);
    this.renderer.render(node);
  }

  /**
   * Delegate method for getRoot
   * @returns {*|Node} Current root Node
   */
  getRoot() {
    return this.tree.getRoot();
  }

  /**
   * Adds a new child to the parent
   * and displays it
   * @param parent
   * @param node
   */
  attach(parent, node) {
    this.detach(node);
    this.tree.attach(parent, node);
    this.renderer.render(node);
  }

  /**
   * Removes a Node from its parent
   * and displays it
   * @param node
   */
  detach(node) {
    this.tree.detach(node);
    this._elementFromNode(node).remove();
  }
}

export default Manage;