import Backbone from 'backbone';

class Scene extends Backbone.Model {
  get idAttribute() {
    return '_id';
  }

  get cidPrefix() {
    return '__c';
  }

  url() {
    return "";
  }

  defaults() {
    return {
      uuid:              -1,
      name:              "",
      objectDescriptors: []
    };
  }

  get(name) {
    return this.attributes[name];
  }
}

export default Scene;