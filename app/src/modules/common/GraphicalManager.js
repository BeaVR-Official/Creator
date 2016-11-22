import Constants from '../creator/Constants';
import ProjectManager from './ProjectManager';

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
    this.editorMod        = true; // false for runnerMod
    this.scene            = undefined;
    this.currentSceneUuid = undefined;
    this.lastSceneUuid    = undefined;
    this.mouse            = new THREE.Vector2();
  }

  setCurrentSceneUuid(sceneUuid) {
    this.currentSceneUuid = sceneUuid;
    if (this.isSceneChanges()) {
      // Launch SceneFactory
      this._sceneFactory();
    }
  }

  isSceneChanges() {
    return (this.currentSceneUuid !== this.lastSceneUuid);
  }

  getCurrentSceneUuid() {
    return this.currentSceneUuid;
  }

  setlastSceneUuid(sceneUuid) {
    this.lastSceneUuid = sceneUuid;
  }

  getLastSceneUuid() {
    return this.lastSceneUuid;
  }

  setMouse(mouse) {
    this.mouse.set(mouse.x, mouse.y);

    //TODO obj intersection calc
    console.log("mouse", this.mouse);
  }

  /**
   * Adapt scene renderer to canvas
   * TODO: getCanvasWidth & height by EventManager(no more canvasSettings in Constants)
   * @private
   */
  _adaptToWindow() {
    let parentWidth  = $(window).width() - Constants.getCanvasSettings().width;
    let parentHeight = $(window).height();

    this.camera.aspect = parentWidth / parentHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(parentWidth, parentHeight);
    this.render();
  }

  _sceneFactory() {
    this._createScene();
    this._adaptToWindow();

    let sceneDesc   = ProjectManager.getSceneDescriptor(this.currentSceneUuid);
    let allObjDescs = sceneDesc.getAllObjectDescriptors();

    _.map(allObjDescs, function (objDesc) {
      this._objectFactory(objDesc);

    });
    // this.render();
  }

  _objectFactory(objectDescriptor) {
    let obj = this._createMesh(objectDescriptor);

    obj.name = objectDescriptor.uuid;

    this.scene.add(obj);
    this.render();
  }

  /**
   * Create different kind of scene
   * @private
   */
  _createScene() {
    if (this.editorMod) {
      this.scene = new THREE.Scene();
      // TODO variable Grid params
      let grid   = new THREE.GridHelper(500, 50);

      this.scene.add(grid);
    } else
      this.scene = new Physijs.Scene();
  }

  _createMesh(objectDescriptor) {
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

  render() {
    this.renderer.clear();
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
    this.setlastSceneUuid(this.currentSceneUuid);
  }


  // ////////////////////////
  // TreeView events
  // ////////////////////////

  removeObject(objectDescriptor) {
    this.scene.remove(
      this.scene.getObjectById(objectDescriptor.uuid)
    );
  }

  switchScene(sceneUuid) {

  }

  // ////////////////////////
  // Add Things events
  // ////////////////////////

  addObject(objectUuid) {
    let sceneDescriptor  = ProjectManager.getSceneDescriptor(this.currentSceneUuid);
    let objectDescriptor = sceneDescriptor.getObjectDescriptor(objectUuid);

    this._objectFactory(objectDescriptor);
  }

  // TODO
  addLight() {
  }

  // TODO
  addExternalObject() {
  }

  // TODO
  addSky() {
  }

  // TODO
  addGround() {
  }

  // ////////////////////////
  // Object Property events
  // ////////////////////////

  updateObjectPosition(OD, position) {
    this.scene.getObjectById(OD.uuid, true).position = position;
  }

  updateObjectRotation(OD, rotation) {
    this.scene.getObjectById(OD.uuid, true).rotation = rotation
  }

  updateObjectScale(OD, scale) {
    this.scene.getObjectById(OD.uuid, true).scale = scale;
  }

  updateObjectColor(OD, color) {
    this.scene.getObjectById(OD.uuid).color = color;
  }

  updateObjectVisibility(OD, isVisibility) {
    this.scene.getObjectById(OD.uuid, true).visible = isVisibility;
  }

  // TODO
  updateObjectMaterial(OD, materialUuid) {
  }

  //TODO
  updateObjectGeometry(OD, geometryUuid) {
  }
}

export default new GraphicalManager();