import PropPanelUI from './PropPanel.ui.js';
import Scene from './Scene';
import ScenesPanel from './ScenesPanel';

class CreatorManagement {
  constructor() {
    this.selectedObject = undefined;
  }

  getScene() {
    return Scene._scene;
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
      PropPanelUI.loadObjectInfo(this.selectedObject);
      Scene.attachToTransform(this.selectedObject);
      Scene.render();
    }
  }

  deselectObject() {
    this.selectedObject = undefined;
    PropPanelUI.unselectObject();
    PropPanelUI.cleanPanel();
    Scene.detachTransform();
    Scene.render();
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