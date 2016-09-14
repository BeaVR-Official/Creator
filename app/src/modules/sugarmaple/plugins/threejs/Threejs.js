import AbstractPlugin from '../AbstractPlugin';
import {Node} from '../../Tree';

/**
 * Custom plugin to interact with ThreeJs
 */
class Threejs extends AbstractPlugin {
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
   * Find node of ThreeJs Object
   * @param object (THREE.Object3D)
   * @returns Node from SugarMaple
   */
  getNodeFromObject(object) {
    let rootNode = this.tree.getRoot();
    let node     = undefined;
    this.tree.iterateOver(rootNode, iNode => {
      if (iNode.data.uuid === object.uuid)
        node = iNode;
    });
    return node;
  }
}

export default Threejs;