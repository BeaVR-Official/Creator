/**
 * Created by kersal_e on 28/07/2016.
 */

import Loader from '../utils';
import Category from "../models/leftCategoryModel";
import Categories from "../collections/leftCategoryCollection";
import ObjectCategoriesView from "./objects";

class LeftMenuView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.LeftMenuCategories);
  }

  get $el() {
    return $('.categories-left-panel');
  }

  get events() {
    return {
      'click .tab' : 'loadTabulation'
    };
  }

  constructor() {
    super();
  }

  initialize() {
    var category = [];
    category.push(new Category({ name: "Tree View", logo: 'src/assets/images/view-list.png', id: 1}));
    category.push(new Category({ name: "Settings", logo:'src/assets/images/settings-gears.png', id: 2}));
    category.push(new Category({ name: "Add Object", logo:'src/assets/images/plus.png', id: 3}));
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

  loadTabulation(e) {
    $(".tab.active").each(function() {
      $(this).removeClass('active');
    });
    var selectedElem = $(e.target).closest('.tab');
    selectedElem.addClass("active");
    switch (selectedElem.data("id")) {
      case 1: //loadTreeView
        break;
      case 2: //loadProperties
        break;
      case 3:
        new ObjectCategoriesView();//loadObjects
        break;
    }
  }
}

export default LeftMenuView;