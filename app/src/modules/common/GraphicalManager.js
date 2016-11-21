import Constants from '../creator/Constants';
import ProjectManager from './ProjectManager';

// TODO: Events on

Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo   = 'ammo.js';

class GraphicalManager {

  constructor() {
    // Init SceneView renderer
    let sceneSettings       = Constants.getSceneSettings();
    this.renderer           = new THREE.WebGLRenderer({antialias: true});
    this.renderer.autoClear = false;
    this.renderer.setClearColor(sceneSettings.backgroundColor, 1);
    this.renderer.setSize(sceneSettings.width, sceneSettings.height);
    $('#mainView').append(this.renderer.domElement);

    // Init SceneView camera
    let camSettings = Constants.getCamSettings();
    this.camera     = new THREE.PerspectiveCamera(
      camSettings.fov,
      camSettings.aspect,
      camSettings.near,
      camSettings.far);
    this.camera.position.set(
      camSettings.posX,
      camSettings.posY,
      camSettings.posZ);

    // GraphicalManager attributes
    this.graphicalScenes   = [];
    this.lastRenderedScene = undefined;
    this.currentSceneUuid  = undefined;
    this.mouse             = new THREE.Vector2();

    // ProjectManager events
    // this.events();
  }

  setLastRenderedScene(sceneUuid) {
    this.lastRenderedScene = sceneUuid;
  }

  setMouse(mouse) {
    this.mouse.set(mouse.x, mouse.y);

    //TODO obj intersection calc
    console.log("mouse", this.mouse);
  }

  getLastRenderedScene() {
    return this.lastRenderedScene;
  }

  /**
   * Adapter scene renderer when window is resizing.
   */
  adaptToWindow() {
    let parentWidth  = $(window).width() - Constants.getCanvasSettings().width;
    let parentHeight = $(window).height();

    this.camera.aspect = parentWidth / parentHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(parentWidth, parentHeight);
  }

  /**
   * Get graphicalScene by uuid of sceneDescriptor
   * @param idSceneDescriptor
   * @returns {*}
   */
  getGraphicalScene(idSceneDescriptor) {
    for (let index = 0; index < this.graphicalScenes.length; index++) {
      let graphicalScene = this.graphicalScenes[index];
      if (graphicalScene.uuid === idSceneDescriptor)
        return graphicalScene;
    }
    return undefined;
  }

  addScene(uuidSceneDescriptor) {
    let graphicalScene = {
      uuid:       uuidSceneDescriptor,
      scenePhysi: new Physijs.Scene()
    };
    this.graphicalScenes.push(graphicalScene);
    this.render(uuidSceneDescriptor);
  }

  addObject(sceneUuid, objectUuid) {
    let scenePhysi       = this.getGraphicalScene(sceneUuid).scenePhysi;
    let sceneDescriptor  = ProjectManager.getSceneDescriptor(sceneUuid);
    let objectDescriptor = sceneDescriptor.getObjectDescriptor(objectUuid);
    let newObject        = this.createMesh(objectDescriptor);

    scenePhysi.add(newObject);
    console.log("newObject", newObject);
    this.render(sceneUuid);
  }

  removeObject(sceneDescriptor, objectDescriptor) {

  }

  changeScene(sceneUuid) {

  }

  createMesh(objectDescriptor) {
    // TODO handle data material into obj desc
    let material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    console.log("material!!!!!", material);

    let geometry = undefined;
    if (objectDescriptor.type === "sky")
      geometry = new THREE.CubeGeometry(5000, 5000, 5000);
    if (objectDescriptor.type === "ground")
      geometry = new THREE.PlaneGeometry(1000, 1000);
    if (objectDescriptor.type === "box")
      geometry = new THREE.BoxGeometry(200, 200, 200);
    if (objectDescriptor.type === "sphere")
      geometry = new THREE.SphereGeometry(50, 50, 320);
    if (objectDescriptor.type === "cylinder")
      geometry = new THREE.CylinderGeometry(50, 50, 200, 32);
    // TODO see how to do for lights/lightsHelper/externalObj

    let mesh           = new Physijs.BoxMesh(geometry, material);
    mesh.mirroredLoop  = true;
    mesh.castShadow    = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  /**
   * Render the sceneDescriptor send
   * @param idSceneDescriptor
   */
  render(idSceneDescriptor) {
    // TODO:Check if necessary
    // window.scene = scene;

    let scenePhysiJS = this.getGraphicalScene(idSceneDescriptor).scenePhysi;
    console.log("Scene", scenePhysiJS);

    // Resize
    this.adaptToWindow();
    // Render
    this.renderer.clear();
    this.camera.lookAt(scenePhysiJS.position);
    this.renderer.render(scenePhysiJS, this.camera);
    this.setLastRenderedScene(idSceneDescriptor);
  }
}

export default new GraphicalManager();