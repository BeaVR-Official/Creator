import UUID from './../../utils/UUID';
import ObjectDescriptor from "ObjectDescriptor";

export default class SceneDescriptor {
  constructor(name) {
    this.uuid              = UUID.createUUID();
    this.name              = name;
    this.objectDescriptors = [];
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return (this.name);
  }

  setObjectDescriptors(objectDescriptors) {
    this.objectDescriptors = objectDescriptors;
  }

  getObjectDescriptors() {
    return (this.objectDescriptors);
  }

  getObjectDescriptorIndex(objectUuid) {
    for (let index = 0; index < this.objectDescriptors.length; index++) {
      if (this.objectDescriptors[index].uuid === objectUuid) {
        return (index);
      }
    }
    return (-1);
  }

  addObjectDescriptor(name, type) {
    let newObjectDescriptor = new ObjectDescriptor(name, type);
    this.objectDescriptors.push(newObjectDescriptor);
    return (newObjectDescriptor.uuid);
  }

  removeObjectDescriptor(objectUuid) {
    let index = this.getObjectDescriptorIndex(objectUuid);
    if (index === -1) {
      return (false);
    }
    this.objectDescriptors.splice(index, 1);
    return (true);
  }
}