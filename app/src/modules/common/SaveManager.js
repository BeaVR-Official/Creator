import ProjectManager from "./ProjectManager";
import SceneDescriptor from "./SceneDescriptor";
import ObjectDescriptor from "./ObjectDescriptor";

class SaveManager {

  constructor() {
  }

  sampleJSONProject () {
    return JSON.stringify({
      "name": "",
      "sceneDescriptors": [
        {
          "uuid": "37bd0177-90a1-458a-8108-3f4624e3734c",
          "name": "Default",
          "objectDescriptors": [
            {
              "uuid": "19e4097e-a9e1-454d-93ac-eb7d9a717ffc",
              "name": "Box_01",
              "type": "box",
              "children": [],
              "position": [
                0,
                0,
                0
              ],
              "rotation": [
                0,
                0,
                0
              ],
              "scale": [
                0,
                0,
                0
              ],
              "isSolid": false,
              "isGravityEffected": false
            }
          ]
        }
      ],
      "startingSceneUuid": "37bd0177-90a1-458a-8108-3f4624e3734c"
    });
  }
  // IMPORT

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

    // upload to API
    console.log(JSONProject);
  }

}

export default new SaveManager();