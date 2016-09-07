import Constants from './Constants';
import * as PropPanelUI from './PropPanel.ui';

class Scene {
  constructor() {
    this._scene        = new THREE.Scene();
    this._sceneHelpers = new THREE.Scene();
    window.scene       = this._scene;
    // Seul var à nous
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
    this._stereo = new THREE.StereoEffect(this._renderer);

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
    this._camera.lookAt(new THREE.Vector3(0, 200, 0));
  }

  initHelpers() {
    this._grid              = new THREE.GridHelper(500, 50);
    this._transformControls = new THREE.TransformControls(
      this._camera,
      this._renderer.domElement);

    this._transformControls.addEventListener('change', () => {
      PropPanelUI.default.updateTransformations();
      this.render();
    });

    this._sceneHelpers.add(this._grid);
    this._sceneHelpers.add(this._transformControls);
  }

  initOrbitControl() {
    this._orbitControl = new THREE.OrbitControls(
      this._camera,
      this._renderer.domElement);

    this._orbitControl.addEventListener('change', () => this.render());
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

  /*
   // Supression de la methode pour la transférer dans la class Save
   serializeObj() {
   }
   */

  removeAllSceneObject(scene) {
    if (scene !== undefined) {
      for (let i = scene.children.length - 1; i >= 0; i--) {
        let child = scene.children[i];
        scene.remove(child);
      }
    }
  }

  removeObjects() {
    // TODO à corriger en récursive children @Vincent ?
    this.removeAllSceneObject(this._sceneHelpers);
    this.removeAllSceneObject(this._scene);
    
    for (let i = this._objList.length - 1; i >= 0; i--) {
      this._objList.splice(i, 1);
    }

    // and rest camera
    /*    let camSettings = Constants.getCamSettings();
     this._camera   = new THREE.PerspectiveCamera(
     camSettings.fov,
     camSettings.aspect,
     camSettings.near,
     camSettings.far);

     this._camera.position.set(
     camSettings.posX,
     camSettings.posY,
     camSettings.posZ);
     this._camera.lookAt(new THREE.Vector3(0, 200, 0));
     this.render();
     */
  }

  removeObject(object) {
    if (object !== undefined)
      this._scene.remove(object);
    let index = this._objList.indexOf(object);
    this._objList.splice(index, 1);
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

  render() {
    this._renderer.clear();
    //this._renderer.render(this._scene, this._camera);
    this._stereo.render(this._scene, this._camera);
    this._renderer.render(this._sceneHelpers, this._camera);
  }

  renderStereo() {
    this._renderer.clear();
    this._stereo.render(this._scene, this._camera);
  }
}

export default new Scene();