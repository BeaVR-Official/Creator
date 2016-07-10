/**
 * Created by urvoy_p on 25/04/16.
 */

import Navigator from './Navigator';
import Save from './Save';

class NavigatorUI {
  constructor() {
    $('#addCube').click(() => Navigator.addBox());
    $('#addSpotLight').click(() => Navigator.addSpotLight());
    $('#addDirectionalLight').click(() => Navigator.addDirectionalLight());
    $('#addAmbientLight').click(() => Navigator.addAmbientLight());
    $('#addSphere').click(() => Navigator.addSphere());
    $('#addCylinder').click(() => Navigator.addCylinder());
    $('#addLight').click(() => Navigator.addLight());
    $('#addExternal').click(() => Navigator.addExternal());
    $('#save').click(() => Save.saveCustomObjects());
    //$('#load').click(() => Save.loadCustomObjects());
    $('.inputfile').change((e) => Save.loadCustomObjects(e));
    $('#launch').click(() => Save.saveCustomObjects(true));
  }
}

export default new NavigatorUI();