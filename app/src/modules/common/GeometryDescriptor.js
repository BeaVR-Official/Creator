import UUID from './../utils/UUID';
import Backbone from 'backbone';

export default class GeometryDescriptor extends Backbone.Model {
  
  constructor(name, type) {
    super();
    this.attributes.uuid = UUID.createUUID();
    this.attributes.name = name;
    this.attributes.type = type; // used to define if geometry is basic (cube, sphere) or comes from a resource
    this.attributes.geometryResourceUuid = undefined;
    //TODO: populate the class
  }

  setName(name) {
    this.attributes.name = name;
  }

  getName() {
    return (this.attributes.name);
  }

  /*
  BackBone model methods
   */

  defaults() {
    return {
      uuid: UUID.createUUID(),
      name: "",
      type: "",
      geometryResourceUuid: undefined
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