/**
 * Created by kersal_e on 03/08/2016.
 */

import Router from "../router";
import * as Backbone from 'backbone';

class Object3D extends Backbone.Model {
  get idAttribute() {
    return '_id';
  }

  get cidPrefix() {
    return '__c';
  }

  url() {
    return Router.urlBase + "/creator/objects" + this.id;
  }

  defaults() {
    return {
      id: -1,
      logo: '',
      name: 'undefined'
    };
  }

  get(name) {
    return this.attributes[name];
  }
}

export default Object3D;