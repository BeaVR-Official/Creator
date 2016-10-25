import UUID from './../../utils/UUID';

export default class ObjectDescriptor {
  constructor(name, type) {
    this.uuid = UUID.createUUID();
    this.name = name;
    this.type = type;
    this.children = [];
    this.position = [0.0, 0.0, 0.0];
    this.rotation = [0.0, 0.0, 0.0];
    this.scale = [0.0, 0.0, 0.0];
    this.solidState = false;
    this.gravityEffected = false;
    // TODO: support all the more specific properties
    // namely: Cameras, Skyboxes
  }

  addChild(objectUuid) {
    this.children.push(objectUuid);
  }

  removeChild(objectUuid) {
    for (let index = 0; index < this.children.length; index++) {
      if (this.children[index].uuid === objectUuid) {
        this.children.splice(index, 1);
        return (true);
      }
    }
    return (false);
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return (this.name);
  }

  setPosition(position) {
    this.position = position;
  }

  getPosition() {
    return (this.position);
  }

  setRotation(rotation) {
    this.rotation = rotation;
  }

  getRotation() {
    return (this.rotation);
  }

  setScale(scale) {
    this.scale = scale;
  }

  getScale() {
    return (this.scale);
  }

  setSolidStatus(isSolid) {
    this.scale = isSolid;
  }

  getSolidStatus() {
    return (this.solidState);
  }

  setGravityStatus(isGravityEffected) {
    this.gravityEffected = isGravityEffected;
  }

  getGravityStatus() {
    return (this.gravityEffected);
  }
}