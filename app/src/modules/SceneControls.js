/**
 * Created by vincent on 22/05/16.
 */

import Scene from './Scene';
import PropPanelUI from './PropPanel.ui';

class SceneControls {
  constructor() {
    this.sceneView = $('#mainView');
    this.mouse     = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.closest   = null;
    this.addTransformControl();
  }

  /**
   * Create and add 'transformControl" object to 'sceneHelper' scene.
   * Served to update object position/rotation/scale.
   */
  addTransformControl() {
    this.transformControl = new THREE.TransformControls(Scene._camera,
      Scene._renderer.domElement);
    this.transformControl.addEventListener('change', () => Scene.render());
    Scene._sceneHelpers.add(this.transformControl);
  }

  /**
   * Scene events : click detection
   */
  events() {
    let activeUpdate = false;

    this.sceneView.mousedown(() => {
      activeUpdate = false;
    });

    this.sceneView.mousemove(() => {
      activeUpdate = true;
    });

    this.sceneView.mouseup(event => {
      let click = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight
      };

      this.closest = this.getClosestObject(click, Scene._scene.children, true);
      if (this.closest !== null) {
        this.transformControl.attach(this.closest);
        PropPanelUI.loadObjectInfo(this.closest);
      }
      else if (activeUpdate === false)
        this.transformControl.detach();

      activeUpdate = false;
      Scene.render();
    });
  }

  /**
   * Calculate and returns objects from a user click.
   *
   * @param click Clicked user positions
   * @param objects Active user scene
   * @param recursive Recursive mode (true/false)
   * @returns {objects[]} All intersected objects
   */
  getIntersectObjects(click, objects, recursive) {
    this.mouse.x = (click.x * 2) - 1;
    this.mouse.y = -(click.y * 2) + 1;
    this.raycaster.setFromCamera(this.mouse, Scene._camera);
    return this.raycaster.intersectObjects(objects, recursive);
  }

  /**
   * Calculate and returns the closest objects from a user click.
   *
   * @param point Clicked user positions
   * @param objects Active user scene
   * @param recursive Recursive mode (true/false)
   * @returns {object} Closest object
   */
  getClosestObject(point, objects, recursive) {
    let intersects = this.getIntersectObjects(point, objects, recursive);
    if (intersects.length > 0)
      return intersects[0].object;
    return null;
  }
}

export default new SceneControls();