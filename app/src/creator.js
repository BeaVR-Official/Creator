// import Scene from './modules/creator/Scene';
//
// require('./front/app.js');
// require('./modules/creator/ProjectManager.js');
//
// Scene.render();

import Application from './front/app';
import EventManager from './modules/common/EventManager';
import ProjectManager from './modules/common/ProjectManager';
import GraphicalManager from './modules/common/GraphicalManager';

new Application();
EventManager.addScene("Default"); //Todo pouvoir ajouter par uuid

// Mettre des promesses pour les événements afin de les rendre "blocants"
// Car ici t est égal a null car l'événement n'a pas été déclanché
let t = GraphicalManager.getCurrentSceneUuid();
console.log('lol' + t);
let sceneUuid = ProjectManager.getSceneDescriptor(t);
console.log(sceneUuid);
EventManager.addObject(sceneUuid, 'toto', 'box');
