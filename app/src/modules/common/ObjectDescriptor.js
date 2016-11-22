import UUID from './../utils/UUID';
import MaterialDescriptor from './MaterialDescriptor';
import GeometryDescriptor from './GeometryDescriptor';

export default class ObjectDescriptor {
  constructor(name, type) {
    this.uuid              = UUID.createUUID();
    this.name              = name;
    this.type              = type;
    this.parent            = undefined;
    this.children          = [];
    this.position          = [0.0, 0.0, 0.0];
    this.rotation          = [0.0, 0.0, 0.0];
    this.scale             = [0.0, 0.0, 0.0];
    this.isSolid           = false;
    this.isGravityEffected = false;
    this.geometryDescriptor = new GeometryDescriptor(name + " geometry");
    this.materialDescriptor = new MaterialDescriptor(name + " material");
    // TODO: support all the more specific properties
    // namely: Cameras, Skyboxes
  }

  getUuid() {
    return (this.uuid);
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return (this.name);
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

  removeAllChildren() {
    this.children.splice(0, this.children.length);
    //this.children = [];
  }

  getChildren() {
    return (this.children);
  }

  setParent(parentUuid) {
    this.parent = parentUuid;
  }

  getParent() {
    return (this.parent);
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

  setMaterialDescriptor(materialDescriptor) {
    this.materialDescriptor = materialDescriptor;
  }

  getMaterialDescriptor() {
    return (this.materialDescriptor);
  }

  setGeometryDescriptor(geometryDescriptor) {
    this.geometryDescriptor = geometryDescriptor;
  }

  getGeometryDescriptor() {
    return (this.geometryDescriptor);
  }

  setSolidStatus(isSolid) {
    this.scale = isSolid;
  }

  getSolidStatus() {
    return (this.isSolid);
  }

  setGravityStatus(isGravityEffected) {
    this.isGravityEffected = isGravityEffected;
  }

  getGravityStatus() {
    return (this.isGravityEffected);
  }
}