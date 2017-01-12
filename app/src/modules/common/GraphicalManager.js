import Constants from '../creator/Constants';
import ProjectManager from './ProjectManager';
import EventManager from './EventManager';

Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo   = 'ammo.js';

class GraphicalManager {

  // In editor mod by default
  constructor() {
    // GraphicalManager attributes
    this.editorMod         = true; // false for runnerMod
    this.threeScene        = undefined;
    this.currentSceneUuid  = undefined;
    this.lastSceneUuid     = undefined;
    this.mouse             = new THREE.Vector2();
    this.raycaster         = new THREE.Raycaster(); // For object detection by clicking
    this.transformControls = undefined;
    // this.updatingTrans     = false;
    this.selectedObject    = undefined;

    this._initViewPort('#SceneSelector');
    this._initControls();
  }

// ////////////////////////
// ThreeJS settings/initialisation & render methods
// ////////////////////////
  /**
   * Adapt scene renderer to canvas
   * TODO: getCanvasWidth & height by EventManager(no more canvasSettings in Constants)
   * @private
   */
  _adaptToWindow() {
    let parentWidth  = $(window).width();
    let parentHeight = $(window).height() + $(".TopBarSelector").height();

    this.camera.aspect = parentWidth / parentHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(parentWidth, parentHeight);
    this.render();
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

  _initControls() {
    // Orbit control enable for Runner ?
    // Actually enable for editor & runner
    this.orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.addEventListener('change', () => {
      this.render()
    });

    if (this.editorMod) {
      this.transformControls = new THREE.TransformControls(this.camera, this.renderer.domElement);

      this.transformControls.addEventListener('change', () => {
        if (this.selectedObject !== undefined) {
          let objectUuid = this.selectedObject.name;
          let sceneUuid  = this.currentSceneUuid;

          ProjectManager.setObjectPosition(sceneUuid, objectUuid, this.selectedObject.position);
          ProjectManager.setObjectRotation(sceneUuid, objectUuid, this.selectedObject.rotation);
          ProjectManager.setObjectScale(sceneUuid, objectUuid, this.selectedObject.scale);
        }
        // Send event when updating and not redo click selection
        this.render()
      });
      // this.transformControls.addEventListener('mouseDown',() => {
      //   this.orbitControls.enabled = false;
      //   this.updatingTrans = true;
      //   console.log("UPDATING");
      // });
      // this.transformControls.addEventListener('mouseUp', () => {
      //   this.orbitControls.enabled = true;
      //   this.updatingTrans = false;
      //   console.log("STOP UPDATING");
      // });
    }
  }

  render() {
    this.renderer.clear();
    this.camera.lookAt(this.threeScene.position);
    this.renderer.render(this.threeScene, this.camera);
    if (this.editorMod)
      this.renderer.render(this.helperScene, this.camera);
    this.setlastSceneUuid(this.currentSceneUuid);

    //console.log("Scenes", ProjectManager.getAllSceneDescriptors());
    // requestAnimationFrame(this.render);
  }

// ////////////////////////
// GM Setter/getter
// ////////////////////////

  setCurrentSceneUuid(sceneUuid) {
    this.currentSceneUuid = sceneUuid;
    if (this.isSceneChanges()) {
      console.log("Set scene uuid", this.currentSceneUuid);

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

  // setMouseMoving(moving) {
  //   this.mouseMoving = moving;
  // }

  getSelectedObject() {
    return this.selectedObject;
  }

// ////////////////////////
// Scene factory
// ////////////////////////
  _sceneFactory() {
    this._createScene();

    let sceneDesc   = ProjectManager.getSceneDescriptor(this.currentSceneUuid);
    let allObjDescs = sceneDesc.getAllObjectDescriptors();

    let that = this;

    _.map(allObjDescs, function (objDesc) {
      that._objectFactory(objDesc);

    });
    this.render();
  }

  /**
   * Create different kind of scene
   * @private
   */
  _createScene() {
    $(window).resize(() => this._adaptToWindow());

    if (this.editorMod) {
      this.threeScene  = new THREE.Scene();
      this.helperScene = new THREE.Scene();
      // TODO variable Grid params
      let grid         = new THREE.GridHelper(500, 50);

      this.helperScene.add(grid);
      this.helperScene.add(this.transformControls);
    } else
      this.threeScene = new Physijs.Scene();
  }


// ////////////////////////
// Object factory
// ////////////////////////
  _objectFactory(objectDescriptor) {
    let objectType = objectDescriptor.getType();
    let obj;
    // trier les lumières des objets standards
    if (objectType === 'ambient' || objectType === 'directional' || objectType === 'point' || objectType === 'spot') {
      obj = this._createLight(objectDescriptor);
    } else {
      obj = this._createMesh(objectDescriptor);
    }

    obj.name = objectDescriptor.getUuid();

    this.threeScene.add(obj);
    this.render();
    return obj.name;
  }

  _createLight() {
  }

  _createMesh(objectDescriptor) {
    // TODO handle data material into obj desc
    let material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    let geometry = undefined;
    let mesh     = undefined;

    if (objectDescriptor.getType() === "sky")
      mesh = this._addSky(objectDescriptor);
    if (objectDescriptor.getType() === "ground")
      mesh = this._addGround(objectDescriptor);
    if (objectDescriptor.getType() === "box")
      geometry = new THREE.BoxGeometry(200, 200, 200);
    if (objectDescriptor.getType() === "sphere")
      geometry = new THREE.SphereGeometry(50, 50, 320);
    if (objectDescriptor.getType() === "cylinder")
      geometry = new THREE.CylinderGeometry(50, 50, 200, 32);

    // TODO see how to do for lights/lightsHelper/externalObj

    // Peut être load en amont
    // TODO @damien si externalObjBddId load obj API (+ PUIS applique puis etre pas dans cette method)
    // TODO @damien si textureBddId load obj API (+ PUIS @vincent vas gérer);
    e

    if (!mesh) {
      mesh               = new THREE.Mesh(geometry, material); //new THREE.Mesh when editor mode !== with physijs
      mesh.mirroredLoop  = true;
      mesh.castShadow    = true;
      mesh.receiveShadow = true;
    }

    // @damien set Transformation avec Tree
    if (objectDescriptor.getType() != "sky" && objectDescriptor.getType() != "ground") {
      mesh.updateMatrix();
      mesh.geometry.applyMatrix( mesh.matrix );
      //If you have previously rendered, you will have to set the needsUpdate flag:
      // mesh.geometry.verticesNeedUpdate = true;
      mesh.position.set( objectDescriptor.getPosition().x, objectDescriptor.getPosition().y, objectDescriptor.getPosition().z );
      mesh.rotation.set( objectDescriptor.getRotation().x, objectDescriptor.getRotation().y, objectDescriptor.getRotation().z );
      mesh.scale.set( objectDescriptor.getScale().x, objectDescriptor.getScale().y, objectDescriptor.getScale().z )
    }

    return mesh;
  }

  _addGround(objectDescriptor) {
    let geometry = new THREE.PlaneGeometry(1000, 1000);
    let grassTex = new THREE.TextureLoader().load(objectDescriptor.getTextureBddId());

    grassTex.wrapS    = THREE.RepeatWrapping;
    grassTex.wrapT    = THREE.RepeatWrapping;
    grassTex.repeat.x = 10;
    grassTex.repeat.y = 10;

    let material = new THREE.MeshBasicMaterial({map: grassTex});

    let ground         = new THREE.Mesh(geometry, material);
    ground.position.y  = 0;
    ground.rotation.x  = -Math.PI / 2;
    ground.doubleSided = true;

    return ground;
  }

  _addSky(objectDescriptor) {
    let geometry      = new THREE.CubeGeometry(5000, 5000, 5000);
    let faces         = ['west', 'east', 'up', 'down', 'south', 'north'];
    let materialArray = [];

    faces.forEach(face => {
      materialArray.push(new THREE.MeshBasicMaterial({
        map:  THREE.ImageUtils.loadTexture(objectDescriptor.getTextureBddId() + face + ".png"),
        side: THREE.BackSide
      }));
    });

    let skyMaterial = new THREE.MeshFaceMaterial(materialArray);

    return new THREE.Mesh(geometry, skyMaterial);
  }

  addExternalObject(objectUuid, path) {
    let sceneDescriptor  = ProjectManager.getSceneDescriptor(this.currentSceneUuid);
    let objectDescriptor = sceneDescriptor.getObjectDescriptor(objectUuid);
    var that             = this;
    var objLoader        = new THREE.OBJLoader();
    var material         = new THREE.MeshBasicMaterial({color: 'grey', side: THREE.DoubleSide});
    objLoader.load(path, function (obj) {
      obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });
      for (var i = 0; i < obj.children.length; ++i) {
        obj.children[i].name = objectDescriptor.getUuid();
      }
      that.threeScene.add(obj);
      that.render();
    });
    return objectDescriptor.getUuid();
  }


// ////////////////////////
// Add Things events
// ////////////////////////

  addObject(objectUuid) {
    let sceneDescriptor  = ProjectManager.getSceneDescriptor(this.currentSceneUuid);
    let objectDescriptor = sceneDescriptor.getObjectDescriptor(objectUuid);

    console.log("----Add object GM----");
    console.log("Scene desc", sceneDescriptor);
    console.log("Obj Desc", objectDescriptor);
    console.log("---------------------");

    return this._objectFactory(objectDescriptor);
  }

// TODO cette méthode doit s'effectuer dans _createMesh() -> @damien





// ////////////////////////
// Click methods
// ////////////////////////
  _raycastingSelection() {
    let data = {
      deselectedObjDesc: (this.selectedObject) ? ProjectManager.getObjectDescriptor(this.currentSceneUuid, this.selectedObject.name) : undefined,
      selectedObjDesc: undefined
    };
    EventManager.emitEvent('GM.objectDeselected', data);
    this.deselectObject();

    let closestObject = this._getClosestObject(); // objDesc uuid into name
    if (closestObject !== undefined) {
      this.selectObject(closestObject.name);
      data.selectedObjDesc = ProjectManager.getObjectDescriptor(this.currentSceneUuid, closestObject.name)
      EventManager.emitEvent('GM.objectSelected', data);
    }
  }

  _getClosestObject() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.raycaster.intersectObjects(this.threeScene.children, true);

    if (intersects.length > 0)
      return intersects[0].object;
    return undefined;
  }

  selectObject(objectUuid) {
    let object = this.threeScene.getObjectByName(objectUuid);

    this.selectedObject = object;
    this.attachToTransform(object);
  }

  deselectObject() {
    if (this.selectedObject !== undefined) {
      this.selectedObject = undefined;
      this.transformControls.detach();
      this.render();
    }
  }

// ////////////////////////
// TransformControls
// ////////////////////////
  /**
   * Set mode of transformControl
   * @param mode -> have to be a string translate || rotate || scale
   */
  setTransformControlMode(mode) {
    if (this.transformControls !== undefined &&
      (mode === "translate" || mode === "rotate" || mode === "scale")) {
      this.transformControls.setMode(mode);
      this.render();
    }
  }

  attachToTransform(object) {
    if (object) {
      this.selectedObject = object;
      this.transformControls.attach(object);
      this.render();
    }
  }



// ////////////////////////
// Not used yet
// ////////////////////////

  removeObject(objectDescriptor) {
    this.threeScene.remove(
      this.threeScene.getObjectById(objectDescriptor.uuid)
    );
  }

  switchScene(sceneUuid) {

  }

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