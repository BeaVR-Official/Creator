/**
 * Created by urvoy_p on 25/04/16.
 */

import Creator from './Creator.js';
import NavDrawerUI from './NavDrawer.ui.js';

class CreatorUI {

  constructor(htmlNodeId) {
    this.adaptToWindow();
    $(htmlNodeId).append(this.renderer.domElement);
    $(window).resize(this.adaptToWindow());
    Creator.renderer.render(Creator.rootScene, Creator.mainCamera);
  }

  adaptToWindow() {

    let parentWidth  = $(window).width();
    let parentHeight = $(window).height();

    Creator.mainCamera.aspect = parentWidth / parentHeight;
    Creator.mainCamera.updateProjectionMatrix();
    Creator.renderer.setSize(parentWidth, parentHeight);
  }
}

export default CreatorUI;
