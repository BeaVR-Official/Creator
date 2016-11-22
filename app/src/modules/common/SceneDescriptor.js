import UUID from './../utils/UUID';
import Constants from '../creator/Constants';
import ObjectDescriptor from "./ObjectDescriptor";
import Backbone from 'backbone';

export default class SceneDescriptor extends Backbone.Model {

  constructor(name) {
    super();
    this.attributes.uuid              = UUID.createUUID();
    this.attributes.name              = name;
    this.attributes.objectDescriptors = [];
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

  getGraphicalScene() {
    return (this.attributes.graphicalScene);
  }

  setAllObjectDescriptors(objectDescriptors) {
    this.attributes.objectDescriptors = objectDescriptors;
  }

  getObjectDescriptor(objectUuid) {
    let index = this.getObjectDescriptorIndex(objectUuid);
    if (index === -1) {
      return (undefined);
    }
    return (this.attributes.objectDescriptors[index]);
  }

  getAllObjectDescriptors() {
    return (this.attributes.objectDescriptors);
  }

  getObjectDescriptorIndex(objectUuid) {
    for (let index = 0; index < this.attributes.objectDescriptors.length; index++) {
      if (this.attributes.objectDescriptors[index].getUuid() === objectUuid) {
        return (index);
      }
    }
    return (-1);
  }

  addObjectDescriptor(name, type) {
    let newObjectDescriptor = new ObjectDescriptor(name, type);
    this.attributes.objectDescriptors.push(newObjectDescriptor);
    return (newObjectDescriptor.getUuid());
  }

  removeObjectDescriptor(objectUuid) {
    let index = this.getObjectDescriptorIndex(objectUuid);
    if (index === -1) {
      return (false);
    }
    // TODO remove all children !!!
    this.attributes.objectDescriptors.splice(index, 1);
    return (true);
  }

  removeAllObjectDescriptors() {
    this.attributes.objectDescriptors.splice(0, this.attributes.objectDescriptors.length);
    //this.attributes.objectDescriptors = [];
  }
}