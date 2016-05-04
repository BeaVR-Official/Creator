/**
 * Created by urvoy_p on 25/04/16.
 */

import Navigator from './Navigator';
import CreatorUI from './Scene.ui';

class NavigatorUI {
  constructor() {
    $('#addCube').click(() => Navigator.addBox());
    $('#addSphere').click(() => Navigator.addSphere());
    $('#addCylinder').click(() => Navigator.addCylinder());
    $('#addLight').click(() => Navigator.addLight());
  }
}

export default new NavigatorUI();