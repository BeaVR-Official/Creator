import LeftBarSugarMaple from '../../front/views/LeftBarSugarMaple';
import GraphicalManager from "./GraphicalManager";
import ProjectManager from "./ProjectManager";
import eventToPromise from 'event-to-promise';
import SaveManager from './SaveManager';

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
    this.on('addScene', (data) => {
      let sceneUuid = ProjectManager.addScene(data.sceneName);
      data.scene = ProjectManager.getSceneDescriptor(sceneUuid);

      GraphicalManager.setCurrentSceneUuid(sceneUuid);
      LeftBarSugarMaple.initializeSugar();
    });

    this.on('selectScene', (sceneUuid) => {
      GraphicalManager.setCurrentSceneUuid(sceneUuid);
    });

    this.on('removeScene', (sceneUuid) => {
      ProjectManager.removeScene(sceneUuid);

      // TODO add method GM
      // GraphicalManager unloadMethod
    });

    this.on('switchScene', function (sceneUuid) {

    });

    this.on('editProjectName', function (projectName) {
      ProjectManager.setName(projectName);
      // TODO refresh Project Name if display on crzator
    });

    this.on('editSceneName', function (data) {
      ProjectManager.getSceneDescriptor(data.sceneUuid).setName(data.sceneName);
      // TODO refresh Scene(s) Name(s) if display on creator (eg: TreeView)
    });

    // ////////////////////////
    // Creator specific events
    // ////////////////////////
    this.on('adaptGraphManToWindow', function (data) {

    });

    /*
     data: objectDescriptorUuid
     */
    this.on('objectSelected', (data) => {
      data.objectDesc = ProjectManager.getObjectDescriptor(ProjectManager.getStartingScene(), data.objectUuid);
      GraphicalManager.attachToTransform(data.objectDesc.attributes.uuid);
      this.emitEvent('getObjectSelected', data.objectDesc);
    });

    this.on('objectDeselected', (data) => {
      if (data.objectUuid) {
        data.objectDesc = ProjectManager.getObjectDescriptor(ProjectManager.getStartingScene(), data.objectUuid);
        // GraphicalManager.deselectObject();
      }
    });

    // ////////////////////////
    // TransformControls modes
    // ////////////////////////
    this.on('changeTransformControlMode', function (data) {
      GraphicalManager.setTransformControlMode(data);
    });

    // ////////////////////////
    // TreeView events
    // ////////////////////////

    this.on('removeObject', function (data) {
      let sceneDescriptor  = ProjectManager.getStartingScene();
      let objectDescriptor = ProjectManager.getObjectDescriptor(data.objectUuid);

      GraphicalManager.removeObject(objectDescriptor);
      let state = ProjectManager.removeObject(sceneDescriptor, data.objectUuid);
    });

    this.on('attachChildObject', function (data) {
      /*
       Note : addObjectChild s'occupe de la suppression de l'ancien parent
       */
      ProjectManager.addObjectChild(
        data.sceneUuid,
        data.parentObject,
        data.childObjectUuid
      )

      // TODO add GM for parent & child
    });

    /*
     /!\ A utiliser uniquement si l'enfant est retourné à la racine
     et NON si il est attché à un autre parent
     cf : event 'removeObject' a utilisé alors
     PS : Pas besoin d'envoyer l'uuid de l'ancien parent, on s'en occupe
     */
    this.on('removeChildObject', function (data) {
      ProjectManager.removeObjectChild(
        data.sceneUuid,
        ProjectManager.getObjectDescriptor(data.sceneUuid, data.childObject.getParent()),
        data.childObject
      )

      // TODO add GM for parent & child
    });

    // ////////////////////////
    // Add Things events
    // ////////////////////////

    this.on('addObject', function (data) {
      let objectUuid = ProjectManager.addObject(
        data.objectName,
        data.objectType
      );
      data.uuid = GraphicalManager.addObject(objectUuid);
      LeftBarSugarMaple.addObject(data.uuid);
    });

    this.on('addLight', function (data) {
      // TODO
    });

    this.on('addExternal', function (data) {
      let objectUuid = ProjectManager.addObject(
        data.objectName,
        data.objectType
      );
      data.uuid = GraphicalManager.addExternalObject(objectUuid, data.path);
    });

    this.on('addSky', function (data) {
      // TODO
      GraphicalManager.addSky();
    });

    this.on('addGround', function (data) {
      // TODO
      GraphicalManager.addGround();
    });

    // ////////////////////////
    // Object Property events
    // ////////////////////////
    // this.on('adaptGraphManToWindow', function (data) {
    //   });

    this.on('updateObjectPosition', function (data) {
      ProjectManager.setObjectPosition(
        ProjectManager.getSceneDescriptor(ProjectManager.getStartingScene()),
        data.objectUuid,
        data.position
      );
      GraphicalManager.updateObjectPosition(data.objectUuid, data.position);
    });

    this.on('updateObjectRotation', function (data) {
      ProjectManager.setObjectRotation(
        ProjectManager.getSceneDescriptor(ProjectManager.getStartingScene()),
        data.objectUuid,
        data.rotation
      );
      GraphicalManager.updateObjectRotation(data.objectUuid, data.rotation);
    });

    this.on('updateObjectScale', function (data) {
      ProjectManager.setObjectScale(
        ProjectManager.getSceneDescriptor(ProjectManager.getStartingScene()),
        data.objectUuid,
        data.scale
      );
      GraphicalManager.updateObjectScale(data.objectUuid, data.scale);
    });

    this.on('updateObjectName', function (data) {
      ProjectManager.setObjectName(
        ProjectManager.getSceneDescriptor(ProjectManager.getStartingScene()),
        data.objectUuid,
        data.name
      );
      // TODO update TreeView
    });

    this.on('updateObjectColor', function (data) {
      ProjectManager.setObjectColor(
        ProjectManager.getSceneDescriptor(ProjectManager.getStartingScene()),
        data.objectUuid,
        data.color
      );
      GraphicalManager.updateObjectColor(data.objectUuid, data.color);
    });

    this.on('updateObjectVisibility', function (data) {
      ProjectManager.setObjectVisibilityStatus(
        ProjectManager.getSceneDescriptor(ProjectManager.getStartingScene()),
        data.objectUuid,
        data.isVisibility
      );
      GraphicalManager.updateObjectVisibility(data.objectUuid, data.isVisibility);
    });

    this.on('updateObjectMaterial', function (data) {
      // TODO
      GraphicalManager.updateObjectMaterial();
    });

    this.on('updateObjectGeometry', function (data) {
      // TODO
      GraphicalManager.updateObjectGeometry();
    });

    // Save & Load
    this.on('createNewProject', function (data) {
      ProjectManager.createNewProject(data.name, data.description, data.id);
    })

    this.on('saveProject', function () {
      SaveManager.exportProject();
    })

  }

}

export default new EventManager();