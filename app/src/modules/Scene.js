//import * as THREE from "three";
/**
 * Created by urvoy_p on 24/04/16.
 */

class Scene {
  constructor() {
    // set the scene size
    const sceneSettings = {
      width:  500,
      height: 500
    };
    // set some camera attributes
    const camSettings   = {
      fov:    70,
      aspect: sceneSettings.width / sceneSettings.height,
      near:   1,
      far:    3000,
      posX:   1000,
      posY:   150,
      posZ:   500
    };

    this._sceneHelpers = new THREE.Scene();
    this._scene        = new THREE.Scene();
    window.scene       = this._scene;

    this._renderer = new THREE.WebGLRenderer();
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
    this._renderer.setSize(sceneSettings.width, sceneSettings.height);
    this._renderer.autoClear = false;
  }

  /**
   * Render the scene and sceneHelper.
   */
  render() {
    this._renderer.clear();
    this._renderer.render(this._scene, this._camera);
    this._renderer.render(this._sceneHelpers, this._camera);
  }
}

export default new Scene();