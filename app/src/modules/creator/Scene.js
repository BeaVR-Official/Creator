import Constants from './Constants';

Physijs.scripts.worker = 'http://localhost:63342/Creator/app/libs/physijs/physijs_worker.js';
Physijs.scripts.ammo   = 'http://localhost:63342/Creator/app/libs/physijs/ammo.js';

class Scene {

  constructor() {
    this._scene = new Physijs.Scene();
    this._sceneHelpers = new THREE.Scene();
    this._scene.setGravity(new THREE.Vector3(0, -1200, 0));
    window.scene       = this._scene;
    this._objList      = [];
    this.initRenderer();
    this.initCamera();
    this.initHelpers();
    this.initOrbitControl();
  }

  initRenderer() {
    let sceneSettings = Constants.getSceneSettings();
    this._renderer    = new THREE.WebGLRenderer({antialias: true});

    this._renderer.autoClear = false;
    this._renderer.setClearColor(0xB9B9B9, 1);
    this._renderer.setSize(sceneSettings.width, sceneSettings.height);
  }

  initCamera() {
    let camSettings = Constants.getCamSettings();
    this._camera    = new THREE.PerspectiveCamera(
      camSettings.fov,
      camSettings.aspect,
      camSettings.near,
      camSettings.far);

    this._camera.position.set(
      camSettings.posX,
      camSettings.posY,
      camSettings.posZ);
    this._camera.lookAt(this._scene.position);
  }

  initHelpers() {
    this._grid              = new THREE.GridHelper(500, 50);
    this._transformControls = new THREE.TransformControls(
      this._camera,
      this._renderer.domElement);

    this._transformControls.addEventListener('change', () => {
      //this.render();
    });

    this._sceneHelpers.add(this._grid);
    this._sceneHelpers.add(this._transformControls);
  }

  initOrbitControl() {
    this._orbitControl = new THREE.OrbitControls(
      this._camera,
      this._renderer.domElement);

    this._orbitControl.addEventListener('change', () => {
      //this.render()
    });
  }

  getRenderer() {
    return (this._renderer);
  }

  getScene() {
    return (this._scene);
  }

  getCamera() {
    return (this._camera);
  }

  findObject(object) {
    let foundObject = undefined;
    this._objList.find(currentObj => {
      if (currentObj === object)
        foundObject = currentObj;
    });
    return foundObject;
  }

  attachNewParent(object, parent) {
    THREE.SceneUtils.attach(object, this._scene, parent);
  }

  detachParent(object) {
    THREE.SceneUtils.detach(object, object.parent, this._scene);
  }

  removeAllSceneObject(scene) {
    if (scene !== undefined) {
      for (let i = scene.children.length - 1; i >= 0; i--) {
        let child = scene.children[i];
        scene.remove(child);
      }
    }
  }

  removeObjects() {
    this.removeAllSceneObject(this._sceneHelpers);
    this.removeAllSceneObject(this._scene);

    for (let i = this._objList.length - 1; i >= 0; i--) {
      this._objList.splice(i, 1);
    }
  }

  removeObject(object) {
    if (object !== undefined) {
      if (object.parent instanceof THREE.Scene) {
        this._scene.remove(object);
      }
      //TODO suppression lumière dans sceneHelper
      // else if (object.userData.objType === "picker") {
      //   let helper = undefined;
      //   this._sceneHelpers.find(obj => {
      //     if (obj.userData.id === object.userData.id)
      //       helper = obj;
      //   });
      //   console.log(helper);
      //   if (helper !== undefined) {
      //     this._sceneHelpers.remove(helper);
      //     object.parent.remove(object);
      //   }
      // }
      else
        object.parent.remove(object);

      let index = this._objList.indexOf(object);
      this._objList.splice(index, 1);
    }
  }

  attachToTransform(object) {
    this._transformControls.attach(object);
  }

  detachTransform() {
    this._transformControls.detach();
  }

  updateTransformControls() {
    this._transformControls.update();
  }
}

const scene = new Scene();

scene.render = () => {
  //scene._scene.simulate(); // run physics
  scene._renderer.clear();
  scene._renderer.render(scene._scene, scene._camera); // render the scene
  scene._renderer.render(scene._sceneHelpers, scene._camera);
  requestAnimationFrame(scene.render);
};

export default scene;