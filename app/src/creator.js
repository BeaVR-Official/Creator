// import Scene from './modules/creator/Scene';
//
// require('./front/app.js');
// require('./modules/creator/ProjectManager.js');
//
// Scene.render();

import GraphicalManager from './modules/common/GraphicalManager';
import Application from './front/app';
import EventManager from './modules/common/EventManager';

new Application();

EventManager.emitEvent('addScene', "Default").then(function (res) {
  let sceneUuid = GraphicalManager.currentSceneUuid;
  console.log("Creator.js sceneUuid", sceneUuid);
  console.log("Res:", res);
}).catch(function (error) {
  console.error("Error", error);
});

let sceneUuid = GraphicalManager.currentSceneUuid;
console.log("2222 sceneUuid", sceneUuid);
