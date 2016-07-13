import Scene from '../creator/Scene';

// Degeu car this = undefined donc un attribut c'ets pareil !
var listLoadedObjectsUuid = [];

class ScenePlayer {

  constructor() {
    // desactiver la grille
    Scene._sceneHelpers.children.forEach(function(entry) {
      if (entry instanceof THREE.GridHelper) {
        Scene._sceneHelpers.remove(entry);
      } else if (entry instanceof THREE.TransformControls) {
        // Peut être remove
      }
    });
    // desactiver le click
    // ajouter les scrips
    // ajouter la vr
    this.load();
  }

  load() {
    let stored = localStorage['saveRunner'];
    let loader = new THREE.ObjectLoader();
    let loadedObjects = JSON.parse(stored);

    loadedObjects.forEach((entry) => {
      let loadedMesh = loader.parse(entry);
      // on enregistre tout les enfants dans un premier temps
      this.excludeChildren(loadedMesh);
    });
    loadedObjects.forEach((entry) => {
      let loadedMesh = loader.parse(entry);
      let stop = false;
      listLoadedObjectsUuid.forEach((object) => {
        if (object === loadedMesh.uuid) {
          stop = true;;
        }
      });
      if (stop === false || listLoadedObjectsUuid.length === 0) {
        Scene._scene.add(loadedMesh);
      }
    });
    Scene.render();
  }

  excludeChildren(object) {
    object.children.forEach((entry) => {
      listLoadedObjectsUuid.push(entry.uuid);
      this.excludeChildren(entry);
    });
  }

  start() {

  }

  pause() {

  }
}

export default new ScenePlayer();