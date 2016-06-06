/**
 * Created by urvoy_p on 25/04/16.
 */

import Scene from './Scene';
import SceneUI from './Scene.ui';
import ObjectManager from './ObjectManager';

class Navigator {
  addBox() {
    let material = new THREE.MeshLambertMaterial({color: 0xFF0000});
    let geometry = new THREE.BoxGeometry(200, 200, 200);
    let mesh     = new THREE.Mesh(geometry, material);

    mesh.userData.id   = _.uniqueId();
    mesh.name          = 'box_' + mesh.userData.id;
    mesh.mirroredLoop  = true;
    mesh.castShadow    = true;
    mesh.receiveShadow = true;
    mesh.objType       = 'box';

    Scene.objList.push(new ObjectManager(mesh, Scene._scene));
    Scene.render();
  }

  addSphere() {
    let geometry = new THREE.SphereGeometry(50, 50, 320);
    let material = new THREE.MeshLambertMaterial({color: 0xFF0000});
    let sphere   = new THREE.Mesh(geometry, material);

    sphere.userData.id   = _.uniqueId();
    sphere.name          = 'sphere_' + sphere.userData.id;
    sphere.mirroredLoop  = true;
    sphere.castShadow    = true;
    sphere.receiveShadow = true;
    sphere.objType       = 'sphere';

    Scene.objList.push(new ObjectManager(sphere, Scene._scene));
    Scene.render();
  }

  addCylinder() {
    let geometry = new THREE.CylinderGeometry(50, 50, 200, 32);
    let material = new THREE.MeshLambertMaterial({color: 0xFF0000});
    let cylinder = new THREE.Mesh(geometry, material);

    cylinder.userData.id   = _.uniqueId();
    cylinder.name          = 'cylinder_' + cylinder.userData.id;
    cylinder.mirroredLoop  = true;
    cylinder.castShadow    = true;
    cylinder.receiveShadow = true;
    cylinder.objType       = 'cylinder';

    Scene.objList.push(new ObjectManager(cylinder, Scene._scene));
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
    let light = new THREE.AmbientLight(0x404040);

    light.userData.id = _.uniqueId();
    light.name        = 'lightAmbient_' + light.userData.id;

    this.addPicker(light);
    Scene.render();
  }

  addPicker(light) {
    let materialPicker = {
      visible:   false,
      color:     0xff0000,  // Debugging display
      wireframe: true,      //
      fog:       false      //
    };

    let geometry = new THREE.SphereGeometry(50, 4, 2);
    let material = new THREE.MeshBasicMaterial(materialPicker);
    let picker   = new THREE.Mesh(geometry, material);

    picker.name = 'lightPicker';

    picker.add(light);
    Scene._scene.add(picker);
    SceneUI.addLightHelper(picker);
  }

  addExternal() {
    let loader = new THREE.JSONLoader();
    loader.load('models/horse.js', (geometry, material) => {
      let object = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(material));

      object.userData.id = _.uniqueId();
      object.name        = 'horse_' + object.userData.id;

      object.scale.set(1, 1, 1);
      object.position.set(0, 0, 0);
      Scene.objList.push(new ObjectManager(object, Scene._scene));
      Scene.render();
    });
  }
}

export default new Navigator();