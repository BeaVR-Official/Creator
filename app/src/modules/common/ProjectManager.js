import SceneDescriptor from "SceneDescriptor";
import ObjectDescriptor from "ObjectDescriptor";

class ProjectManager {
  constructor() {
    this.name             = "";
    this.sceneDescriptors = [];
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return (this.name);
  }

  getSceneDescriptorIndex(sceneUuid) {
    for (let index = 0; index < this.sceneDescriptors.length; index++) {
      if (this.sceneDescriptors[index].getUuid() === sceneUuid) {
        return (index);
      }
    }
    return (-1);
  }

  setAllSceneDescriptors(sceneDescriptors) {
    this.sceneDescriptors = sceneDescriptors;
  }

  getAllSceneDescriptors() {
    return (this.sceneDescriptors);
  }

  getSceneDescriptor(sceneUuid) {
    let index = this.getSceneDescriptorIndex(sceneUuid);
    if (index !== -1) {
      return (undefined);
    }
    return (this.sceneDescriptors[index]);
  }

  getObjectDescriptor(sceneUuid, objectUuid) {
    let index = this.getSceneDescriptorIndex(sceneUuid);
    if (index !== -1) {
      return (undefined);
    }
    return (this.sceneDescriptors[index].getObjectDescriptor(objectUuid));
  }

  //
  // Ajouts et suppression des Scenes et des Objects
  //

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
    let objectDescriptors = this.sceneDescriptors[sceneIndex].getAllObjectDescriptors();
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
    // ScriptManager.removeObjectReferences(objectUuid);
    return (true);
  }

  //
  // Modification et consultation des propriétés des SceneDescriptors
  //

  setSceneName(sceneUuid, name) {
    let sceneDescriptor = this.getSceneDescriptor(sceneUuid);
    if (sceneDescriptor === undefined) {
      return (false);
    }
    sceneDescriptor.setName(name);
    return (true);
  }

  getSceneName(sceneUuid) {
    let sceneDescriptor = this.getSceneDescriptor(sceneUuid);
    if (sceneDescriptor === undefined) {
      return (undefined);
    }
    return (sceneDescriptor.getName());
  }
}

export default new ProjectManager();