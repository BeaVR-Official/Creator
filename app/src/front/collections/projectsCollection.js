/**
 * Created by ekersale on 07/10/2016.
 */

import Router from "../router";
import CreatorProject from "../models/projectModel";
import * as Backbone from '../../../../node_modules/backbone/backbone';

class Objects extends Backbone.Collection {
  url() {
    return Router.urlBase + "/creator/" + $.cookie("userID") + "/projects";
  }

  get model() {
    return CreatorProject;
  }

  defaults() {
    return {
      models: []
    };
  }

  constructor(params) {
    super(params);
  }

  parse(response) {
    return response.data.projects;
  }
}

export default Objects;