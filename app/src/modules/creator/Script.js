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
      CreatorManager.selectedObject.userData = {
        actionScript :
        ScriptOrganizer.triggerList[
          ScriptOrganizer.findTrigger(document.getElementById("selectActionScript").value)
        ].uuid
      };
    } else {
      CreatorManager.selectedObject.setUserData(
        "reactionScript",
        ScriptOrganizer.findEvent(document.getElementById("selectReactionScript").value),
        null
      );
    }


    let object = CreatorManager.selectedObject;
    //ScriptUI.areScriptsSelected(CreatorManager.selectedObject);
    if (object.userData.actionScript) {
      document.getElementById("unselectedActionScript").style.display = "none";
      document.getElementById("selectedActionScript").style.display = "initial";
      document.getElementById("selectedActionScript").textContent =
        ScriptOrganizer.triggerList[
          ScriptOrganizer.findTrigger(document.getElementById("selectActionScript").value)
          ].name;
    } else {
      document.getElementById("selectedActionScript").style.display = "none";
      document.getElementById("unselectedActionScript").style.display = "initial";
    }
    if (object.userData.reactionScript) {
      document.getElementById("unselectedReactionScript").style.display = "none";
      document.getElementById("selectedReactionScript").style.display = "initial";
    } else {
      document.getElementById("selectedReactionScript").style.display = "none";
      document.getElementById("unselectedReactionScript").style.display = "initial";
    }
  }

}

export default new Script();