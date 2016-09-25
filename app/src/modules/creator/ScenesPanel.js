import * as CreatorManagement from './CreatorManagement';
import Scene from './Scene';

class ScenesPanel {
  constructor() {
  }

  initTree(sugarMaple) {
    this.smTree   = sugarMaple;
    this.rootNode = this.smTree.sugarmaple('manage.create', 'Scene 1', Scene._scene);
    this.smTree.sugarmaple('manage.setRoot', this.rootNode);
  }

  onChecked(node) {
    let objectNode = undefined;
    if (node.data.parent.userData.objType === 'picker')
      objectNode = node.data.parent;
    else
      objectNode = node.data;
    CreatorManagement.default.objectSelection(objectNode);
  }

  onUnchecked() {
    CreatorManagement.default.deselectObject();
  }

  onDragged(node) {
    let object = Scene.findObject(node.data);
    Scene.detachParent(object);
  }

  onDropped(newParent, node) {
    let parent;
    if (newParent.data instanceof THREE.Scene) {
      parent = Scene._scene;
    } else
      parent = Scene.findObject(newParent.data);
    let object = Scene.findObject(node.data);
    Scene.attachNewParent(object, parent);
  }

  addObjectNode(object) {
    // TODO check également les chldren (en récursive) et les ajouter si il y en a @Vincent
    let nodeName = object.name;
    if (object.userData.objType === 'picker')
      nodeName = object.children[0].name;
    let node = this.smTree.sugarmaple('manage.create', nodeName, object);
    this.smTree.sugarmaple('manage.attach', this.rootNode, node);
  }

}

export default new ScenesPanel();