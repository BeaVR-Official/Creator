/**
 * Created by giraud_d on 13/09/2016.
 */

import Scene from './Scene';
import UUID from './../utils/UUID';

class SceneManager {

  constructor() {
    this._scenes    = new Array();
    this._scenes[0] = {scene: Scene._scene, name: 'Unnamed scene', uuid: UUID.createUUID()};
    this._i         = this._scenes[0].uuid;
  }

  deleteScene(uuid) {

  }

  addNewScene(name) {
    let uuid = UUID.createUUID();

  }

}

export default SceneManager;