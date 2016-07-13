/**
 * Created by urvoy_p on 11/07/16.
 */

import Trigger from './script/Trigger';
import ScriptOrganizer from './script/ScriptOrganizer';
import PropPanelUI from './PropPanel.ui';

class Script {

  constructor() {
  };

  newTrigger() {
    let scriptName  = document.getElementById("scriptName").value;
    // sample
    let typeName = document.getElementById("scriptType").value;
    if (typeName == "action") {
      ScriptOrganizer.addTrigger(scriptName);
      PropPanelUI.actionScriptListUpdate();
    } else if (typeName == "reaction") {
      ScriptOrganizer.addEvent(scriptName);
      PropPanelUI.reactionScriptListUpdate();
    }
  }

}

export default new Script();