/**
 * Created by urvoy_p on 25/04/16.
 */

import NavDrawer from './NavDrawer.js';
import Save from './Save.js';

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
    $('#save').click(function () {
      Save.saveScene();
    });
  }
}

export default new NavDrawerUI();