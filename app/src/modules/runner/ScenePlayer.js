import Constants from '../creator/Constants';

// Degeu car this = undefined donc un attribut c'ets pareil !
var listLoadedObjectsUuid = [];

Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo   = 'ammo.js';

class ScenePlayer {

//4K1h5TLd8n1C

  constructor() {
    console.info("v 0.0.1");
    this._scene = new Physijs.Scene();
    this._scene.setGravity(new THREE.Vector3(0, -1200, 0));
    this.initRenderer();
    this.initCamera();
    this.initOrbitControl();
    //this.setOrientationControls();
    //window.addEventListener('deviceorientation', () => this.setOrientationControls, true);
    window.addEventListener('deviceorientation', this.setOrientationControls, true);
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
    this._scene.add(this._camera);
  }

  initOrbitControl() {
    this._controls = new THREE.OrbitControls(
     this._camera,
     this._renderer.domElement
    );
    //this._controls.rotateUp(Math.PI / 4);
    this._controls.target.set(
     this._camera.position.x + 0.15,
     this._camera.position.y,
     this._camera.position.z
    );
    this._controls.enablePan = false;
    this._controls.enableZoom = false;
  }

  setOrientationControls(event) {
    if (!event.alpha) {
      return;
    }
    this._controls = new THREE.DeviceOrientationControls(this._camera, true);
    this._controls.connect();
    this._controls.update();
    this._renderer.domElement.addEventListener('click', this.fullscreen, false);
    window.removeEventListener('deviceorientation', this.setOrientationControls, true);
  }

  fullscreen() {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
  }

  /*
  Seconde partie
   */

  fillObjectAttributes(recvr, sendr) {
    for (const prop in sendr) {
      if (sendr.hasOwnProperty(prop))
        if (typeof sendr[prop] === 'object') {
          if (recvr[prop] === undefined)
            recvr[prop] = {};
          this.fillObjectAttributes(recvr[prop], sendr[prop]);
        } else recvr[prop] = sendr[prop];
    }
  }

  load() {
    let stored        = localStorage['saveRunner'];
    let loader        = new THREE.ObjectLoader();
    let loadedObjects = JSON.parse(stored);
    loadedObjects.forEach((entry) => {
      let loadedMesh = loader.parse(entry);
      // on enregistre tout les enfants dans un premier temps
      this.excludeChildren(loadedMesh);
    });
    loadedObjects.forEach((entry) => {
      let loadedMesh = loader.parse(entry);

      if (entry._physijs !== undefined) {
        const geometry = loadedMesh.geometry;
        const material = loadedMesh.material;
        if (entry._physijs.type === 'plane')
          loadedMesh = new Physijs.PlaneMesh(geometry, material);
        if (entry._physijs.type === 'box')
          loadedMesh = new Physijs.BoxMesh(geometry, material);
        if (entry._physijs.type === 'sphere')
          loadedMesh = new Physijs.SphereMesh(geometry, material);
        if (entry._physijs.type === 'cylinder')
          loadedMesh = new Physijs.CylinderMesh(geometry, material);
        if (entry._physijs.type === 'cone')
          loadedMesh = new Physijs.ConeMesh(geometry, material);
        if (entry._physijs.type === 'capsule')
          loadedMesh = new Physijs.CapsuleMesh(geometry, material);
        if (entry._physijs.type === 'convex')
          loadedMesh = new Physijs.ConvexMesh(geometry, material);
        if (entry._physijs.type === 'concave')
          loadedMesh = new Physijs.ConcaveMesh(geometry, material);
        if (entry._physijs.type === 'heightfield')
          loadedMesh = new Physijs.HeightfieldMesh(geometry, material);

        this.fillObjectAttributes(loadedMesh._physijs, entry._physijs);
      }

      let stop = false;
      listLoadedObjectsUuid.forEach((object) => {
        if (object === loadedMesh.uuid) {
          stop = true;
        }
      });
      if (stop === false || listLoadedObjectsUuid.length === 0) {
        this._scene.add(loadedMesh);
      }
    });
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

const scenePlayer = new ScenePlayer();

scenePlayer.render = () => {
  scenePlayer._scene.simulate(); // run physics
  scenePlayer._renderer.clear();
  scenePlayer._effect.render(scenePlayer._scene, scenePlayer._camera);
  requestAnimationFrame(scenePlayer.render);
};

export default scenePlayer;