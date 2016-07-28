/**
 * Created by kersal_e on 28/07/2016.
 */

import Router from "../router";
import Category from "../models/leftCategoryModel";

class Categories extends Backbone.Collection {
  url() {
    return Router.urlBase + "/creator/categories";
  }

  get model() {
    return Category;
  }

  constructor(params) {
    super(params);
  }
}

export default Categories;