/**
 * Created by kersal_e on 28/07/2016.
 */

import Loader from '../utils';
import Category from '../models/leftCategoryModel';
import Categories from '../collections/leftCategoryCollection';
import ObjectMenuView from './objectsMenu';
import PropertiesView from './propertiesPanel';
import SugarMaple from './leftMenu.sugarMaple';
import * as Backbone from 'backbone';

class LeftMenuView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.LeftMenuCategories);
  }

  get $el() {
    return $('.categories-left-panel');
  }

  get events() {
    return {
      'click .tab': 'loadTabulation'
    };
  }

  constructor() {
    super();
  }

  initialize() {
    let category = [];
    category.push(new Category({name: "Tree View", logo: 'assets/images/view-list.png'}));
    category.push(new Category({name: "Properties", logo: 'assets/images/settings-gears.png'}));
    category.push(new Category({name: "Add Object", logo: 'assets/images/plus.png'}));
    this.categories = new Categories(category);

    this.propertiesView = new PropertiesView();
    this.objectsMenu    = new ObjectMenuView();
    this.sugarMaple     = new SugarMaple();

    this.render();
    $(".my-category-row:first-child").addClass("active");
    this.sugarMaple.initializeSugar();
    this.sugarMaple.showSugarMaple(true);
  }

  render() {
    this.$el.html(this.template({
      categories: this.categories.toJSON()
    }));
    return this;
  }

  loadTabulation(e) {
    $(".tab.active").each(function () {
      $(this).removeClass('active');
    });
    let selectedElem = $(e.target).closest('.tab');
    selectedElem.addClass("active");
    switch (selectedElem.data("id")) {
      case "Tree View":
        this.sugarMaple.showSugarMaple(true);
        break;
      case "Properties":
        this.sugarMaple.showSugarMaple(false);
        this.propertiesView.render();
        this.propertiesView.fillInfo();
        break;
      case "Add Object":
        this.sugarMaple.showSugarMaple(false);
        this.objectsMenu.render();
        break;
    }
  }
}

export default LeftMenuView;