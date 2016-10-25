import SceneDescriptor from "../descriptors/SceneDescriptor";
import ObjectDescriptor from "../descriptors/ObjectDescriptor";

class SceneManager {
  constructor() {
    this.sceneDescriptors = [];
  }

  setSceneDescriptors(sceneDescriptors) {
    this.sceneDescriptors = sceneDescriptors;
  }

  getSceneDescriptors() {
    return (this.sceneDescriptors);
  }

  getSceneDescriptorIndex(sceneUuid) {
    for (let index = 0; index < this.sceneDescriptors.length; index++) {
      if (this.sceneDescriptors[index].getUuid() === sceneUuid) {
        return (index);
      }
    }
    return (-1);
  }

  addScene(name) {
    let newSceneDescriptor = SceneDescriptor(name);
    this.sceneDescriptors.push(newSceneDescriptor);
    // TODO: May need to use events here
    return (newSceneDescriptor.getUuid());
  }

  removeScene(sceneUuid) {
    let sceneIndex = this.getSceneDescriptorIndex(sceneUuid);
    if (sceneIndex === -1) {
      return (false);
    }
    let objectDescriptors = this.sceneDescriptors[sceneIndex].getObjectDescriptors();
    for (let objectIndex = 0; i < objectDescriptors.length; objectIndex += 1) {
      //TODO: Ask ScriptManager to remove all references to objectUuid !!!
      // ScriptManager.removeObjectReferences(objectDescriptors[objectIndex].getUuid());
    }
    this.sceneDescriptors[sceneIndex].removeAllObjectDescriptors();
    this.scenesList.splice(index, 1);
    return (true);
  }

  addObject(sceneUuid, name, type) {
    let index = this.getSceneDescriptorIndex(sceneUuid);
    if (index === -1) {
      return (false);
    }
    return (this.sceneDescriptors[index].addObjectDescriptor(name, type));
  }

  removeObject(sceneUuid, objectUuid) {
    let index = this.findSceneIndex(sceneUuid);
    if (index === -1) {
      return (false);
    }
    this.sceneDescriptors[index].removeObjectDescriptor(objectUuid);
    //TODO: Ask ScriptManager to remove all references to objectUuid !!!
    // ScriptManager.removeObjectReferences(objectDescriptors[objectIndex].getUuid());
    return (true);
  }
}

export default new SceneManager();