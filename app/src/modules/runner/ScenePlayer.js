import Constants from '../creator/Constants';

// Degeu car this = undefined donc un attribut c'ets pareil !
var listLoadedObjectsUuid = [];

class ScenePlayer {

  constructor() {
    this.count = 0;

    this._scene = new THREE.Scene();
    this.initCamera();
    this.initRenderer();
    this.initOrbitControl();
    window.addEventListener('deviceorientation', () => this.setOrientationControls, true);

    this.load();
  }

  initRenderer() {
    let sceneSettings        = Constants.getSceneSettings();
    this._renderer           = new THREE.WebGLRenderer({antialias: true});
    this._renderer.autoClear = false;
    this._renderer.setClearColor(0xB9B9B9, 1);
    this._renderer.setSize(sceneSettings.width, sceneSettings.height);
    this._effect = new THREE.StereoEffect(this._renderer);
  }

  initCamera() {
    // Default value from Constants, position and orientation should be contained in the Scene data
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

  initOrbitControl() {
    this._controls = new THREE.OrbitControls(
      this._camera,
      this._renderer.domElement);
    /*
    this._controls.target.set(
      this._camera.position.x + 0.15,
      this._camera.position.y,
      this._camera.position.z
    );
    */
    //this._controls.enablePan = false;
    //this._controls.enableZoom = false;
    /*
    this._orbitControl = new THREE.OrbitControls(
      this._camera,
      this._renderer.domElement);
      */
    /*
     this._orbitControl.rotateUp(Math.PI / 4);
     this._orbitControl.target.set(this._camera.position.x + 0.1, this._camera.position.y, this._camera.position.z);
     window.addEventListener("deviceOrientation", this.onOrientationChanged);
     */
    this._controls.addEventListener('change', () => this.render());
  }

  setOrientationControls(event) {
    if (!event.alpha) {
      return;
    }
    this._controls = new THREE.DeviceOrientationControls(this._camera, true);
    this._controls.connect();
    this._controls.update();
    this.render();
    //element.addEventListener('click', fullscreen, false);
  }
  /*
   onOrientationChanged(event) {
   if (!event.alpha) {
   return;
   }

   this._orbitControl = new THREE.DeviceOrientationControls(camera, true);
   this._orbitControl.connect();
   this._orbitControl.update();

   window.removeEventListener("deviceOrientation", onOrientationChanged);
   }
   */


  load() {
    // Vinvin a fait ça sur mon ordi, ce n'est pas moi ;-)
    if (this.count === 0) {

      $.getJSON( "SaveSample.json", (json) => {

        let loader        = new THREE.ObjectLoader();
        let loadedObjects = json;
        loadedObjects.forEach((entry) => {
          let loadedMesh = loader.parse(entry);
          // on enregistre tout les enfants dans un premier temps
          this.excludeChildren(loadedMesh);
        });
        loadedObjects.forEach((entry) => {
          let loadedMesh = loader.parse(entry);
          let stop       = false;
          listLoadedObjectsUuid.forEach((object) => {
            if (object === loadedMesh.uuid) {
              stop = true;
            }
          });
          if (stop === false || listLoadedObjectsUuid.length === 0) {

            if (loadedMesh.userData.objType === "picker") {
              this._scene.add(loadedMesh.children[0]);
            } else
              this._scene.add(loadedMesh);

            console.log("LoadedMesh", loadedMesh);
          }
        });
        this.render();

      });
    }
    this.count++;
  }

  excludeChildren(object) {
    object.children.forEach((entry) => {
      listLoadedObjectsUuid.push(entry.uuid);
      this.excludeChildren(entry);
    });
  }

  render() {
    this._renderer.clear();
    this._effect.render(this._scene, this._camera);
  }

  start() {

  }

  pause() {

  }
}

export default new ScenePlayer();