/**
 * Created by urvoy_p on 25/04/16.
 */

import Scene from './Scene';
import SceneControls from './SceneControls';

class SceneUI {
  constructor() {
    this.addHelpers();
    SceneControls.events();

    this.adaptToWindow();
    $(window).resize(() => this.adaptToWindow());
    $('#mainView').append(Scene._renderer.domElement);
  }

  /**
   * Adapter scene renderer when window is resizing.
   */
  adaptToWindow() {
    let parentWidth  = $(window).width();
    let parentHeight = $(window).height();

    Scene._camera.aspect = parentWidth / parentHeight;
    Scene._camera.updateProjectionMatrix();
    Scene._renderer.setSize(parentWidth, parentHeight);
    Scene.render();
  }

  /**
   * Add basic helpers on sceneHelper.
   */
  addHelpers() {
    this.grid         = new THREE.GridHelper(500, 50);
    this.orbitControl = new THREE.OrbitControls(
      Scene._camera,
      Scene._renderer.domElement);

    this.orbitControl.addEventListener('change', () => Scene.render());
    Scene._sceneHelpers.add(this.grid);
  }

  /**
   * Add helper on light objects.
   *
   * @param object Object added from Navigator.js
   */
  addLightHelper(object) {
    let helper;
    if (object.name === 'lightPicker')
      object = object.children[0];
    if (object instanceof THREE.PointLight) {
      helper = new THREE.PointLightHelper(object, 50);
    } else
      return;

    Scene._sceneHelpers.add(helper);
  }
}

export default new SceneUI();
