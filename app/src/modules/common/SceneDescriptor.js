import UUID from './../utils/UUID';
import ObjectDescriptor from "./ObjectDescriptor";

export default class SceneDescriptor {
  constructor(name) {
    this.uuid              = UUID.createUUID();
    this.name              = name;
    this.objectDescriptors = [];
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

  setAllObjectDescriptors(objectDescriptors) {
    this.objectDescriptors = objectDescriptors;
  }

  getObjectDescriptor(objectUuid) {
    let index = this.getObjectDescriptorIndex(objectUuid);
    if (index === -1) {
      return (undefined);
    }
    return (this.objectDescriptors[index]);
  }

  getAllObjectDescriptors() {
    return (this.objectDescriptors);
  }

  getObjectDescriptorIndex(objectUuid) {
    for (let index = 0; index < this.objectDescriptors.length; index++) {
      if (this.objectDescriptors[index].getUuid() === objectUuid) {
        return (index);
      }
    }
    return (-1);
  }

  addObjectDescriptor(name, type) {
    let newObjectDescriptor = new ObjectDescriptor(name, type);
    this.objectDescriptors.push(newObjectDescriptor);
    return (newObjectDescriptor.getUuid());
  }

  removeObjectDescriptor(objectUuid) {
    let index = this.getObjectDescriptorIndex(objectUuid);
    if (index === -1) {
      return (false);
    }
    // TODO remove all children !!!
    this.objectDescriptors.splice(index, 1);
    return (true);
  }

  removeAllObjectDescriptors() {
    this.objectDescriptors.splice(0, this.objectDescriptors.length);
    //this.objectDescriptors = [];
  }
}