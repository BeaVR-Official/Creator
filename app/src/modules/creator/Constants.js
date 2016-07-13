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

class Constants {
  constructor() {
  }

  getSceneSettings() {
    return sceneSettings;
  }

  getCamSettings() {
    return camSettings;
  }

}

export default new Constants();