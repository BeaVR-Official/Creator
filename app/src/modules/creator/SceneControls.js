import Scene from './Scene';
import Constants from './Constants';
import CreatorManagement from './CreatorManagement';

class SceneControls {
  constructor() {
    this._raycaster     = new THREE.Raycaster();
    this._mouse         = new THREE.Vector2();
    this._sceneView     = $('#mainView');
    this._closestObj    = undefined;
    this._mouseIsMoving = false;

    this.clickEvents();
    this.keyboardEvents();
  }

  /**
   * Scene events : click detection
   */
  clickEvents() {
    this._sceneView.mousedown(() => {
      this._mouseIsMoving = false;
    });

    this._sceneView.mousemove(() => {
      this._mouseIsMoving = true;
    });

    this._sceneView.mouseup(event => {
      let x = event.clientX - Constants.getCanvasSettings().width;
      let y = event.clientY - Constants.getCanvasSettings().height;

      let windowWidth  = window.innerWidth - Constants.getCanvasSettings().width;
      let windowHeight = window.innerHeight - Constants.getCanvasSettings().height;

      this._mouse.x = (x / windowWidth * 2) - 1;
      this._mouse.y = -(y / windowHeight * 2) + 1;

      this._closestObj = this.getClosestObject(Scene._scene.children, true);
      if (this._closestObj !== undefined)
        CreatorManagement.objectSelection(this._closestObj);
      else if (this._mouseIsMoving === false)
        CreatorManagement.deselectObject();
      //Scene.render();
    });
  }

  keyboardEvents() {
    window.addEventListener('keypress', this.doKeyPress, false);
  }

  doKeyPress(event) {
    switch (event.code) {
      case 'Delete':
        CreatorManagement.removeSelectedObject();
        break;
      default:
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
export default new SceneControls();
