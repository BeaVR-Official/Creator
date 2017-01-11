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
    _objectDescriptor.setPosition(objectDescriptor.transformations.translation);
    _objectDescriptor.setRotation(objectDescriptor.transformations.rotation);
    _objectDescriptor.setScale(objectDescriptor.transformations.scale);
    _objectDescriptor.setSolidStatus(objectDescriptor.isSolid);
    _objectDescriptor.setGravityStatus(objectDescriptor.isGravityEffected);
    _objectDescriptor.setVisibilityStatus(objectDescriptor.isVisibility);
    _objectDescriptor.setGeometryDescriptor(objectDescriptor.geometryDescriptor);
    _objectDescriptor.setMaterialDescriptor(objectDescriptor.materialDescriptor);
    return _objectDescriptor;
  }

  importSceneDescriptor(sceneDescriptor) {

    let _sceneDescriptor = new SceneDescriptor(sceneDescriptor.name);
    _sceneDescriptor.attributes.uuid = sceneDescriptor.uuid;

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

  importProject(projectId) {

    // First step : import project
    let req1 = $.ajax({
      url:      "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects/" + projectId,
      type:     "get",
      headers:  {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
      dataType: 'json'
    });
    req1.done( (data) => {

      // Second step : import project (last) save container
      let projectData = data.data.project;
      ProjectManager.setId(projectData._id);
      ProjectManager.setName(projectData.name);
      ProjectManager.setDescription(projectData.description);
      // en dur
      let lastSaveId = projectData.saves[projectData.saves.length - 1];
      let req2 = $.ajax({
        url:      "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects/" + projectId + "/save/" + lastSaveId,
        type:     "get",
        headers:  {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
        dataType: 'json'
      });
      req2.done( (data2) => {
        let saveProject = data2.data.save;
        // Caca
        ProjectManager.setAllSceneDescriptors(saveProject.sceneDescriptors);
        ProjectManager.setStartingScene(saveProject.startingSceneUuid, true);
        // par default le premier file est celui des SC & OD
        let fileId = saveProject.files[0];

        // Third step : get url link to import JSON file with all SD & OD
        let req3 = $.ajax({
          url:      "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects/" + projectId + "/save/" + lastSaveId + "/files/" + fileId,
          type:     "get",
          headers:  {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
          dataType: 'json'
        });
        req3.done((data3) => {

          // Fourth and last (for this method) step
          let req4 = $.ajax({
            url:  data3.data.file.relativePath,
            type: "get"
          });
          req4.done((data4) => {
            ProjectManager.setAllSceneDescriptors(
              this.importSceneDescriptors(JSON.parse(data4).sceneDescriptors)
            );
            ProjectManager.reloadScene();
          });
          req4.fail((err) => {
            console.log(err);
            alert("Lors du l'import du file SD OD : " + err.responseText);
          });
        });

        req3.fail((err) => {
          console.log(err);
          alert("Lors du l'import du lien du file SD OD : " + err.responseText);
        });

      });
      req2.fail( function (err) {
        alert("Lors de l'import de la save du projet : " + err.responseText);
      });

    });
    req1.fail( (err) => {
      alert("Lors de l'import du projet : " + err.responseText);
    });

  }

  // EXPORT
  exportProject() {

    //TODO @damien save externalObj File

    // First step : Create a save container
    let JSONSave = {
      sceneDescriptors:  ProjectManager.getAllSceneDescriptorsUuid(),
      startingSceneUuid: ProjectManager.getStartingScene()
    };
    let req1     = $.ajax({
      url:      "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects/" + ProjectManager.getId() + "/save",
      type:     "post",
      data:     JSONSave,
      headers:  {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
      dataType: 'json'
    });
    req1.done((res) => {

      // Second step : create a json file with all SD & OD
      let saveId = res.data.save._id;
      let fileJSONProject = new File(
        [JSON.stringify(ProjectManager.toJSON())],
        ProjectManager.getId(),
        {type: "application/json"}
      );
      let fileData = new FormData();
      fileData.append("file", fileJSONProject, ProjectManager.getId());
      let req2     = $.ajax({
        url:      "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects/" + ProjectManager.getId() + "/save/" + saveId + "/files",
        type:     "post",
        data:     fileData,
        headers:  {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
        contentType: false,
        processData: false
      });
      req2.fail(function (err) {
        console.log(err);
        alert("Lors de la save du projet (file) : " + err.responseText);
      });

    });
    req1.fail(function (err) {
      console.log(err);
      alert("Lors de la save du projet : " + err.responseText);
    });

  }

}

export default new SaveManager();