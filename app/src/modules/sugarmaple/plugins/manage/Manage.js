import AbstractPlugin from '../AbstractPlugin';
import {Node} from '../../Tree';

class Manage extends AbstractPlugin {
  constructor(renderer, options) {
    super(renderer, options);
  }

  onNodeRendered() {
    // nothing to be done for this plugin
  }

  createNode(name, data) {
    return new Node(name, data);
  }

  setRootNode(node) {
    this.tree.setRootNode(node);
    this.render.renderSubtree(node);
  }

  getRootNode(node) {
    return this.tree.getRootNode();
  }

  attachNode(parentNode, node) {
    const $parents          = {};
    $parents[parentNode.id] = this.elementOf(parentNode);

    this.detachNode(node);
    this.tree.attachNode(parentNode, node);
    this.render.renderSubtree(node, $parents);
  }

  detachNode(node) {
    this.tree.detachNode(node);
    this.elementOf(node).remove();
  }
}

export default Manage;