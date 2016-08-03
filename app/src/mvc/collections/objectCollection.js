/**
 * Created by kersal_e on 03/08/2016.
 */

import Router from "../router";
import Object3D from "../models/objectModel";

class Objects extends Backbone.Collection {
  url() {
    return Router.urlBase + "/creator/objects";
  }

  get model() {
    return Object3D;
  }

  constructor(params) {
    super(params);
  }
}

export default Objects;