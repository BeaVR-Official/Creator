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
    this.initMisc();
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
    this._camera.lookAt(new THREE.Vector3(0, 200, 0));
  }

  initMisc() {
    this._grid              = new THREE.GridHelper(500, 50);
    this._orbitControl      = new THREE.OrbitControls(
      this._camera,
      this._renderer.domElement);
    this._transformControls = new THREE.TransformControls(
      this._camera,
      this._renderer.domElement);

    this._orbitControl.addEventListener('change', () => this.render());
    this._transformControls.addEventListener('change', () => {
      PropPanelUI.default.updateTransformations();
      this.render();
    });

    this._sceneHelpers.add(this._grid);
    this._sceneHelpers.add(this._transformControls);
  }

  findObject(object) {
    this._objList.find(currentObj => {
      if (currentObj === object)
        return currentObj;
    });
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

  removeObjects() {
    // TODO à corriger en récursive children @Vincent ?
    for (let i = this._sceneHelpers.children.length - 1; i >= 0; i--) {
      let child = this._sceneHelpers.children[i];
      this._sceneHelpers.remove(child);
    }

    let scene = this._scene;
    this._objList.forEach(entry => {
      scene.remove(entry);
    });
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
    this._renderer.render(this._scene, this._camera);
    this._renderer.render(this._sceneHelpers, this._camera);
  }
}

export default new Scene();