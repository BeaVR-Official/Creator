import UUID from './../utils/UUID';
import Backbone from 'backbone';

export default class MaterialDescriptor extends Backbone.Model {
  
  constructor(name) {
    super();
    this.attributes.uuid = UUID.createUUID();
    this.attributes.name = name;
    this.attributes.colorCode = "0X000000";
    this.attributes.bumpRessourceUuid = undefined;
    this.attributes.luminosity = 0.0;
    this.attributes.textureResourceUuid = undefined;
    this.attributes.textureRepeat = {
      x: 1,
      y: 1
    };
    //TODO: populate the class
  }

  setName(name) {
    this.attributes.name = name;
  }

  getName() {
    return (this.attributes.name);
  }
}