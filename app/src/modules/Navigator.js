/**
 * Created by urvoy_p on 25/04/16.
 */

import Creator from './Scene';

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

    Creator._scene.add(mesh);
    Creator._renderer.render(Creator._scene, Creator._camera);
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

    Creator._scene.add(sphere);
    Creator._renderer.render(Creator._scene, Creator._camera);
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

    Creator._scene.add(cylinder);
    Creator._renderer.render(Creator._scene, Creator._camera);
  }

  addLight() {
    let light = new THREE.PointLight(0xFFFFFF);
    let helper = new THREE.PointLightHelper(light, 50);

    light.position.set(1, 1, 1);

    Creator._scene.add(light);
    helper.update();

    Creator._scene.add(helper);
    Creator._renderer.render(Creator._scene, Creator._camera);
  }
}

export default new Navigator();