//import * as THREE from "three";
/**
 * Created by urvoy_p on 24/04/16.
 */

import CustomObject from './CustomObject';
import ScenesPanel from './ScenesPanel.ui';
import Constants from './Constants';

class Scene {
  constructor() {
    this._sceneHelpers = new THREE.Scene();
    this._scene        = new THREE.Scene();
    window.scene       = this._scene;

    this._renderer = new THREE.WebGLRenderer({antialias: true});
    let camSettings = Constants.getCamSettings();
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
    this._renderer.setClearColor(0xB9B9B9, 1);
    let sceneSettings = Constants.getSceneSettings();
    this._renderer.setSize(sceneSettings.width, sceneSettings.height);
    this._renderer.autoClear = false;

    // Seul var à nous
    this._objList = [];
  }

  addObj(object) {
    if (object instanceof CustomObject) {
      ScenesPanel.addObjectNode(object);
      this._scene.add(object);
      this._objList.push(object);
    }
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
    let scene = this._scene;
    this._objList.forEach(function (entry) {
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