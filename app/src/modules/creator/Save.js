import {saveAs} from "../../../../node_modules/filesaverjs/FileSaver";
import CreatorManagement from './CreatorManagement';
import Scene from './Scene';

class Save {

  constructor() {
  }

  loadCustomObjects() {

    //let stored = localStorage['save2'];
    Scene.removeObjects();
    Scene.render();
    Scene.initHelpers();

    let file   = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
      let loader = new THREE.ObjectLoader();
      //let loadedObjects = JSON.parse(stored);
      let loadedObjects = JSON.parse(e.target.result);

      loadedObjects.forEach((entry) => {
        let loadedMesh = loader.parse(entry);

        // TODO voir prq je peux pas renvoyer un bool d'une methode static
        let stop = false;
        Scene._objList.forEach((object) => {
          if (object.uuid === loadedMesh.uuid)
            stop = true;
        });
        //if (Save.isDuplicatedChildren(loadedMesh) === false) {
        if (stop === false) {

          CreatorManagement.addObject(loadedMesh);
          Save.loadChildren(loadedMesh);
        }
      });
      Scene.render();
    };

  }

  static isDuplicatedChildren(object) {
    Scene._objList.forEach((entry) => {
      if (entry.uuid === object.uuid)
        return true;
    });
    return false;
  }

  static loadChildren(object) {
    object.children.forEach((entry) => {
      Scene._objList.push(entry);
      Save.loadChildren(entry);
    });
  }

  saveCustomObjects(runner) {
    let object = [];
    Scene._objList.forEach(function (entry) {
      const e = entry.toJSON();

      e._physijs = entry._physijs;

      object.push(e);
    });

    let output;
    try {
      output = JSON.stringify(object, null, '\t');
      // transformation nécessaire pour l'uuid
      output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
    }
    catch (e) {
      // TODO catch exception
      output = JSON.stringify(output);
    }

    // Dernière Partie temporaire
    if (runner === true) {
      localStorage['saveRunner'] = output;
    } else {
      let blob = new Blob([JSON.stringify(object)], {type: "application/json;charset=utf-8"});
      saveAs(blob, "SaveSample.json");
    }
  }

}

export default new Save();