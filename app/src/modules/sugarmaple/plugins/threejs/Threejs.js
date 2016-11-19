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
    const that       = this;
    const node       = this._nodeFromElement($node);
    const $deleteBtn = $(this.options.templates.deleteBtn);





    $node.find('.node-content').eq(0).append($deleteBtn);
    $deleteBtn.click(() => that.deleteNode(node));
  }

  /**
   * Delegated method from Renderer
   * @param $node
   * @returns {*|jQuery|HTMLElement}
   */




  _nodeFromElement($node) {
    return this.renderer._nodeFromElement($node);
  }

  /**
   * Find node of ThreeJs Object
   * @param object (THREE.Object3D)
   * @returns Node from SugarMaple
   */
  getNodeFromObject(object) {
    let rootNode = this.tree.getRoot();
    let node     = undefined;

    if (object !== undefined) {
      this.tree.iterateOver(rootNode, iNode => {
        if (iNode.data.uuid === object.uuid)
          node = iNode;
      });
    }
    return node;
  }

  /**
   * Delete the given node
   * @param node
   */
  deleteNode(node) {
    this._trigger('deleteNode', [node]);
    this.tree.detach(node);
    this._elementFromNode(node).remove();
  }

}

export default Threejs;