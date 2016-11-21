import UUID from './../utils/UUID';

export default class MaterialDescriptor {
  constructor(name) {
    this.uuid = UUID.createUUID();
    this.name = name;
    this.colorCode = "0X000000";
    this.textureResourceUuid = undefined;
    this.bumpRessourceUuid = undefined;
    this.luminosity = 0.0;
    //TODO: populate the class
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return (this.name);
  }
}