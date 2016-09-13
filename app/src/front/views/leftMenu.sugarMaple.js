/**
 * Created by giraud_d on 13/09/2016.
 */

import SugarMaple from '../../modules/sugarmaple/SugarMaple';
import * as ScenePanel from '../../modules/creator/ScenesPanel';

/**
 * Creation de cette classe util lié à leftMenu pour compartimenter le code
 * SugarMaple rattaché à leftMenu car incompatibilité entre backbone - jquery et lui
 */
class LeftMenuSugarMaple {

  constructor() {
  }

  initializeSugar() {
    $.widget("custom.sugarmaple", {
      _create: function () {
        new SugarMaple(this, this.options);
      }
    });

    this.sm = $('#sceneTree').sugarmaple({
      events:  {
        onImport: (node) => {
          return node;
        },
        onExport: (node) => {
          return node;
        }
      },
      plugins: {
        manage:    true,
        sortable:  true,
        checkable: true
      }
    });
    ScenePanel.default.initTree(this.sm);
    this.sugarMapleEvents();
  }

  sugarMapleEvents() {
    this.sm.on('checkable.checked', (e, node) => {
      if (node !== undefined)
        ScenePanel.default.onChecked(node);
    });

    this.sm.on('checkable.unchecked', (e, node) => {
      ScenePanel.default.onUnchecked();
    });

    this.sm.on('sortable.dragged', (e, node) => {
      if (node !== undefined)
        ScenePanel.default.onDragged(node);
    });

    this.sm.on('sortable.dropped', (e, newParent, node) => {
      if (newParent !== undefined)
        ScenePanel.default.onDropped(newParent, node);
    });
  }

  showSugarMaple(arg) {
    if (arg === true) {
      $('.treeview-left-panel').css("display", "block");
      $('.properties-left-panel').css("display", "none");
    } else {
      $('.treeview-left-panel').css("display", "none");
      $('.properties-left-panel').css("display", "block");
    }
  }
}

export default LeftMenuSugarMaple;