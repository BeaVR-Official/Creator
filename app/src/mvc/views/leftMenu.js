/**
 * Created by kersal_e on 28/07/2016.
 */

import Loader from '../utils';
import Category from "../models/leftCategoryModel";
import Categories from "../collections/leftCategoryCollection";

class LeftMenuView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.LeftMenuCategories);
  }

  get $el() {
    return $('.categories-left-panel');
  }

  get events() {
    return {

    };
  }

  constructor() {
    super();
  }

  initialize() {
    var category = [];
    category.push(new Category({ name: "Tree View", logo: 'src/assets/images/view-list.png'}));
    category.push(new Category({ name: "Settings", logo:'src/assets/images/settings-gears.png'}));
    category.push(new Category({ name: "Add Object", logo:'src/assets/images/plus.png'}));
    this.categories = new Categories(category);
    this.render();
  }


  render() {
    console.log(this.categories.toJSON());
    this.$el.html(this.template({
      categories : this.categories.toJSON()
    }));
    return this;
  }
}

export default LeftMenuView;