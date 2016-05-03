/**
 * Created by urvoy_p on 25/04/16.
 */

import NavDrawer from './NavDrawer.js';

debugger;

class NavDrawerUI {

  constructor() {
    $('#addCube').click(function () {
      NavDrawer.addBox();
    });
    $('#addSphere').click(function () {
      NavDrawer.addSphere();
    });
    $('#addCylinder').click(function () {
      NavDrawer.addCylinder();
    });
    $('#addLight').click(function () {
      NavDrawer.addLight();
    });
  }
}

export default new NavDrawerUI();