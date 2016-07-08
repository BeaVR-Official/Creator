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

      // Child hierarchy test
      // if (this._closestObj.objType === 'sphere') {
      //   let material = new THREE.MeshLambertMaterial({color: 0xFF0000});
      //   let geometry = new THREE.BoxGeometry(200, 200, 200);
      //   let box      = new THREE.Mesh(geometry, material);
      //
      //   box.mirroredLoop  = true;
      //   box.castShadow    = true;
      //   box.receiveShadow = true;
      //   box.objType     = 'box';
      //   box.userData.id = _.uniqueId();
      //   box.name        = 'box' + '_' + box.userData.id;
      //
      //   ScenesPanel.addObjectNode(box);
      //   this._closestObj.add(box);
      //   Scene._objList.push(box);
      // }
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
        if (object === intersects[0].object) {
          return object;
        }
      });
    }
    return undefined;
  }
}