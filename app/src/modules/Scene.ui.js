/**
 * Created by urvoy_p on 25/04/16.
 */

import Scene from './Scene';
import SceneControls from './SceneControls';

class CreatorUI {
  constructor() {
    this.adaptToWindow();
    $(window).resize(() => this.adaptToWindow());
    $('#mainView').append(Scene._renderer.domElement);

    this.dragAndDrop = new DragAndDrop();
    SceneControls.events();
  }

  adaptToWindow() {
    let parentWidth  = $(window).width();
    let parentHeight = $(window).height();

    Scene._camera.aspect = parentWidth / parentHeight;
    Scene._camera.updateProjectionMatrix();
    Scene._renderer.setSize(parentWidth, parentHeight);
    Scene._renderer.render(Scene._scene, Scene._camera);
  }
}

export default new CreatorUI();
