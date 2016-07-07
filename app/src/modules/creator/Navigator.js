/**
 * Created by urvoy_p on 25/04/16.
 */

import Scene from './Scene';
import SceneUI from './Scene.ui.js';
import CustomObject from './CustomObject';
//import Example from './sugarmaple/Example';

class Navigator {
  addBox() {

    let material = new THREE.MeshLambertMaterial({color: 0xFF0000});
    let geometry = new THREE.BoxGeometry(200, 200, 200);
    let box      = new CustomObject(geometry, material, 'box');

    box.userData.id   = _.uniqueId();
    box.name          = 'box_' + box.userData.id;
    box.mirroredLoop  = true;
    box.castShadow    = true;
    box.receiveShadow = true;

    // Object.assign(CustomObject.prototype, THREE.EventDispatcher.prototype );
    // box.addEventListener('add', function (event ) {
    //  console.log(event.message);
    // } );
    // box.addToScene(Scene._scene);

    Scene.addObj(box);
    console.log(Scene._objList);
    Scene.render();
  }

  addSphere() {
    let geometry = new THREE.SphereGeometry(50, 50, 320);
    let material = new THREE.MeshLambertMaterial({color: 0xFF0000});
    let sphere   = new CustomObject(geometry, material, 'sphere');

    sphere.userData.id   = _.uniqueId();
    sphere.name          = 'sphere_' + sphere.userData.id;
    sphere.mirroredLoop  = true;
    sphere.castShadow    = true;
    sphere.receiveShadow = true;

    Scene.addObj(sphere);
    Scene.render();
  }

  addCylinder() {
    let geometry = new THREE.CylinderGeometry(50, 50, 200, 32);
    let material = new THREE.MeshLambertMaterial({color: 0xFF0000});
    let cylinder = new CustomObject(geometry, material, 'cylinder');

    cylinder.userData.id   = _.uniqueId();
    cylinder.name          = 'cylinder_' + cylinder.userData.id;
    cylinder.mirroredLoop  = true;
    cylinder.castShadow    = true;
    cylinder.receiveShadow = true;

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
    let picker   = new CustomObject(geometry, material, 'picker');

    SceneUI.addLightHelper(light);
    picker.add(light);
    Scene.addObj(picker);
  }

  addExternal() {
    let loader = new THREE.JSONLoader();
    loader.load('models/horse.js', (geometry, material) => {
      let importedObj = new CustomObject(geometry, new THREE.MeshFaceMaterial(material), 'ObjectJs');

      importedObj.scale.set(1, 1, 1);
      importedObj.position.set(0, 0, 0);

      Scene.addObj(importedObj);
      Scene.render();
    });
  }
}

export default new Navigator();