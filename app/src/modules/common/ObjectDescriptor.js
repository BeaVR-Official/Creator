import UUID from './../utils/UUID';
import MaterialDescriptor from './MaterialDescriptor';
import GeometryDescriptor from './GeometryDescriptor';
import Backbone from 'backbone';

export default class ObjectDescriptor extends Backbone.Model {

  constructor(name, type) {
    super();
    this.attributes.uuid                          = UUID.createUUID();
    this.attributes.name                          = name;
    this.attributes.type                          = type;

    this.attributes.externalObjBddId              = "";
    this.attributes.textureBddId                  = "";

    this.attributes.parent                        = undefined;
    this.attributes.children                      = [];
    this.attributes.transformations.translation   = {x:0.0, y:0.0, z:0.0};
    this.attributes.transformations.rotation      = {x:0.0, y:0.0, z:0.0};
    this.attributes.transformations.scale         = {x:0.0, y:0.0, z:0.0};
    this.attributes.isSolid                       = false;
    this.attributes.isGravityEffected             = false;
    this.attributes.isVisibilty                   = true;
    this.attributes.geometryDescriptor            = new GeometryDescriptor(name + " geometry");
    this.attributes.materialDescriptor            = new MaterialDescriptor(name + " material");
    // TODO: support all the more specific properties
    // namely: Cameras, Skyboxes
  }

  setUuid(uuid) {
    this.attributes.uuid = uuid;
  }

  getUuid() {
    return (this.attributes.uuid);
  }

  setName(name) {
    this.attributes.name = name;
  }

  getName() {
    return (this.attributes.name);
  }

  setType(type) {
    this.attributes.type = type;
  }

  getType() {
    return (this.attributes.type);
  }

  getTextureBddId() {
    return (this.attributes.textureBddId);
  }

  setTextureBddId(texture) {
    this.attributes.textureBddId = texture;
  }

  addChild(objectUuid) {
    this.attributes.children.push(objectUuid);
  }

  removeChild(objectUuid) {
    for (let index = 0; index < this.attributes.children.length; index++) {
      if (this.attributes.children[index].uuid === objectUuid) {
        this.attributes.children.splice(index, 1);
        return (true);
      }
    }
    return (false);
  }

  removeAllChildren() {
    this.attributes.children.splice(0, this.attributes.children.length);
    //this.attributes.children = [];
  }

  setChildren(children) {
    this.attributes.children = children;
  }

  getChildren() {
    return (this.attributes.children);
  }

  setParent(parentUuid) {
    this.attributes.parent = parentUuid;
  }

  getParent() {
    return (this.attributes.parent);
  }

  setPosition(position) {
    this.attributes.transformations.translation = position;
  }

  getPosition() {
    return (this.attributes.transformations.translation);
  }

  setRotation(rotation) {
    this.attributes.transformations.rotation = rotation;
  }

  getRotation() {
    return (this.attributes.transformations.rotation);
  }

  setScale(scale) {
    this.attributes.transformations.scale = scale;
  }

  getScale() {
    return (this.attributes.transformations.scale);
  }

  setMaterialDescriptor(materialDescriptor) {
    this.attributes.materialDescriptor = materialDescriptor;
  }

  getMaterialDescriptor() {
    return (this.attributes.materialDescriptor);
  }

  setGeometryDescriptor(geometryDescriptor) {
    this.attributes.geometryDescriptor = geometryDescriptor;
  }

  getGeometryDescriptor() {
    return (this.attributes.geometryDescriptor);
  }

  setSolidStatus(isSolid) {
    this.attributes.scale = isSolid;
  }

  getSolidStatus() {
    return (this.attributes.isSolid);
  }

  setGravityStatus(isGravityEffected) {
    this.attributes.isGravityEffected = isGravityEffected;
  }

  getGravityStatus() {
    return (this.attributes.isGravityEffected);
  }

  setVisibilityStatus(isVisibility) {
    this.attributes.isVisibilty = isVisibility;
  }

  getVisibilityStatus() {
    return (this.attributes.isVisibilty);
  }

  setGeometryDescriptor(geometryDescriptor) {
    this.geometryDescriptor = geometryDescriptor;
  }

  getGeometryDescriptor() {
    return this.geometryDescriptor;
  }

  setMaterialDescriptor(materialDescriptor) {
    this.materialDescriptor = materialDescriptor;
  }

  getMaterialDescriptor() {
    return this.materialDescriptor;
  }

  /*
   BackBone model methods
   */

  defaults() {
    return {
      uuid              : UUID.createUUID(),
      name              : "",
      type              : "",
      parent            : undefined,
      children          : [],
      transformations   : {
        translation : {x:0.0, y:0.0, z:0.0},
        rotation    : {x:0.0, y:0.0, z:0.0},
        scale       : {x:0.0, y:0.0, z:0.0}
      },
      isSolid           : false,
      isGravityEffected : false,
      isVisibilty       : true,
      geometryDescriptor : new GeometryDescriptor("" + " geometry"),
      materialDescriptor : new MaterialDescriptor("" + " material")
    };
  }

  get idAttribute() {
    return '_id';
  }

  get cidPrefix() {
    return '__c';
  }

  url() {
    return "";
  }

  get(name) {
    return this.attributes[name];
  }
}