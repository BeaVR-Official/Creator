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
    //TODO: Appeler removeObject pour tous les objets de cette Scene
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