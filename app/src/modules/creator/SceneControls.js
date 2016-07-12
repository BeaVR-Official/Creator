/**
 * Created by vincent on 22/05/16.
 */

import Scene from './Scene';
import * as PropPanelUI from './PropPanel.ui.js';

import ScenesPanel from './ScenesPanel.ui';

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
    window.addEventListener('keypress', this.doKeyPress, false);

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
      if (this._closestObj !== undefined) {
        PropPanelUI.default.loadObjectInfo(this._closestObj);
        transformControls.attach(this._closestObj);
      } else if (this._mouseIsMoving === false) {
        transformControls.detach();
        PropPanelUI.default.unselectObject();
      }
      Scene.render();
    });

    console.log(this._sceneView);
    this._sceneView.keypress(event => {
      alert(event.code);
    });

    this._sceneView.keydown(event => {
      alert(event.code);
    });

    // this._sceneView.addEventListener('keydown', this.doKeyDown, false);
  }

  doKeyPress(event) {
    switch (event.code) {
      case 'Delete':
        console.log('Delete key pressed!');
        break;
    }
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
        if (object === intersects[0].object) {
          return object;
        }
      });
    }
    return undefined;
  }
}
