//import * as THREE from "three";
/**
 * Created by urvoy_p on 24/04/16.
 */

import * as ScenesPanel from './ScenesPanel.ui';
import Constants from './Constants';

class Scene {
  constructor() {
    this._sceneHelpers = new THREE.Scene();
    this._scene        = new THREE.Scene();
    window.scene       = this._scene;

    this._renderer  = new THREE.WebGLRenderer({antialias: true});
    let camSettings = Constants.getCamSettings();
    this._camera    = new THREE.PerspectiveCamera(
      camSettings.fov,
      camSettings.aspect,
      camSettings.near,
      camSettings.far);
    this._camera.position.set(
      camSettings.posX,
      camSettings.posY,
      camSettings.posZ);
    this._camera.lookAt(new THREE.Vector3(0, 200, 0));
    this._renderer.setClearColor(0xB9B9B9, 1);
    let sceneSettings = Constants.getSceneSettings();
    this._renderer.setSize(sceneSettings.width, sceneSettings.height);
    this._renderer.autoClear = false;

    // Seul var à nous
    this._objList = [];
  }

  addObj(object) {
    ScenesPanel.default.addObjectNode(object);
    this._scene.add(object);
    this._objList.push(object);
  }

  attachNewParent(node, parent) {
    this._objList.find(object => {
      if (object === node)
        THREE.SceneUtils.attach(object, this._scene, parent);
    });
  }
  
  detachParent(node) {
    THREE.SceneUtils.detach(node, node.parent, this._scene);
  }

  /*
   // Supression de la methode pour la transférer dans la class Save
   serializeObj() {
   }
   */

  /**
   * Render the scene and sceneHelper.
   */
  render() {
    this._renderer.clear();
    this._renderer.render(this._scene, this._camera);
    this._renderer.render(this._sceneHelpers, this._camera);
  }

  removeObjects() {
    for (let i = this._sceneHelpers.children.length - 1; i >= 0; i--) {
      let child = this._sceneHelpers.children[i];
      console.log(child);
      this._sceneHelpers.remove(child);
    }

    let scene = this._scene;
    this._objList.forEach(entry => {
      scene.remove(entry);
    });
    // and rest camera
    /*    let camSettings = Constants.getCamSettings();
     this._camera   = new THREE.PerspectiveCamera(
     camSettings.fov,
     camSettings.aspect,
     camSettings.near,
     camSettings.far);

     this._camera.position.set(
     camSettings.posX,
     camSettings.posY,
     camSettings.posZ);
     this._camera.lookAt(new THREE.Vector3(0, 200, 0));
     this.render();
     */
  }
}

export default new Scene();