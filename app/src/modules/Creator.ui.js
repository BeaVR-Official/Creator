/**
 * Created by urvoy_p on 25/04/16.
 */

import Creator from './Creator.js';
import NavDrawerUI from './NavDrawer.ui.js';

debugger;

class CreatorUI {

  constructor(htmlNodeId, creator) {
    this.adaptToWindow(creator);
    $(htmlNodeId).append(creator._renderer.domElement);
    $(window).resize(this.adaptToWindow(creator));
    creator._renderer.render(creator._scene, creator._camera);
  }

  adaptToWindow(creator) {

    let parentWidth  = $(window).width();
    let parentHeight = $(window).height();

    creator._camera.aspect = parentWidth / parentHeight;
    creator._camera.updateProjectionMatrix();
    creator._renderer.setSize(parentWidth, parentHeight);
  }

}

export default CreatorUI;
