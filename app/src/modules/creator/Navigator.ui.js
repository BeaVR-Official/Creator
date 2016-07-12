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
    $('#fileObject').change((e) => Navigator.addExternal(e));
    $('#addLight').click(() => Navigator.addLight());
    $('#addSpotLight').click(() => Navigator.addSpotLight());
    $('#addAmbientLight').click(() => Navigator.addAmbientLight());
    $('#addDirectionalLight').click(() => Navigator.addDirectionalLight());
    $('#save').click(() => Save.saveCustomObjects());
    $('#fileScene').change((e) => Save.loadCustomObjects(e));
    $('#launch').click(() => Save.saveCustomObjects(true));
    $('#newScript').click(() => $('#scriptModal').modal('show'));
  }
}

export default new NavigatorUI();