import Scene from './Scene';

export default class CustomObject extends THREE.Mesh {
  constructor(geometry, material, type) {
    super(geometry, material);
    this.objType     = type;
    this.userData.id = _.uniqueId();
    this.name        = type + '_' + this.userData.id;
    this._script     = 'script here';
  }

  //addToScene(scene) {
  //  this.dispatchEvent({type: 'add', message: this.name + ' Added!'});
  //}

  setPosition(pos) {
    this.position.set(pos.x, pos.y, pos.z);
  }

  setRotation(rot) {
    this.rotation.set(rot.x, rot.y, rot.z);
  }

  setScale(scale) {
    if (scale.x > 0 && scale.y > 0 && scale.z > 0)
      this.scale.set(scale.x, scale.y, scale.z);
  }

  setColor(color) {
    this.material.color.set(color);
  }

  setVisibility(state) {
    this.visible = state;
  }

  updatePosition(pos) {
    this.setPosition(pos);
    //Scene.render();
  }

  updateRotation(rot) {
    this.setRotation(rot);
    //Scene.render();
  }

  updateScale(scale) {
    this.setScale(scale);
    //Scene.render();
  }

  objToJSON() {
    return {
      object:       JSON.stringify(this),
      _script:      'typeofScript',
      AnotherParam: 'plop'
    };
  }
}
