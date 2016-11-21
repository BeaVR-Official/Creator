// import Scene from './modules/creator/Scene';
//
// require('./front/app.js');
// require('./modules/creator/ProjectManager.js');
//
// Scene.render();

import Application from './front/app';
import EventManager from './modules/common/EventManager';

new Application();
EventManager.addScene("Default");