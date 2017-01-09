import ProjectManager from "./ProjectManager";
import SceneDescriptor from "./SceneDescriptor";
import ObjectDescriptor from "./ObjectDescriptor";

import Cookie from '../../front/cookie';

class SaveManager {

  constructor() {
  }

  importObjectDescriptor(objectDescriptor) {
    let _objectDescriptor = new ObjectDescriptor(objectDescriptor.name, objectDescriptor.type);
    _objectDescriptor.setUuid(objectDescriptor.uuid);
    _objectDescriptor.setParent(objectDescriptor.parent);
    _objectDescriptor.setChildren(objectDescriptor.children);
    _objectDescriptor.setPosition(objectDescriptor.position);
    _objectDescriptor.setRotation(objectDescriptor.rotation);
    _objectDescriptor.setScale(objectDescriptor.scale);
    _objectDescriptor.setSolidStatus(objectDescriptor.isSolid);
    _objectDescriptor.setGravityStatus(objectDescriptor.isGravityEffected);
    _objectDescriptor.setVisibility(objectDescriptor.isVisibility);
    return _objectDescriptor;
  }

  importSceneDescriptor(sceneDescriptor) {

    let _sceneDescriptor = new SceneDescriptor(sceneDescriptor.name);
    _sceneDescriptor.uuid = sceneDescriptor.uuid;

    let _objectDescriptors = [];
    let objectDescriptors = sceneDescriptor.objectDescriptors
    for (let index = 0; index < objectDescriptors.length; index++) {
      // iterating over the object descriptors contained in the scene
      _objectDescriptors.push(this.importObjectDescriptor(objectDescriptors[index]));
    }
    _sceneDescriptor.setAllObjectDescriptors(_objectDescriptors);

    return _sceneDescriptor;
  }

  importSceneDescriptors(sceneDescriptors) {

    let _sceneDescriptors = [];
    for (let index = 0; index < sceneDescriptors.length; index++) {
      // iterating over the scene descriptors contained in the project
      _sceneDescriptors.push(this.importSceneDescriptor(sceneDescriptors[index]));
    }

    return _sceneDescriptors;
  }

  importProject(projectUuid) {
    let req = $.ajax({
      url:      "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects/" + projectUuid + "/save",
      type:     "get",
      headers:  {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
      dataType: 'json'
    });
    req.done( (JSONProject) => {
      ProjectManager.setUuid(JSONProject.uuid);
      ProjectManager.setName(JSONProject.name);
      ProjectManager.setDescription(JSONProject.description);
      ProjectManager.setAllSceneDescriptors(this.importSceneDescriptors(JSONProject.sceneDescriptors.attributes));
      ProjectManager.setStartingScene(JSONProject.startingSceneUuid)
    });
    req.fail( function (err) {
      alert("Lors de l'upload du projet : " + err.responseText);
    });
  }

  // EXPORT
  exportProject() {

    let JSONSave = {
      sceneDescriptors:  ProjectManager.getAllSceneDescriptorsUuid(),
      startingSceneUuid: ProjectManager.getStartingScene()
    };
    let saveId;
    let req1     = $.ajax({
      url:      "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects/" + ProjectManager.getId() + "/save",
      type:     "post",
      data:     JSONSave,
      headers:  {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
      dataType: 'json'
    });
    req1.done((res) => {
      saveId = res.data.save._id;
      alert("Project Saved (project)");
    });
    req1.fail(function (err) {
      console.log(err);
      alert("Lors de la save du projet : " + err.responseText);
    });

/*    let blobJSONProject = new Blob(
      [ProjectManager.toJSON()],
      {type: "application/json"}
    );*/
    let fileJSONProject = new File(
      [JSON.stringify(ProjectManager.toJSON())],
      ProjectManager.getId(),
      {type: "application/json"}
    );

    let req2     = $.ajax({
      url:      "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects/" + ProjectManager.getId() + "/save/" + saveId + "/files",
      type:     "post",
      data:     fileJSONProject,
      headers:  {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
      dataType: 'json'
    });
    req2.done(() => {
      alert("Project Saved (file)");
    });
    req2.fail(function (err) {
      console.log(err);
      alert("Lors de la save du projet (file) : " + err.responseText);
    });

  }

}

export default new SaveManager();