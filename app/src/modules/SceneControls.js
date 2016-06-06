/**
 * Created by vincent on 22/05/16.
 */

import Scene from './Scene';
import PropPanelUI from './PropPanel.ui';

export default class SceneControls {
  constructor(transformControls) {
    this.sceneView = $('#mainView');
    this.mouse     = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.closeObj  = null;
    this.events(transformControls);
  }

  /**
   * Scene events : click detection
   */
  events(transformControls) {
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

      this.closeObj = this.getClosestObject(click, Scene._scene.children, true);
      if (this.closeObj !== undefined) {
        PropPanelUI.loadObjectInfo(this.closeObj);
        transformControls.attach(this.closeObj.mesh);
      }
      else if (activeUpdate === false) {
        transformControls.detach();
        PropPanelUI.unselectObject();
      }
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
    if (intersects.length > 0) {
      return Scene.objList.find(object => {
        if (object.mesh === intersects[0].object) {
          return object;
        }
      });
    }
    return undefined;
  }
}
