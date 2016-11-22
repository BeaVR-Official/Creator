import ResourceDescriptor from '../common/ResourceDescriptor';

class API {
  static getResource(type, resourceUuid) {
    let format;

    if (type === ResourceDescriptor.types.geometry)
      format = 'obj';
    else if (type === ResourceDescriptor.types.material)
      format = 'json';
    else format = 'png';

    return `assets/api/${type}/${resourceUuid}.${format}`;
  }
}

export default API;