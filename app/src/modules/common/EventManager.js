import GraphicalManager from "./GraphicalManager";
import ProjectManager from "./ProjectManager";

class EventManager extends EventEmitter {
  constructor() {
    super();
    this.eventsListener();
  }

  addScene(sceneName) {
    this.emit('addScene', sceneName);
  }

  removeScene(sceneUuid) {
    this.emit('removeScene', sceneUuid);
  }

  addObject(sceneUuid, name, type) {
    let data = {
      sceneUuid:  sceneUuid,
      objectName: name,
      objectType: type
    };

    this.emit('addObject', data);
  }

  removeObject(sceneUuid, objectUuid) {
    let data = {
      sceneUuid:  sceneUuid,
      objectUuid: objectUuid
    };

    this.emit('removeObject', data);
  }

  // TODO clear events ?
  eventsListener() {
    this.on('addScene', function (sceneName) {
      let sceneUuid = ProjectManager.addScene(sceneName);

      GraphicalManager.addScene(sceneUuid);
    });

    this.on('removeScene', function (sceneUuid) {
      ProjectManager.removeScene(sceneUuid);
    });

    this.on('addObject', function (data) {
      let objectUuid = ProjectManager.addObject(
        data.sceneUuid,
        data.objectName,
        data.objectType);

      GraphicalManager.addObject(data.sceneUuid, objectUuid);
    });

    this.on('removeObject', function (data) {
      let sceneDescriptor  = ProjectManager.getSceneDescriptor(data.sceneUuid);
      let objectDescriptor = ProjectManager.getObjectDescriptor(data.objectUuid);

      GraphicalManager.removeObject(sceneDescriptor, objectDescriptor);
      let state = ProjectManager.removeObject(data.sceneUuid, data.objectUuid);
    });
  }

}

export default new EventManager();