/**
 * Created by giraud_d on 14/09/2016.
 */

import SceneManager from './SceneManager';

class ProjectManager {

  constructor() {
    this._sceneManager = new SceneManager();
    this._name = "Unnamed Project";
  }
  
}

export default new ProjectManager();