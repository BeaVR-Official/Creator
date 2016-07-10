/**
 * Created by urvoy_p on 25/04/16.
 */

import Scene from './Scene';
import * as PropPanelUI from './PropPanel.ui.js';
import SceneControls from './SceneControls';

class SceneUI {
  constructor() {
    this._orbitControl = new THREE.OrbitControls(
      Scene._camera,
      Scene._renderer.domElement);

    this._orbitControl.addEventListener('change', () => Scene.render());
    this.init();

    this.adaptToWindow();
    $(window).resize(() => this.adaptToWindow());
    $('#mainView').append(Scene._renderer.domElement);
  }

  init() {
    this._grid              = new THREE.GridHelper(500, 50);
    this._transformControls = new THREE.TransformControls(
      Scene._camera,
      Scene._renderer.domElement);
    this._transformControls.addEventListener('change', () => {
      PropPanelUI.default.updateTransformations();
      Scene.render();
    });

    Scene._sceneHelpers.add(this._grid);
    Scene._sceneHelpers.add(this._transformControls);
    new SceneControls(this._transformControls);
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

  attachToTransform(object) {
    this._transformControls.attach(object);
    PropPanelUI.default.loadObjectInfo(object);
    Scene.render();
  }

  detachTransform() {
    this._transformControls.detach();
    PropPanelUI.default.unselectObject();
    Scene.render();
  }

  updateTransformControls() {
    this._transformControls.update();
  }
}

export default new SceneUI();
