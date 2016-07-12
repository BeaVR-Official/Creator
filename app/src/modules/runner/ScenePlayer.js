import Scene from '../creator/Scene';

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
      Scene._scene.add(loadedMesh);
    });
    Scene.render();
  }

  start() {

  }

  pause() {

  }
}

export default new ScenePlayer();