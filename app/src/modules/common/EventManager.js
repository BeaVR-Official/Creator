import GraphicalManager from "./GraphicalManager";
import ProjectManager from "./ProjectManager";
import eventToPromise from 'event-to-promise';

class EventManager extends EventEmitter {
  constructor() {
    super();
    this.eventsListener();
  }

  emitEvent(eventName, data) {
    this.emit(eventName, data);
    return eventToPromise(this, eventName).then(function () {
      return data;
    });
  }

  // TODO clear events ?
  eventsListener() {

    // ////////////////////////
    // Creator Commands event
    // ////////////////////////
    this.on('addScene', (sceneName) => {
      let sceneUuid = ProjectManager.addScene(sceneName);

      GraphicalManager.setCurrentSceneUuid(sceneUuid);
    });

    this.on('removeScene', (sceneUuid) => {
      ProjectManager.removeScene(sceneUuid);
    });

    /**
     * data params: sceneUuid, objectName, objectType
     */
    this.on('addObject', function (data) {
      let objectUuid = ProjectManager.addObject(
        data.sceneUuid,
        data.objectName,
        data.objectType);

      GraphicalManager.addObject(objectUuid);
    });

    /**
     * data params: sceneUuid, objectUuid
     */
    this.on('removeObject', function (data) {
      let sceneDescriptor  = ProjectManager.getSceneDescriptor(data.sceneUuid);
      let objectDescriptor = ProjectManager.getObjectDescriptor(data.objectUuid);

      GraphicalManager.removeObject(sceneDescriptor, objectDescriptor);
      let state = ProjectManager.removeObject(data.sceneUuid, data.objectUuid);
    });

    // ////////////////////////
    // Creator specific events
    // ////////////////////////
    this.on('adaptGraphManToWindow', function (data) {

    });
  }

}

export default new EventManager();