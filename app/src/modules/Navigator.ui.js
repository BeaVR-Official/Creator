/**
 * Created by urvoy_p on 25/04/16.
 */

import Navigator from './Navigator';
import Save from './Save';

class NavigatorUI {
  constructor() {
    $('#addCube').click(() => Navigator.addBox());
    $('#addSphere').click(() => Navigator.addSphere());
    $('#addCylinder').click(() => Navigator.addCylinder());
    $('#addLight').click(() => Navigator.addLight());
    $('#save').click(() => Save.saveScene());
  }
}

export default new NavigatorUI();