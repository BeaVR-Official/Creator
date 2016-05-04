/**
 * Created by urvoy_p on 25/04/16.
 */

import Creator from './Scene';

class CreatorUI {
  constructor() {
    this.adaptToWindow();
  }

  adaptToWindow() {
    let parentWidth  = $(window).width();
    let parentHeight = $(window).height();

    Creator._camera.aspect = parentWidth / parentHeight;
    Creator._camera.updateProjectionMatrix();
    Creator._renderer.setSize(parentWidth, parentHeight);
    Creator._renderer.render(Creator._scene, Creator._camera);
  }
}

export default new CreatorUI();
