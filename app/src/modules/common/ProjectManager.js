import SceneDescriptor from "./SceneDescriptor";
import ObjectDescriptor from "./ObjectDescriptor";
import EventDescriptor from "./EventManager";

class ProjectManager {
  constructor() {
    this.name              = "";
    this.sceneDescriptors  = [];
    this.startingSceneUuid = undefined;
  }

  toJSON() {
    return {
      name:              this.name,
      sceneDescriptors:  this.sceneDescriptors,
      startingSceneUuid: this.startingSceneUuid
    }
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return (this.name);
  }

  setStartingScene(sceneUuid) {
    if (this.getSceneDescriptorIndex(sceneUuid) === -1) {
      return (false);
    }
    this.startingSceneUuid = sceneUuid;
    return (true);
  }

  getStartingScene() {
    return (this.startingSceneUuid);
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
    return (index !== -1 ? this.sceneDescriptors[index] : undefined);
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
    let newSceneDescriptor = new SceneDescriptor(name);

    this.sceneDescriptors.push(newSceneDescriptor);
    // TODO: May need to use events here
    if (this.startingSceneUuid === undefined) {
      this.startingSceneUuid = newSceneDescriptor.getUuid();
    }
    return (this.startingSceneUuid);
  }

  removeScene(sceneUuid) {
    let sceneIndex = this.getSceneDescriptorIndex(sceneUuid);
    if (sceneIndex === -1) {
      return (false);
    }
    let objectDescriptors = this.sceneDescriptors[sceneIndex].getAllObjectDescriptors();
    for (let objectIndex = 0; i < objectDescriptors.length; objectIndex += 1) {
      // TODO: Ask ScriptManager to remove all references to objectUuid !!!
      // ScriptManager.removeObjectReferences(objectDescriptors[objectIndex].getUuid());
    }
    this.sceneDescriptors[sceneIndex].removeAllObjectDescriptors();
    this.scenesList.splice(index, 1);
    return (true);
  }

  addObject(sceneUuid, name, type) {
    // TODO: Define the structure of type: what if custom object ? Send array with geometry ? etc.
    let index = this.getSceneDescriptorIndex(sceneUuid);
    if (index === -1) {
      return (false);
    }

    let objectUuid = this.sceneDescriptors[index]
      .addObjectDescriptor(name, type);
    return (objectUuid);
  }

  removeObject(sceneUuid, objectUuid) {
    // TODO: may require debugging over for loop to verify that all children get removed
    let sceneDescriptor = this.getSceneDescriptor(sceneUuid);
    if (sceneDescriptor === undefined) {
      return (false);
    }
    // recursively remove all children objects
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    let childrenUuid     = objectDescriptor.getChildren();
    for (let index = 0; index < childrenUuid.length; index++) {
      this.removeObject(sceneUuid, childrenUuid[index]);
    }
    // if object has a parent, remove it from parent object's children list
    let parentUuid = objectDescriptor.getParent();
    if (parentUuid !== undefined) {
      this.removeObjectChild(sceneUuid, parentUuid, objectUuid);
    }
    sceneDescriptor.removeObjectDescriptor(objectUuid);
    // TODO: Ask ScriptManager to remove all references to objectUuid !!!
    // ScriptManager.removeObjectReferences(objectUuid);

    EventDescriptor.removeObject(sceneUuid, objectUid);
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

  //
  // Modification et consultation des propriétés des ObjectDescriptors
  //

  addObjectChild(sceneUuid, parentObjectUuid, childObjectUuid) {
    let parentOD = this.getObjectDescriptor(sceneUuid, parentObjectUuid);
    let childOD  = this.getObjectDescriptor(sceneUuid, childObjectUuid);
    if (parentOD === undefined || childOD === undefined) {
      return (false);
    }
    let previousParentUuid = childOD.getParent();
    // if child object already has a parent
    if (previousParentUuid !== undefined) {
      // then remove the child object from the parent's children list
      let previousParentOD = this.getObjectDescriptor(sceneUuid, previousParentUuid);
      previousParentOD.removeChild(childObjectUuid);
    }
    parentOD.addChild(childObjectUuid);
    childOD.setParent(parentObjectUuid);
    return (true);
  }

  removeObjectChild(sceneUuid, parentObjectUuid, childObjectUuid) {
    let parentOD = this.getObjectDescriptor(sceneUuid, parentObjectUuid);
    let childOD  = this.getObjectDescriptor(sceneUuid, childObjectUuid);
    if (parentOD === undefined || childOD === undefined) {
      return (false);
    }
    parentOD.removeChild(childObjectUuid);
    childOD.setParent(undefined);
    return (true);
  }

  removeObjectChildren(sceneUuid, parentObjectUuid) {
    let parentOD = this.getObjectDescriptor(sceneUuid, parentObjectUuid);
    if (parentOD === undefined) {
      return (false);
    }
    let childrenUuid = parentOD.getChildren();
    for (let index = 0; index < childrenUuid.length; index++) {
      this.removeObjectChild(sceneUuid, parentObjectUuid, childrenUuid[index]);
    }
    return (true);
  }

  getObjectChildren(sceneUuid, objectUuid) {
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    if (objectDescriptor === undefined) {
      return (undefined);
    }
    return (objectDescriptor.getChildren());
  }

  setObjectPosition(sceneUuid, objectUuid, position) {
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    if (objectDescriptor === undefined) {
      return (false);
    }
    objectDescriptor.setPosition(position);
    return (false);
  }

  getObjectPosition(sceneUuid, objectUuid) {
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    if (objectDescriptor === undefined) {
      return (undefined);
    }
    return (objectDescriptor.getPosition());
  }

  setObjectRotation(sceneUuid, objectUuid, rotation) {
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    if (objectDescriptor === undefined) {
      return (false);
    }
    objectDescriptor.setRotation(rotation);
    return (false);
  }

  getObjectRotation(sceneUuid, objectUuid) {
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    if (objectDescriptor === undefined) {
      return (undefined);
    }
    return (objectDescriptor.getRotation());
  }

  setObjectScale(sceneUuid, objectUuid, scale) {
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    if (objectDescriptor === undefined) {
      return (false);
    }
    objectDescriptor.setScale(scale);
    return (false);
  }

  getObjectScale(sceneUuid, objectUuid) {
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    if (objectDescriptor === undefined) {
      return (undefined);
    }
    return (objectDescriptor.getScale());
  }

  setObjectSolidStatus(sceneUuid, objectUuid, isSolid) {
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    if (objectDescriptor === undefined) {
      return (false);
    }
    objectDescriptor.setSolidStatus(isSolid);
    return (false);
  }

  getObjectSolidStatus(sceneUuid, objectUuid) {
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    if (objectDescriptor === undefined) {
      return (undefined);
    }
    return (objectDescriptor.getSolidStatus());
  }

  setObjectGravityStatus(sceneUuid, objectUuid, isGravityEffected) {
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    if (objectDescriptor === undefined) {
      return (false);
    }
    objectDescriptor.setGravityStatus(isGravityEffected);
    return (false);
  }

  getObjectGravityStatus(sceneUuid, objectUuid) {
    let objectDescriptor = this.getObjectDescriptor(sceneUuid, objectUuid);
    if (objectDescriptor === undefined) {
      return (undefined);
    }
    return (objectDescriptor.getGravityStatus());
  }
}

export default new ProjectManager();