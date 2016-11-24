/**
 * Created by giraud_d on 13/09/2016.
 */

import SugarMaple from '../../modules/sugarmaple/SugarMaple';
import CreatorManagement from '../../modules/creator/CreatorManagement';
import * as ScenePanel from '../../modules/creator/ScenesPanel';

import $ from 'jquery';

/**
 * Creation de cette classe util lié à leftMenu pour compartimenter le code
 * SugarMaple rattaché à leftMenu car incompatibilité entre backbone - jquery et lui
 */
class LeftBarSugarMaple {

  constructor() {
  }

  initializeSugar() {
    $.widget("custom.sugarmaple", {
      _create: function () {
        new SugarMaple(this, this.options);
      }
    });

    this.smTree = $('#sceneTree').sugarmaple({
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
        checkable: true,
        threejs:   true
      }
    });
    ScenePanel.default.initTree(this.smTree);
    this.sugarMapleEvents();
    this.sceneEvents();
  }

  /**
   * Events send by sugarMaple
   */
  sugarMapleEvents() {
    this.smTree.on('checkable.checked', (e, node) => {
      if (node !== undefined)
        ScenePanel.default.onChecked(node);
    });

    this.smTree.on('checkable.unchecked', (e, node) => {
      ScenePanel.default.onUnchecked();
    });

    this.smTree.on('sortable.dragged', (e, node) => {
      if (node !== undefined)
        ScenePanel.default.onDragged(node);
    });

    this.smTree.on('sortable.dropped', (e, newParent, node) => {
      if (newParent !== undefined)
        ScenePanel.default.onDropped(newParent, node);
    });

    this.smTree.on('threejs.deleteNode', (e, node) => {
      if (node !== undefined) {
        CreatorManagement.removeObject(node.data);
      }
    });
  }

  /**
   * Events send by SceneView
   */
  sceneEvents() {
    CreatorManagement.on('selectedObject', object => {
      let smNode = this.smTree.sugarmaple('threejs.getNodeFromObject', object);
      this.smTree.sugarmaple('checkable.setCheck', smNode, true);
    });

    CreatorManagement.on('deselectedObject', object => {
      let smNode = this.smTree.sugarmaple('threejs.getNodeFromObject', object);
      this.smTree.sugarmaple('checkable.setCheck', smNode, false);
    });

    CreatorManagement.on('removedObject', object => {
      let smNode = this.smTree.sugarmaple('threejs.getNodeFromObject', object);
      this.smTree.sugarmaple('manage.detach', smNode);
    });
  }

  /**
   * Changes state between panels (treeview & properties)
   * Treeview's displayed with a true arg value
   * @param arg
   */
  showSugarMaple(arg) {
    let treeviewPanel   = $('.treeview-left-panel');
    let propertiesPanel = $('.properties-left-panel');
    if (arg === true) {
      treeviewPanel.css("display", "block");
      propertiesPanel.css("display", "none");
    } else {
      treeviewPanel.css("display", "none");
      propertiesPanel.css("display", "block");
    }
  }
}

export default LeftBarSugarMaple;
0
