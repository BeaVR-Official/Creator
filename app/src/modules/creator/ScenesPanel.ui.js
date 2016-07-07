/**
 * Created by urvoy_p on 04/05/16.
 */

import SugarMaple from '../sugarmaple/SugarMaple';
import * as SceneUI from './Scene.ui';
import * as Scene from './Scene';

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
    this.rootNode = this.sm.sugarmaple('manage.create', 'Scene 1');
    this.sm.sugarmaple('manage.setRoot', this.rootNode);
  }

  addObjectNode(object) {
    // Obj Scene OK ici
    //console.log(Scene);

    if (object.objType === 'picker')
      object = object.children[0];
    let node = this.sm.sugarmaple('manage.create', object.name, object);
    this.sm.sugarmaple('manage.attach', this.rootNode, node);
  }

  sugarMapleEvents() {
    console.log(Scene);
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
      if (node !== undefined) {
        THREE.SceneUtils.detach(node.data, node.data.parent, Scene.default._scene);
      }
    });

    this.sm.on('sortable.dropped', (e, newParent, node) => {
      if (newParent === undefined && node.data !== undefined) {
        //Faire rootMesh
        THREE.SceneUtils.attach(node.data, Scene.default._scene, Scene.default.scene);
      } else if (node !== undefined && newParent.data !== undefined) {
        console.log(newParent);
        console.log(node);
        THREE.SceneUtils.attach(node.data, Scene.default._scene, newParent.data);
      }
    });
  }
}

export default new ScenesPanelUI();