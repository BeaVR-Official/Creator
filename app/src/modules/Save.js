/**
 * Created by giraud_d on 08/05/2016.
 */

import {saveAs} from "../../../node_modules/filesaverjs/FileSaver";
import CustomObject from "./CustomObject";
import Scene from './Scene';

class Save {
  constructor() {
  }


  loadCustomObjetcs() {
    let stored = localStorage['save2'];


    //let savedObjects  = JSON.parse(stored);

    Scene.render();
    Scene.removeObjects();


    let loader = new THREE.ObjectLoader();
    let loadedGeometry = JSON.parse(stored);

    loadedGeometry.forEach((entry) => {
      let loadedMesh = loader.parse(loadedGeometry[0]);
      let customObject = new CustomObject(loadedMesh, 'box');
      Scene.addObj(loadedMesh);
      Scene.render();
    });


/*    savedObjects.forEach((entry) => {


      let vari = loader.parse(entry);
      console.info(vari);


      // La deserialization ce passe dans la method fromJSON
      // en cas de modification des paramètres les changer uniquement dans la class CustomObj (objToJSON & fromJSON)
      //Scene.addObj();
    });*/


  }


  saveCustomObjects() {

    // Partie 2
    let object = [];
    Scene._objList.forEach(function (entry) {
      object.push(entry.obj.toJSON()); //method toJSON de THREE.MEsh
    });

    // Partie 3
    let output;
    try {
      output = JSON.stringify( object, null, '\t' );
      // transformation nécessaire pour l'uuid
      output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
    } catch ( e ) {
      // TODO catch exception
      output = JSON.stringify( output );
    }

    // Dernière Partie temporaire
    localStorage['save2'] = output;


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