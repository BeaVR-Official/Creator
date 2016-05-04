//import * as THREE from "three";
/**
 * Created by urvoy_p on 24/04/16.
 */

class Scene {
  constructor() {
    // set the scene size
    const sceneSettings = {
      width: 500,
      height: 500
    };
    // set some camera attributes
    const camSettings   = {
      fov: 45,
      aspect: sceneSettings.width / sceneSettings.height,
      near: 0.1,
      far: 10000
    };

    this._scene    = new THREE.Scene();
    this._renderer = new THREE.WebGLRenderer();
    this._camera   = new THREE.PerspectiveCamera(
      camSettings.fov,
      camSettings.aspect,
      camSettings.near,
      camSettings.far);

    this._camera.position.z = 300;
    this._renderer.setSize(sceneSettings.width, sceneSettings.height);
  }
}

export default new Scene();