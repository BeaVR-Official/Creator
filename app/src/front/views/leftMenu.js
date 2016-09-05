/**
 * Created by kersal_e on 28/07/2016.
 */

import Loader from '../utils';
import Category from '../models/leftCategoryModel';
import Categories from '../collections/leftCategoryCollection';
import ObjectMenuView from './objectsMenu';
import PropertiesView from './propertiesPanel';
import TreeViewView from './treeViewView';
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
      'click .tab' : 'loadTabulation'
    };
  }

  constructor() {
    super();
  }

  initialize() {
    var category = [];
    category.push(new Category({ name: "Tree View", logo: 'assets/images/view-list.png'}));
    category.push(new Category({ name: "Properties", logo:'assets/images/settings-gears.png'}));
    category.push(new Category({ name: "Add Object", logo:'assets/images/plus.png'}));
    this.categories = new Categories(category);

    this.trewViewView = new TreeViewView();
    this.propertiesView = new PropertiesView();
    this.objectsMenu = new ObjectMenuView();

    this.render();
    this.trewViewView.render();
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
    //TODO selectionner la TreeView
    switch (selectedElem.data("id")) {
      case "Tree View":
        this.trewViewView.render();
        break;
      case "Properties":
        this.propertiesView.render();
        break;
      case "Add Object":
        this.objectsMenu.render();
        break;
    }
  }
}

export default LeftMenuView;