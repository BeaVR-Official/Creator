import UUID from './../utils/UUID';

export default class GeometryDescriptor {
  constructor(name, type) {
    this.uuid = UUID.createUUID();
    this.name = name;
    this.type = type; // used to define if geometry is basic (cube, sphere) or comes from a resource
    this.geometryResourceUuid = undefined;
    //TODO: populate the class
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return (this.name);
  }
}