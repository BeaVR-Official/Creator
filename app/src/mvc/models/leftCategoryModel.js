/**
 * Created by kersal_e on 28/07/2016.
 */

import Router from "../router";

class Category extends Backbone.Model {
  get idAttribute() {
    return '_id';
  }

  get cidPrefix() {
    return '__c';
  }

  url() {
    return Router.urlBase + "/creator/categories" + this.id;
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

export default Category;