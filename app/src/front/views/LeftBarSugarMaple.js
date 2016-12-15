/**
 * Created by giraud_d on 13/09/2016.
 */

import SugarMaple from '../../modules/sugarmaple/SugarMaple';
import CreatorManagement from '../../modules/creator/CreatorManagement';
import * as ScenePanel from '../../modules/creator/ScenesPanel';

import 'jquery-ui-bundle';
//import 'jquery-ui-touch-punch';
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

    // Test usage
    const titi = this.smTree.sugarmaple('manage.create', 'titi', 'tete');
    const tita = this.smTree.sugarmaple('manage.create', 'tita', {a: 'tete',b: 2});
    const tito = this.smTree.sugarmaple('manage.create', 'tito', ['tete']);
    this.smTree.sugarmaple('manage.attach', titi, tita);
    this.smTree.sugarmaple('manage.attach', titi, tito);
    this.smTree.sugarmaple('manage.setRoot', titi);


    // Deprecated methods. Still here as examples
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
      ; // TODO ScenePanel.default.onChecked(node);
    });

    this.smTree.on('checkable.unchecked', (e, node) => {
      // TODO ScenePanel.default.onUnchecked();
    });

    this.smTree.on('sortable.dragged', (e, node) => {
      if (node !== undefined)
      ;// TODO ScenePanel.default.onDragged(node);
    });

    this.smTree.on('sortable.dropped', (e, newParent, node) => {
      if (newParent !== undefined)
      ;// TODO ScenePanel.default.onDropped(newParent, node);
    });

    this.smTree.on('threejs.deleteNode', (e, node) => {
      if (node !== undefined) {
        ;// TODO CreatorManagement.removeObject(node.data);
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
}

export default LeftBarSugarMaple;
0
