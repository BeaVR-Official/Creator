import {saveAs} from "../../../../node_modules/filesaverjs/FileSaver";
import Scene from './Scene';
import SceneUI from './Scene.ui';

class Save {
  constructor() {
  }

  loadCustomObjects() {
    //let stored = localStorage['save2'];
    Scene.removeObjects();
    Scene.render();
    SceneUI.init();

    let file   = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
      let loader        = new THREE.ObjectLoader();
      //let loadedObjects = JSON.parse(stored);
      let loadedObjects = JSON.parse(e.target.result);

      loadedObjects.forEach((entry) => {
        let loadedMesh = loader.parse(entry);

        // TODO voir prq je peux pas renvoyer un bool d'une methode static
        let stop = false;
        Scene._objList.forEach((entry) => {
          if (entry.uuid === loadedMesh.uuid)
            stop = true;
        });
        //if (Save.isDuplicatedChildren(loadedMesh) === false) {
        if (stop === false) {

          Scene.addObj(loadedMesh);
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
      object.push(entry.toJSON());
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