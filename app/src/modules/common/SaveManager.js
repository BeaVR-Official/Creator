import ProjectManager from "./ProjectManager";
import SceneDescriptor from "./SceneDescriptor";
import ObjectDescriptor from "./ObjectDescriptor";

class SaveManager {
  constructor() {
  }

  importProject() {

  }

  exportProject() {
    //TODO: example code here

    // getting the project name
    console.log(ProjectManager.getName());

    // getting the scene descriptors array from the project
    let sceneDescriptors = ProjectManager.getAllSceneDescriptors();

    for (let index = 0; index < sceneDescriptors.length; index++) {
      // iterating over the scene descriptors contained in the project

      // getting the object descriptors array from the scene
      let objectDescriptors = sceneDescriptors[index].getAllObjectDescriptors();

      for (let objectIndex = 0; index < objectDescriptors.length; objectIndex++) {
        // iterating over the object descriptors contained in the scene
        console.log(objectDescriptors[objectIndex]);
      }
    }

    //TODO: export ScriptManager content (not available yet)
  }
}

export default new SaveManager();