/**
 * Created by giraud_d on 04/05/2016.
 */

import Creator from "./Creator";
import {saveAs} from "../../../node_modules/filesaverjs/FileSaver";

class Save {
  constructor() {

  }

  saveScene() {

    let output = Creator._scene.toJSON();
    try {
      output = JSON.stringify( output, null, '\t' );
      // transformation nécessaire pour l'uuid
      output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
    } catch ( e ) {
      // TODO catch exception
      output = JSON.stringify( output );
    }

    let blob = new Blob([output], {type: "application/json"});
    saveAs(blob, "saveSampleWebCreator.json");

  }

}

export default new Save();