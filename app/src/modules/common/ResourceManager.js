import API from '../API/API';

let loadedResources = {};

class ResourceManager {

  constructor() {
    this.resourceDescriptors = [];
  }

  getAllResourceDescriptors() {
    return this.resourceDescriptors;
  }

  getResourceDescriptorIndex(index) {
    return this.resourceDescriptors[index];
  }

  static getResource(type, resourceUuid) {
    let res = loadedResources[resourceUuid];

    return new Promise((resolve, reject) => {
      if (res === undefined) {
        res = API.getResource(type, resourceUuid);
        resolve(res);
      } else {
        resolve(res);
      }
    });
  }
}

export default ResourceManager;