/**
 * Created by giraud_d on 08/05/2016.
 */

import {saveAs} from "../../../node_modules/filesaverjs/FileSaver";
import Scene from './Scene';

class Save {
  constructor() {

  }

  saveScene() {

    let output = Scene._scene.toJSON();
    try {
      output = JSON.stringify( output, null, '\t' );
      // transformation nécessaire pour l'uuid
      output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
    } catch ( e ) {
      // TODO catch exception
      output = JSON.stringify( output );
    }

    let blob = new Blob([output], {type: "application/json"});
    // En attendant un appel API
    saveAs(blob, "saveSampleWebCreator.json");

    // Après il faudra créer le fichier & l'envoyer
    // le fichier sera surement un .zip de(s) scène(s)
    let file = new File([blob], "filename.zip");

  }

}

export default new Save();