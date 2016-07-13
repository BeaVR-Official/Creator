import Scene from './Scene';
import SceneUI from './Scene.ui';
import Loader from './Loader';
import CreatorManagement from './CreatorManagement';

class Navigator {

  addBox() {
    let material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    let geometry = new THREE.BoxGeometry(200, 200, 200);
    let box      = new THREE.Mesh(geometry, material);

    box.mirroredLoop  = true;
    box.castShadow    = true;
    box.receiveShadow = true;
    this.setMeshInfo(box, 'box');

    CreatorManagement.addObject(box);
    Scene.render();
  }

  addSphere() {
    let geometry = new THREE.SphereGeometry(50, 50, 320);
    let material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    let sphere   = new THREE.Mesh(geometry, material);

    sphere.mirroredLoop  = true;
    sphere.castShadow    = true;
    sphere.receiveShadow = true;
    this.setMeshInfo(sphere, 'sphere');

    CreatorManagement.addObject(sphere);
    Scene.render();
  }

  addCylinder() {
    let geometry = new THREE.CylinderGeometry(50, 50, 200, 32);
    let material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    let cylinder = new THREE.Mesh(geometry, material);

    cylinder.mirroredLoop  = true;
    cylinder.castShadow    = true;
    cylinder.receiveShadow = true;
    this.setMeshInfo(cylinder, 'cylinder');

    CreatorManagement.addObject(cylinder);
    Scene.render();
  }

  addLight() {
    let light = new THREE.PointLight(0xFFFFFF);

    this.setLightInfo(light, 'pointLight');
    light.position.set(1, 1, 1);
    this.addPicker(light);
    Scene.render();
  }

  addSpotLight() {
    let spotLight = new THREE.SpotLight(0xffffff);

    this.setLightInfo(spotLight, 'spotLight');

    spotLight.castShadow            = true;
    spotLight.shadow.mapSize.width  = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near    = 500;
    spotLight.shadow.camera.far     = 4000;
    spotLight.shadow.camera.fov     = 30;

    spotLight.position.set(100, 1000, 100);
    this.addPicker(spotLight);
    Scene.render();
  }

  addDirectionalLight() {
    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

    this.setLightInfo(directionalLight, 'directionalLight');

    directionalLight.position.set(0, 1, 0);
    this.addPicker(directionalLight);
    Scene.render();
  }

  addAmbientLight() {
    let ambientLight = new THREE.AmbientLight(0x404040);

    this.setLightInfo(ambientLight, 'ambientLight');

    this.addPicker(ambientLight);
    Scene.render();
  }

  addPicker(light) {
    let materialPicker = {
      visible:   false,
      color:     0xff0000,  // Debugging display:
      wireframe: true,      // Active with visible = true
      fog:       false      //
    };

    let geometry = new THREE.SphereGeometry(50, 4, 2);
    let material = new THREE.MeshBasicMaterial(materialPicker);
    let picker   = new THREE.Mesh(geometry, material);
    this.setMeshInfo(picker, 'picker');

    SceneUI.addLightHelper(light);
    picker.add(light);
    CreatorManagement.addObject(picker);
  }

  addExternal(explorerEvent) {
    let file = explorerEvent.target.files[0];

    Loader.loadFile(file);
  }

  setMeshInfo(mesh, type) {
    mesh.userData.objType = type;
    mesh.userData.id      = _.uniqueId();
    mesh.name             = type + '_' + mesh.userData.id;
  }

  setLightInfo(light, type) {
    light.userData.id      = _.uniqueId();
    light.userData.objType = type;
    light.name             = type + '_' + light.userData.id;
  }
}

export default new Navigator();