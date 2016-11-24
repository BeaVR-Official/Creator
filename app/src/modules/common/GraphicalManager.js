import Constants from '../creator/Constants';
import ProjectManager from './ProjectManager';
import EventManager from './EventManager';

Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo   = 'ammo.js';

class GraphicalManager {

  constructor() {
    this._initViewPort('#SceneSelector');
    this._initControls();

    // GraphicalManager attributes
    this.editorMod        = true; // false for runnerMod
    this.threeScene       = undefined;
    this.currentSceneUuid = undefined;
    this.lastSceneUuid    = undefined;
    this.mouse            = new THREE.Vector2();
    this.raycaster        = new THREE.Raycaster(); // For object detection by clicking
  }

  _initViewPort(htmlAnchor) {
    // Init SceneView renderer
    let sceneSettings       = Constants.getSceneSettings();
    this.renderer           = new THREE.WebGLRenderer({antialias: true});
    this.renderer.autoClear = false;
    this.renderer.setClearColor(sceneSettings.backgroundColor, 1);
    this.renderer.setSize(sceneSettings.width, sceneSettings.height);
    $(htmlAnchor).append(this.renderer.domElement);

    // Camera settings
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
    this._raycastingSelection();
  }

  /**
   * Adapt scene renderer to canvas
   * TODO: getCanvasWidth & height by EventManager(no more canvasSettings in Constants)
   * @private
   */
  _adaptToWindow() {
    let parentWidth  = Constants.getCanvasSettings().width;
    let parentHeight = Constants.getCanvasSettings().height;

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

    obj.name = objectDescriptor.getUuid();

    this.threeScene.add(obj);
    this.render();
  }

  /**
   * Create different kind of scene
   * @private
   */
  _createScene() {
    if (this.editorMod) {
      this.threeScene = new THREE.Scene();
      // TODO variable Grid params
      let grid        = new THREE.GridHelper(500, 50);

      this.threeScene.add(grid);
    } else
      this.threeScene = new Physijs.Scene();
  }

  _createMesh(objectDescriptor) {
    // TODO handle data material into obj desc
    let material = new THREE.MeshPhongMaterial({color: 0xFF0000});

    let geometry = undefined;
    if (objectDescriptor.getType() === "sky")
      geometry = new THREE.CubeGeometry(5000, 5000, 5000);
    if (objectDescriptor.getType() === "ground")
      geometry = new THREE.PlaneGeometry(1000, 1000);
    if (objectDescriptor.getType() === "box")
      geometry = new THREE.BoxGeometry(200, 200, 200);
    if (objectDescriptor.getType() === "sphere")
      geometry = new THREE.SphereGeometry(50, 50, 320);
    if (objectDescriptor.getType() === "cylinder")
      geometry = new THREE.CylinderGeometry(50, 50, 200, 32);
    // TODO see how to do for lights/lightsHelper/externalObj

    let mesh           = new THREE.Mesh(geometry, material);
    mesh.mirroredLoop  = true;
    mesh.castShadow    = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  _initControls() {
    this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);


    this.orbitControl.addEventListener('change', () => {
      this.render()
    });
  }

  _raycastingSelection() {
    let closestObject = this._getClosestObject(); // objDesc uuid into name
    console.log("Selected object: ", closestObject);

    EventManager.emitEvent('objectSelected', {objectUuid: closestObject.name});
  }

  _getClosestObject() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.raycaster.intersectObjects(this.threeScene.children, true);

    if (intersects.length > 0)
      return intersects[0].object;
    return false;
  }

  render() {
    this.renderer.clear();
    this.camera.lookAt(this.threeScene.position);
    this.renderer.render(this.threeScene, this.camera);
    this.setlastSceneUuid(this.currentSceneUuid);
  }

  // ////////////////////////
  // TreeView events
  // ////////////////////////

  removeObject(objectDescriptor) {
    this.threeScene.remove(
      this.threeScene.getObjectById(objectDescriptor.uuid)
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
    this.threeScene.getObjectById(OD.uuid, true).position = position;
  }

  updateObjectRotation(OD, rotation) {
    this.threeScene.getObjectById(OD.uuid, true).rotation = rotation
  }

  updateObjectScale(OD, scale) {
    this.threeScene.getObjectById(OD.uuid, true).scale = scale;
  }

  updateObjectColor(OD, color) {
    this.threeScene.getObjectById(OD.uuid).color = color;
  }

  updateObjectVisibility(OD, isVisibility) {
    this.threeScene.getObjectById(OD.uuid, true).visible = isVisibility;
  }

  // TODO
  updateObjectMaterial(OD, materialUuid) {
  }

  //TODO
  updateObjectGeometry(OD, geometryUuid) {
  }
}

export default new GraphicalManager();