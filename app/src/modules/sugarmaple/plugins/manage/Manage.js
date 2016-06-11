import AbstractPlugin from '../AbstractPlugin';
import {Node} from '../../Tree';

/**
 * Manage plugin, helps to deal with Nodes
 */
class Manage extends AbstractPlugin {
  constructor(renderer, options) {
    super(renderer, options);
  }

  onNodeRendered($node) {
    // nothing to be done for this plugin
  }

  /**
   * Creates a new Node
   * @param name
   * @param data Additional Node information
   * @returns {Node}
   */
  createNode(name, data) {
    return new Node(name, data);
  }

  /**
   * Sets a new root Node on the Tree
   * and displays it
   * @param node
   */
  setRootNode(node) {
    this.tree.setRootNode(node);
    this.renderer.render(node);
  }

  /**
   * @param node
   * @returns {*|Node} Current root Node
   */
  getRootNode(node) {
    return this.tree.getRootNode();
  }

  /**
   * Adds a new child to the parent
   * and displays it
   * @param parent
   * @param node
   */
  attachNode(parent, node) {
    this.detachNode(node);
    this.tree.attachNode(parent, node);
    this.renderer.render(node);
  }

  /**
   * Removes a Node from its parent
   * and displays it
   * @param node
   */
  detachNode(node) {
    this.tree.detachNode(node);
    this.elementFromNode(node).remove();
  }
}

export default Manage;