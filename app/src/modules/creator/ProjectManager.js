/**
 * Created by giraud_d on 14/09/2016.
 */

import SceneManager from './SceneManager';

class ProjectManager {

  constructor() {
    this._sceneManager = new SceneManager();
    this._name = "Unnamed Project";
  }

  // UTIL
  getCurrentScene() {
    let uuid = this._sceneManager._i;
    return this._sceneManager._scenes.filter(function (obj) {
      return obj.uuid === uuid;
    })[0];
  }
}

export default new ProjectManager();