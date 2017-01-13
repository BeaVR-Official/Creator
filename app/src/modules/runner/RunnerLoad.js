/**
 * Created by damien on 1/13/17.
 */

import Cookie from '../../front/cookie';
import GraphicalManager from '../common/GraphicalManager';
import ProjectManager from '../common/ProjectManager';
import SaveManager from '../common/SaveManager';

class RunnerLoad {

  constructor() {
    this.init();
  }

  init() {
    GraphicalManager.setDisplayMode(false);
    let projectId = Cookie.getCookieValue('runProjectId');
    SaveManager.importProject(projectId);
  }

}

export default RunnerLoad;