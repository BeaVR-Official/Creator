/**
 * Created by vincent on 22/05/16.
 */

import Scene from './Scene';
import PropPanelUI from './PropPanel.ui';

export default class SceneControls {
  constructor(transformControls) {
    this._raycaster     = new THREE.Raycaster();
    this._mouse         = new THREE.Vector2();
    this._sceneView     = $('#mainView');
    this._closestObj    = undefined;
    this._mouseIsMoving = false;
    this.events(transformControls);
  }

  /**
   * Scene events : click detection
   */
  events(transformControls) {
    this._sceneView.mousedown(() => {
      this._mouseIsMoving = false;
    });

    this._sceneView.mousemove(() => {
      this._mouseIsMoving = true;
    });

    this._sceneView.mouseup(event => {
      this._mouse.x = (event.clientX / window.innerWidth * 2) - 1;
      this._mouse.y = -(event.clientY / window.innerHeight * 2) + 1;

      this._closestObj = this.getClosestObject(Scene._scene.children, true);
      console.log(this._closestObj);
      if (this._closestObj !== undefined) {
        PropPanelUI.loadObjectInfo(this._closestObj);
        transformControls.attach(this._closestObj.obj);
      } else if (this._mouseIsMoving === false) {
        transformControls.detach();
        PropPanelUI.unselectObject();
      }
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
  getIntersectObjects(objects, recursive) {
    this._raycaster.setFromCamera(this._mouse, Scene._camera);
    return this._raycaster.intersectObjects(objects, recursive);
  }

  /**
   * Calculate and returns the closest objects from a user click.
   *
   * @param point Clicked user positions
   * @param objects Active user scene
   * @param recursive Recursive mode (true/false)
   * @returns {object} Closest object
   */
  getClosestObject(objects, recursive) {
    let intersects = this.getIntersectObjects(objects, recursive);
    if (intersects.length > 0) {
      return Scene._objList.find(object => {
        if (object.obj === intersects[0].object) {
          console.log(object);
          return object;
        }
      });
    }
    return undefined;
  }
}
