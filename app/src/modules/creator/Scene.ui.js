import Scene from './Scene';
import SceneControls from './SceneControls';

class SceneUI {
  constructor() {
    this.adaptToWindow();
    $(window).resize(() => this.adaptToWindow());
    $('#mainView').append(Scene._renderer.domElement);
    SceneControls.events();
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
}

export default new SceneUI();
