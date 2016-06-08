export default class CustomObject extends THREE.Mesh {
  constructor(geometry, material, type) {
    super(geometry, material);
    this.objType     = type;
    this.userData.id = _.uniqueId();
    this.name        = type + '_' + this.userData.id;
    this._script     = 'script here';
  }

  setPosition(pos) {
    super.position.set(pos.x, pos.y, pos.z);
  }

  setRotation(rot) {
    super.rotation.set(rot.x, rot.y, rot.z);
  }

  setScale(scale) {
    super.scale.set(scale.x, scale.y, scale.z);
  }

  setColor(color) {
    super.material.color.set(color);
  }

  setVisibility(state) {
    super.visible = state;
  }

  objToJSON() {
    return {
      object:       JSON.stringify(this),
      _script:      'typeofScript',
      AnotherParam: 'plop'
    };
  }
}