// import Scene from './modules/creator/Scene';
//
// require('./front/app.js');
// require('./modules/creator/ProjectManager.js');
//
// Scene.render();

import ProjectManager from './modules/common/ProjectManager';
import GraphicalManager from './modules/common/GraphicalManager';
require('./front/app.js');

let sceneUuid = ProjectManager.addScene("Default");