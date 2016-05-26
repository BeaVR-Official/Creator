/**
 * Created by urvoy_p on 25/04/16.
 */

import Scene from './Scene';
import SceneUI from './Scene.ui.js';

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

    Scene._scene.add(mesh);
    Scene.render();
  }

  addSphere() {
    let geometry = new THREE.SphereGeometry(50, 50, 320);
    let material = new THREE.MeshBasicMaterial({color: 0xffff00});
    let sphere   = new THREE.Mesh(geometry, material);

    sphere.userData.id   = _.uniqueId();
    sphere.name          = 'sphere_' + sphere.userData.id;
    sphere.mirroredLoop  = true;
    sphere.castShadow    = true;
    sphere.receiveShadow = true;
    sphere.objType       = 'sphere';

    Scene._scene.add(sphere);
    Scene.render();
  }

  addCylinder() {
    let geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
    let material = new THREE.MeshBasicMaterial({color: 0xffff00});
    let cylinder = new THREE.Mesh(geometry, material);

    cylinder.userData.id   = _.uniqueId();
    cylinder.name          = 'cylinder_' + cylinder.userData.id;
    cylinder.mirroredLoop  = true;
    cylinder.castShadow    = true;
    cylinder.receiveShadow = true;
    cylinder.objType       = 'cylinder';

    Scene._scene.add(cylinder);
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
}

export default new Navigator();