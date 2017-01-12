/**
 * Created by giraud_d on 13/09/2016.
 */

import SugarMaple from '../../modules/sugarmaple/SugarMaple';
import GraphicalManager from '../../modules/common/GraphicalManager';
import ProjectManager from '../../modules/common/ProjectManager';
import EventManager from '../../modules/common/EventManager';


import CreatorManagement from '../../modules/creator/CreatorManagement';

import 'jquery-ui-bundle';
import 'jquery-ui-touch-punch';

/**
 * Creation de cette classe util lié à leftMenu pour compartimenter le code
 * SugarMaple rattaché à leftMenu car incompatibilité entre backbone - jquery et lui
 */
class LeftBarSugarMaple {

  constructor() {
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
    this.lastSelectedNode = undefined;

    this.sugarMapleEvents();
    this.initializeSugar();
  }

  initializeSugar() {
    this.sceneDesc = ProjectManager.getSceneDescriptor(GraphicalManager.getCurrentSceneUuid());
    if (this.sceneDesc != undefined) {
      this.rootNode = this.smTree.sugarmaple('manage.create', this.sceneDesc.attributes.name, this.sceneDesc);
      this.smTree.sugarmaple('manage.setRoot', this.rootNode);
    }
    this.sceneEvents();
  }

  // TODO @damien initSugar()
  // TODO @damien addAllObj(Desc)

  addObject(objectUuid) {
    let object = ProjectManager.getObjectDescriptor(this.sceneDesc.attributes.uuid, objectUuid);
    let objectNode = this.smTree.sugarmaple('manage.create', object.attributes.name, object);

    if (this.rootNode && objectNode)
      this.smTree.sugarmaple('manage.attach', this.rootNode, objectNode);
  }

  loadATV(SD) {
    this.initializeSugar();
    SD.attributes.objectDescriptors.forEach((OD) => {
      this.addObject(OD.attributes.uuid);
    });
  }

  /**
   * Events send by sugarMaple
   */
  sugarMapleEvents() {
    this.smTree.on('checkable.checked', (e, node) => {
      if (this.lastSelectedNode !== node)
        this.smTree.sugarmaple('checkable.setCheck', this.lastSelectedNode, false);
      let data = {
        objectDesc: node.data
      };

      EventManager.emitEvent('treeview.checked', data);
      this.lastSelectedNode = node;
    });

    this.smTree.on('checkable.unchecked', (e, node) => {
      let data = {
        objectDesc: node.data
      };
      EventManager.emitEvent('treeview.unchecked', data);
    });

    this.smTree.on('sortable.dragged', (e, node) => {
      console.log("dragged!!", node);
      // TODO ScenePanel.default.onDragged(node);
    });

    this.smTree.on('sortable.dropped', (e, newParent, node) => {
      console.log("dropped!!", node);
      // TODO ScenePanel.default.onDropped(newParent, node);
    });

    this.smTree.on('threejs.deleteNode', (e, node) => {
      console.log("delete!!", node);
      // TODO CreatorManagement.removeObject(node.data);
    });
  }

  /**
   * Events send by SceneView
   */
  sceneEvents() {
    EventManager.on('GM.objectSelected', data => {
      if (this.lastSelectedNode)
        this.smTree.sugarmaple('checkable.setCheck', this.lastSelectedNode, false);

      let smNode = this.smTree.sugarmaple('threejs.getNodeFromObject', data.selectedObjDesc);
      this.smTree.sugarmaple('checkable.setCheck', smNode, true);
      this.lastSelectedNode = smNode;
    });

    EventManager.on('GM.objectDeselected', data => {
      if (data.deselectedObjDesc) {
        let smNode = this.smTree.sugarmaple('threejs.getNodeFromObject', data.deselectedObjDesc);
        this.smTree.sugarmaple('checkable.setCheck', smNode, false);
      }
    });

    EventManager.on('removedObject', object => {
      let smNode = this.smTree.sugarmaple('threejs.getNodeFromObject', object);
      this.smTree.sugarmaple('manage.detach', smNode);
    });
  }
}

export default new LeftBarSugarMaple();