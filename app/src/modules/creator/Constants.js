// set the scene size
const sceneSettings = {
  width:  window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xB9B9B9
};
// set some camera attributes
const camSettings   = {
  fov:    70,
  aspect: sceneSettings.width / sceneSettings.height,
  near:   1,
  far:    6000,
  posX:   1000,
  posY:   150,
  posZ:   500
};

// set scene canvas positions
const canvasSettings = {
  width: window.innerWidth,
  height: window.innerHeight + $(".TopBarSelector").height()
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