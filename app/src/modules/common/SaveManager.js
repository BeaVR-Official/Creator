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

  importProject() {

    // download from API
    let JSONProject = JSON.parse(this.sampleJSONProject());

    // getting ProjectName;
    ProjectManager.setName(JSONProject.name);
    ProjectManager.setAllSceneDescriptors(this.importSceneDescriptors(JSONProject.sceneDescriptors));
    ProjectManager.setStartingScene(JSONProject.startingSceneUuid)

    console.log(ProjectManager.toJSON());
  }


  // EXPORT

  exportProject() {

    let JSONProject = ProjectManager.toJSON();

    $.ajax({
      url : "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects/" + ProjectManager.getName() + "/save",
      type: "post",
      data: {save: JSONProject},
      headers: {Authorization: "Bearer " + Cookie.getCookieValue("token")},
      dataType: 'json',
      statusCode : {
        404 : function (data) {
          console.log(data);
        },
        200 : function (data) {
          console.log(data);
        }
      }
    });
  }

}

export default new SaveManager();