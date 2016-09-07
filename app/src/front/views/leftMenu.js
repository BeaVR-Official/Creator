/**
 * Created by kersal_e on 28/07/2016.
 */

import Loader from '../utils';
import Category from '../models/leftCategoryModel';
import Categories from '../collections/leftCategoryCollection';
import ObjectMenuView from './objectsMenu';
import PropertiesView from './propertiesPanel';
//import TreeViewView from './treeViewView';
import SugarMaple from '../../modules/sugarmaple/SugarMaple';
import * as ScenePanel from '../../modules/creator/ScenesPanel';
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

    this.propertiesView = new PropertiesView();
    this.objectsMenu = new ObjectMenuView();

    this.render();
    this.initializeSugar();
    this.showTreeView(true);
  }

  initializeSugar() {
    $.widget("custom.sugarmaple", {
      _create: function () {
        new SugarMaple(this, this.options);
      }
    });

    this.sm = $('#sceneTree').sugarmaple({
      events:  {
        onImport: (node) => {
          return node;
        },
        onExport: (node) => {
          return node;
        }
      },
      plugins: {
        manage:    true,
        sortable:  true,
        checkable: true
      }
    });
    ScenePanel.default.initTree(this.sm);
  }


  render() {
    console.log(this.categories.toJSON());
    this.$el.html(this.template({
      categories : this.categories.toJSON()
    }));
    return this;
  }

  showTreeView(arg) {
    if (arg === true) {
      $('#treeview-left-panel').css("display","block");
      $('.properties-left-panel').css("display","none");
    } else {
      $('#treeview-left-panel').css("display","none");
      $('.properties-left-panel').css("display","block");
    }
  }

  loadTabulation(e) {
    $(".tab.active").each(function() {
      $(this).removeClass('active');
    });
    var selectedElem = $(e.target).closest('.tab');
    selectedElem.addClass("active");
    switch (selectedElem.data("id")) {
      case "Tree View":
        this.showTreeView(true);
        break;
      case "Properties":
        this.showTreeView(false);
        this.propertiesView.render();
        break;
      case "Add Object":
        this.showTreeView(false);
        this.objectsMenu.render();
        break;
    }
  }
}

export default LeftMenuView;