// import Scene from './modules/creator/Scene';
//
// require('./front/app.js');
// require('./modules/creator/ProjectManager.js');
//
// Scene.render();

import EventManager from './modules/common/EventManager';
import ProjectManager from './modules/common/ProjectManager';
import GraphicalManager from './modules/common/GraphicalManager';
require('./front/app');

EventManager.emitEvent('addScene', "Default").then(res => {
  let t = GraphicalManager.getCurrentSceneUuid();
  console.log('lol' + t);

  let sceneUuid = ProjectManager.getSceneDescriptor(t);
  console.log(sceneUuid);
  let data = {
    sceneUuid:  t,
    objectName: 'toto',
    objectType: 'box'
  };
  EventManager.emitEvent('addObject', data).then(res => {
    console.log("res", res);
  });
});