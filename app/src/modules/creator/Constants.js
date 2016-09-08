// set the scene size
const sceneSettings = {
  width:  500,
  height: 500
};
// set some camera attributes
const camSettings   = {
  fov:    70,
  aspect: sceneSettings.width / sceneSettings.height,
  near:   1,
  far:    3000,
  posX:   1000,
  posY:   150,
  posZ:   500
};

// set scene canvas positions
const canvasSettings = {
  width: $('.categories-left-panel').width() + $('.properties-left-panel').outerWidth(),
  height: $('.nav-container').height()
  // width: 80 + 607,
  // height: 58
};

class Constants {
  constructor() {
  }

  getSceneSettings() {
    return sceneSettings;
  }

  getCamSettings() {
    return camSettings;
  }

  getCanvasSettings() {
    return canvasSettings;
  }

}

export default new Constants();