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
      this.deselectObject();
      this.setSelectedObject(object);
      Scene.attachToTransform(this.selectedObject);
      //Scene.render();
      this.emit('selectedObject', this.selectedObject);
    }
  }

  deselectObject() {
    this.emit('deselectedObject', this.selectedObject);
    this.selectedObject = undefined;
    Scene.detachTransform();
    //Scene.render();
  }

  addObject(object) {
    this.deselectObject();
    ScenesPanel.addObjectNode(object);
    Scene._scene.add(object);
    Scene._objList.push(object);
    this.objectSelection(object);
  }

  removeSelectedObject() {
    this.emit('removedObject', this.selectedObject);
    Scene.removeObject(this.selectedObject);
    this.deselectObject();
  }

  removeObject(object) {
    if (object !== undefined) {
      this.emit('removedObject', object);
      Scene.removeObject(object);
      Scene.detachTransform();
      //Scene.render();
    }
  }
}

export default new CreatorManagement();