/**
 * Created by urvoy_p on 04/05/16.
 */

import SugarMaple from '../sugarmaple/SugarMaple';
import * as Scene from './Scene';
import * as SceneUI from './Scene.ui';

class ScenesPanelUI {
  constructor() {
    $('#scenesPanel').resizable({
      // minHeight: 200,
      // minHeight: 200,
      minWidth: 200,
      maxWidth: 1000,
      handles:  "e" // coordonnées géographiques nswe
    });

    this.createTree();
    this.sugarMapleEvents();
  }

  createTree() {
    // Obj Scene VIDE ici (undefined)
    // console.log(Scene);
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
    this.rootNode = this.sm.sugarmaple('manage.create', 'Scene 1', Scene.default._scene);
    this.sm.sugarmaple('manage.setRoot', this.rootNode);
  }

  addObjectNode(object) {
    let nodeName = object.name;
    if (object.objType === 'picker')
      nodeName = object.children[0].name;
    let node = this.sm.sugarmaple('manage.create', nodeName, object);
    this.sm.sugarmaple('manage.attach', this.rootNode, node);
  }

  sugarMapleEvents() {
    this.sm.on('checkable.checked', (e, node) => {
      if (node.data.parent.objType === 'picker')
        SceneUI.default.attachToTransform(node.data.parent);
      else
        SceneUI.default.attachToTransform(node.data);
      // console.log(this.sm.sugarmaple('manage.exportTree'));
      //this.sm.sugarmaple('checkable.uncheck', node);
    });

    this.sm.on('checkable.unchecked', (e, node) => {
      SceneUI.default.detachTransform();
    });

    this.sm.on('sortable.dragged', (e, node) => {
      if (node !== undefined)
        Scene.default.detachParent(node.data);
    });

    this.sm.on('sortable.dropped', (e, newParent, node) => {
      console.log('attach new parent: ');
      console.log(newParent);
      if (newParent === undefined) //Bug spécifique de l'accordéon
        return;
      Scene.default.attachNewParent(node.data, newParent.data);
    });
  }
}

export default new ScenesPanelUI();