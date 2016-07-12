/**
 * Created by urvoy_p on 25/04/16.
 */

import Scene from './Scene';
import SceneUI from './Scene.ui';
import Loader from './Loader';

class Navigator {

  addBox() {
    let material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    let geometry = new THREE.BoxGeometry(200, 200, 200);
    let box      = new THREE.Mesh(geometry, material);

    box.mirroredLoop  = true;
    box.castShadow    = true;
    box.receiveShadow = true;
    this.setMesh(box, 'box');
    
    Scene.addObj(box);
    Scene.render();
  }

  addSphere() {
    let geometry = new THREE.SphereGeometry(50, 50, 320);
    let material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    let sphere   = new THREE.Mesh(geometry, material);

    sphere.mirroredLoop  = true;
    sphere.castShadow    = true;
    sphere.receiveShadow = true;
    this.setMesh(sphere, 'sphere');

    Scene.addObj(sphere);
    Scene.render();
  }

  addCylinder() {
    let geometry = new THREE.CylinderGeometry(50, 50, 200, 32);
    let material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    let cylinder = new THREE.Mesh(geometry, material);

    cylinder.mirroredLoop  = true;
    cylinder.castShadow    = true;
    cylinder.receiveShadow = true;
    this.setMesh(cylinder, 'cylinder');

    Scene.addObj(cylinder);
    Scene.render();
  }

  addLight() {
    let light = new THREE.PointLight(0xFFFFFF);

    light.userData.id = _.uniqueId();
    light.name        = 'pointLight_' + light.userData.id;

    light.position.set(1, 1, 1);
    this.addPicker(light);
    Scene.render();
  }

  addSpotLight() {
    let spotLight = new THREE.SpotLight(0xffffff);

    spotLight.userData.id           = _.uniqueId();
    spotLight.name                  = 'spotLight_' + spotLight.userData.id;
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

    directionalLight.userData.id = _.uniqueId();
    directionalLight.name        = 'directionalLight_' + directionalLight.userData.id;

    directionalLight.position.set(0, 1, 0);
    this.addPicker(directionalLight);
    Scene.render();
  }

  addAmbientLight() {
    let ambientLight = new THREE.AmbientLight(0x404040);

    ambientLight.userData.id = _.uniqueId();
    ambientLight.name        = 'ambientLight_' + ambientLight.userData.id;

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
    this.setMesh(picker, 'picker');

    SceneUI.addLightHelper(light);
    picker.add(light);
    Scene.addObj(picker);
  }

  addExternal(explorerEvent) {
    let file = explorerEvent.target.files[0];

    Loader.loadFile(file);
  }

  setMesh(mesh, type) {
    mesh.objType     = type;
    mesh.userData.id = _.uniqueId();
    mesh.name        = type + '_' + mesh.userData.id;
  }
}

export default new Navigator();