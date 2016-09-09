import PropPanelUI from './PropPanel.ui.js';
import Scene from './Scene';
import ScenesPanel from './ScenesPanel';

class CreatorManagement extends EventEmitter {
  constructor() {
    super();
    this.selectedObject = undefined;
  }

  setSelectedObject(object) {
    this.selectedObject = object;
  }

  getSelectedObject() {
    return this.selectedObject;
  }

  objectSelection(object) {
    if (object !== undefined) {
      this.setSelectedObject(object);
      Scene.attachToTransform(this.selectedObject);
      Scene.render();
      this.emit('selectedObject', this.selectedObject);
    }
  }

  deselectObject() {
    this.selectedObject = undefined;
    Scene.detachTransform();
    Scene.render();
    this.emit('deselectedObject', this.selectedObject);
  }

  addObject(object) {
    ScenesPanel.addObjectNode(object);
    Scene._scene.add(object);
    Scene._objList.push(object);
  }

  //TODO suppression recursive des enfants
  removeSelectedObject() {
    Scene.removeObject(this.selectedObject);
    this.deselectObject();
  }
}

export default new CreatorManagement();