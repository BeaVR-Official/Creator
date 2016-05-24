/**
 * Created by vincent on 22/05/16.
 */

import Scene from './Scene';

class SceneControls {
  constructor() {
    this.sceneView        = $('#mainView');
    this.transformControl = new THREE.TransformControls(Scene._camera, Scene._renderer.domElement);
    this.orbitControl     = new THREE.OrbitControls(Scene._camera,  Scene._renderer.domElement);
    this.mouse            = new THREE.Vector2();
    this.raycaster        = new THREE.Raycaster();
    this.closest          = 'undefined';


    this.light = new THREE.PointLight(0xFFFFFF);
    this.light.position.set(1, 1, 1);
    this.light.name = 'light';

    this.helper = new THREE.PointLightHelper(this.light, 50);

    Scene._scene.add(this.light);
    Scene._scene.add(this.helper);

    this.transformControl.addEventListener('change', () => this.render());
    this.orbitControl.addEventListener('change', () => this.render());
    Scene._scene.add(this.transformControl);
    this.render();
  }

  events() {

    //this.sceneView.mousedown(event => {
    //  this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //  this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //
    //  this.transformControl.enable = false;
    //
    //});
    //
    //this.sceneView.mouseup(event => {
    //  if ((this.mouse.x === ((event.clientX / window.innerWidth) * 2 - 1) &&
    //    this.mouse.y === -(event.clientY / window.innerHeight) * 2 + 1)) {
    //
    //    let intersects = this.raycaster.intersectObjects(Scene._scene.children);
    //    if (intersects.length !== 0) {
    //      this.closest = intersects[0].object;
    //      if (this.closest instanceof THREE.PointLightHelper) {
    //        console.log(this.closest.light);
    //        //this.transformControl.attach(Scene._scene.getObjectByName('light'));
    //        this.transformControl.attach(this.closest.light);
    //      } else
    //        this.transformControl.attach(this.closest);
    //
    //    } else
    //      this.transformControl.detach();
    //
    //  }
    //});
    this.sceneView.click(event => {

      this.mouse = {
        x: 2 * ( event.clientX / window.innerWidth ) - 1,
        y: 1 - 2 * ( event.clientY / window.innerHeight )
      };

      this.raycaster.setFromCamera(this.mouse, Scene._camera);

      let intersects = this.raycaster.intersectObjects(Scene._scene.children);
      if (intersects.length !== 0) {
        this.closest = intersects[0].object;
        if (this.closest instanceof THREE.PointLightHelper) {
          this.transformControl.attach(this.closest.light);
        } else
          this.transformControl.attach(this.closest);
      } else
        this.transformControl.detach();
    });
  }

  render() {
    Scene.render();
  }
}

export default new SceneControls();