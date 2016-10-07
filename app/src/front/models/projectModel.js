/**
 * Created by ekersale on 07/10/2016.
 */

import Router from "../router";
import * as Backbone from 'backbone';

class CreatorProject extends Backbone.Model {
  get idAttribute() {
    return '_id';
  }

  get cidPrefix() {
    return '__c';
  }

  url() {
    return Router.urlBase + "/creator/projects" + this.id;
  }

  defaults() {
    return {
      id: -1,
    };
  }

  get(name) {
    return this.attributes[name];
  }

  parse(response) {
    return response.data;
  }
}

export default CreatorProject;