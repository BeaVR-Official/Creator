import AbstractPlugin from '../AbstractPlugin';
import {Node} from '../../Tree';

class Manage extends AbstractPlugin {
  constructor(render, options) {
    super(render, options);
  }

  onTreeRendered() {
    // nothing to be done for that plugin
  }

  onNodeRendered() {
    // nothing to be done for this plugin
  }

  createNode(name, data) {
    return new Node(name, data);
  }

  attachNodeToRoot(node) {
    this.attachNode(this.tree.rootNode, node);
  }

  attachNode(parentNode, node) {
    const $parents          = {};
    $parents[parentNode.id] = this.elemOf(parentNode);

    this.tree.attachNode(parentNode, node);
    this.render.renderSubtree(node, $parents);
  }

  detachNode(node) {
    this.tree.detachNode(node);
    this.elemOf(node).remove();
  }
}

export default Manage;