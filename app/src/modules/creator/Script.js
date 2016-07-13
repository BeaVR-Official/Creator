/**
 * Created by urvoy_p on 11/07/16.
 */

import ScriptOrganizer from './script/ScriptOrganizer';
import CreatorManager from'./CreatorManagement';
import ScriptUI from './Script.ui';

class Script {

  constructor() {
    this.selectedObject = null;
  };

  createScript() {
    let scriptName  = document.getElementById("scriptName").value;
    let typeName = document.getElementById("scriptType").value;
    if (typeName == "action") {
      ScriptOrganizer.addTrigger(scriptName);
    } else if (typeName == "reaction") {
      ScriptOrganizer.addEvent(scriptName);
    }
  }

  linkScript(isAction) {
    if (isAction == true) {
      CreatorManager.selectedObject.setUserData(
        "actionScript",
        ScriptOrganizer.findTrigger(document.getElementById("selectActionScript").value),
        null
      );
    } else {
      CreatorManager.selectedObject.setUserData(
        "reactionScript",
        ScriptOrganizer.findEvent(document.getElementById("selectReactionScript").value),
        null
      );
    }
    ScriptUI.areScriptsSelected(CreatorManager.selectedObject);
  }

}

export default new Script();