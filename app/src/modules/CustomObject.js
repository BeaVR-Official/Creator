import Scene from './Scene';

export default class CustomObject {
  constructor(mesh, type, script) {

    this.obj     = mesh;
    this.objType = type;

    this.obj.userData.id = _.uniqueId();
    this.name            = type + '_' + this.obj.userData.id;
    this._script         = script;

  }

  // addToScene(scene) {
  //  this.dispatchEvent({type: 'add', message: this.name + ' Added!'});
  // }

  setPosition(pos) {
    this.obj.position.set(pos.x, pos.y, pos.z);
  }

  setRotation(rot) {
    this.obj.rotation.set(rot.x, rot.y, rot.z);
  }

  setScale(scale) {
    if (scale.x > 0 && scale.y > 0 && scale.z > 0)
      this.obj.scale.set(scale.x, scale.y, scale.z);
  }

  setColor(color) {
    this.obj.material.color.set(color);
  }

  setVisibility(state) {
    this.obj.visible = state;
  }

  updatePosition(pos) {
    this.obj.setPosition(pos);
    //Scene.render();
  }

  updateRotation(rot) {
    this.obj.setRotation(rot);
    //Scene.render();
  }

  updateScale(scale) {
    this.obj.setScale(scale);
    //Scene.render();
  }

  objToJSON() { //ne marche pas pour le moment
    return {
      object:  this.obj.toJSON(), //method toJSON de THREE.MEsh
      _script: this._script // A passer dans userData
    };
  }

}