/**
 * Created by urvoy_p on 25/04/16.
 */

import Scene from './Scene';
import PropPanelUI from './PropPanel.ui.js';
import SceneControls from './SceneControls';

class SceneUI {
  constructor() {
    this._grid              = new THREE.GridHelper(500, 50);
    this._orbitControl      = new THREE.OrbitControls(
      Scene._camera,
      Scene._renderer.domElement);
    this._transformControls = new THREE.TransformControls(
      Scene._camera,
      Scene._renderer.domElement);
    this.addHelpers();

    new SceneControls(this._transformControls);

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
    this._orbitControl.addEventListener('change', () => Scene.render());
    this._transformControls.addEventListener('change', () => {
      PropPanelUI.updateTransformations();
      Scene.render();
    });
    Scene._sceneHelpers.add(this._grid);
    Scene._sceneHelpers.add(this._transformControls);
  }

  /**
   * Add helper on light objects.
   *
   * @param object Object added from Navigator.js
   */
  addLightHelper(object) {
    let helper;

    if (object instanceof THREE.PointLight) {
      helper = new THREE.PointLightHelper(object, 50);
    } else if (object instanceof THREE.SpotLight) {
      helper = new THREE.SpotLightHelper(object);
    } else if (object instanceof THREE.DirectionalLight) {
      helper = new THREE.DirectionalLightHelper(object, 50);
    } else
      return;
    Scene._sceneHelpers.add(helper);
  }
}

export default new SceneUI();
