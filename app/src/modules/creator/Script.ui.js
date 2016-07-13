/**
 * Created by urvoy_p on 11/07/16.
 */

import Script from './Script';
import CreatorManager from'./CreatorManagement';
import PropPanelUI from './PropPanel.ui';

class ScriptUI {

  constructor() {
/*
    $('#scriptModal').modal({
      allowMultiple: true
    });
    $('#scriptConfModal').modal({
      allowMultiple: true
    });

    $('#scriptActions').dropdown();
    $('#scriptReactions').dropdown();
    $('.scriptConf').on('DOMNodeInserted', function(e) {
      $(e.target).click(() => {
        $('#scriptConfModal').modal('show');
      });
    });
*/
    $('#scriptType').dropdown();
    $('#scriptSave').click(() => this.createScript());
    $('#actionScriptLink').click(() => Script.linkScript(true));
    $('#reactionScriptLink').click(() => Script.linkScript(false));
  }

  areScriptsSelected(object) {
    if (object.getUserData("actionScript")) {
      document.getElementById("unselectedActionScript").style.display = "none";
      document.getElementById("selectedActionScript").style.display = "initial";
    } else {
      document.getElementById("selectedActionScript").style.display = "none";
      document.getElementById("unselectedActionScript").style.display = "initial";
    }
    if (object.getUserData("reactionScript")) {
      document.getElementById("unselectedReactionScript").style.display = "none";
      document.getElementById("selectedReactionScript").style.display = "initial";
    } else {
      document.getElementById("selectedReactionScript").style.display = "none";
      document.getElementById("unselectedReactionScript").style.display = "initial";
    }
  }

  createScript() {
    Script.createScript();
    if (CreatorManager.selectedObject instanceof THREE.Mesh) //undefined marche pas, prq ?
      PropPanelUI.loadObjectScript();
  }

}

export default new ScriptUI();