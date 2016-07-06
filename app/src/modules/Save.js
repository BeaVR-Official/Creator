/**
 * Created by giraud_d on 08/05/2016.
 */

import {saveAs} from "../../../node_modules/filesaverjs/FileSaver";
import CustomObject from "./CustomObject";
import Scene from './Scene';
import SceneUI from './Scene.ui';

class Save {
  constructor() {
  }

  loadCustomObjetcs() {
    let stored       = localStorage['save'];
    let savedObjects = JSON.parse(stored);

    Scene.render();
    Scene.removeObjects();
    SceneUI.init();
    
    savedObjects.forEach(entry => {
      // La deserialization SE passe dans la method fromJSON
      // en cas de modification des paramètres les changer uniquement dans la class CustomObj (objToJSON & fromJSON)
      Scene.addObj(CustomObject.fromJSON(entry));
    });
    Scene.render();
  }

  saveCustomObjects() {
    // Partie 2
    let object = [];
    Scene._objList.forEach(entry => {
      object.push(entry.objToJSON());
    });

    // Partie 3
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
    localStorage['save'] = output;

    //localStorage['scene'] = Scene._scene.toJSON();
  }

}

export default new Save();

/*
 let outputJSON = Scene.serializeObj();

 let zip = new JSZip();
 zip.file("customObjects.json", outputJSON);

 let assets = zip.folder("assets");
 assets.file("test.txt", "a folder with assets");

 zip.generateAsync({type:"blob"}).then(function(content) {
 // FileSaver.js
 saveAs(content, "saveSampleV2.zip");
 });

 //saveAs(Scene.serializeObj(), "saveTmp.json");
 */