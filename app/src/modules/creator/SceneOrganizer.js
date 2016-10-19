class SceneOrganizer {

  constructor() {
    this.scenesList = [];
  }

  findSceneIndex(sceneUuid) {
    for (let index = 0; index < this.scenesList.length; index++) {
      if (this.scenesList[index].uuid === sceneUuid) {
        return (index);
      }
    }
    return (-1);
  }

  findObjectIndex(sceneUuid, objectUuid) {
    let sceneIndex = this.findSceneIndex(sceneUuid);
    if (sceneIndex === -1) {
      return -1;
    }
    for (let index = 0; index < this.scenesList[sceneIndex].length; index++) {
      if (this.scenesList[sceneIndex].objectsList[index].uuid === objectUuid) {
        return (index);
      }
    }
    return (-1);
  }

  //
  // Scene methods
  //

  addScene(nameString) {
    let newScene = {
      "name":        nameString,
      "uuid":        generateUUID(),
      "objectsList": []
    };
    this.scenesList.push(newScene);
    return (newScene.uuid);
  }

  removeScene(sceneUuid) {
    let index = this.findSceneIndex(sceneUuid);
    if (index === -1) {
      return (false);
    }
    for (let i = 0; i < this.scenesList[index].length; i += 1) {
      this.removeObject(sceneUuid, this.scenesList[index].objectsList[i].uuid);
    }
    this.scenesList.splice(index, 1);
    return (true);
  }

  setSceneName(sceneUuid, nameString) {
    let index = this.findSceneIndex(sceneUuid);
    if (index === -1) {
      return (false);
    }
    this.scenesList[index].name = nameString;
    return (true);
  }

  getSceneName(sceneUuid) {
    let index = this.findSceneIndex(sceneUuid);
    if (index === -1) {
      return (undefined);
    }
    return (this.scenesList[index].name);
  }

  //
  // Object management methods
  //

  addObject(sceneUuid, nameString, typeString) {
    let sceneIndex = this.findSceneIndex(sceneUuid);
    if (sceneIndex === -1) {
      return (undefined);
    }
    let newObject = {
      "uuid":     generateUUID(),
      "name":     nameString,
      "type":     typeString,
      "position": [0.0, 0.0, 0.0],
      "rotation": [0.0, 0.0, 0.0],
      "scale":    [0.0, 0.0, 0.0],
      "color":    "0x000000",
      "mesh":     undefined // TODO: Create temporary Physijs mesh
    };
    this.scenesList[sceneIndex].objectsList.push(newObject);
    return (newObject.uuid);
  }

  removeObject(sceneUuid, objectUuid) {
    let sceneIndex = this.findSceneIndex(sceneUuid);
    if (sceneIndex === -1) {
      return (false);
    }
    let objectIndex = this.findObjectIndex(sceneUuid, objectUuid);
    if (objectIndex === -1) {
      return (false);
    }
    // TODO: Remove temporary Physijs object
    this.scenesList[sceneIndex].objectsList.splice(objectIndex, 1);
    return (true);
  }
}

export default new ScriptOrganizer();

function generateUUID() {
  let d    = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d     = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}