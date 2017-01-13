/**
 * Created by damien on 1/13/17.
 */

import Cookie from '../../front/cookie';
import SaveManager from '../common/SaveManager';
import ProjectManager from '../common/ProjectManager';
import GraphicalManager from '../common/GraphicalManager';
import EventManager from '../common/EventManager';

class RunnerLoad {

  constructor() {
    this.init();
  }

  init() {
    GraphicalManager.setDisplayMode(false);
    let projectId = Cookie.getCookieValue('runProjectId');
    SaveManager.importProject(projectId);
    //ProjectManager.reloadScene();
  }
}

export default RunnerLoad;