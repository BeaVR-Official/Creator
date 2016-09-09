/**
 * Created by kersal_e on 28/07/2016.
 */

import Loader from '../utils';
import Category from '../models/leftCategoryModel';
import Categories from '../collections/leftCategoryCollection';
import ObjectMenuView from './objectsMenu';
import PropertiesView from './propertiesPanel';
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

    this.render();
    this.initializeSugar();
    this.showSugarMaple(true);
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
    this.sugarMapleEvents();
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
        this.showSugarMaple(true);
        break;
      case "Properties":
        this.showSugarMaple(false);
        this.propertiesView.render();
        this.propertiesView.fillInfo();
        break;
      case "Add Object":
        this.showSugarMaple(false);
        this.objectsMenu.render();
        break;
    }
  }

  showSugarMaple(arg) {
    if (arg === true) {
      $('.treeview-left-panel').css("display", "block");
      $('.properties-left-panel').css("display", "none");
    } else {
      $('.treeview-left-panel').css("display", "none");
      $('.properties-left-panel').css("display", "block");
    }
  }

  sugarMapleEvents() {
    this.sm.on('checkable.checked', (e, node) => {
      if (node !== undefined)
        ScenePanel.default.onChecked(node);
    });

    this.sm.on('checkable.unchecked', (e, node) => {
      ScenePanel.default.onUnchecked();
    });

    this.sm.on('sortable.dragged', (e, node) => {
      if (node !== undefined)
        ScenePanel.default.onDragged(node);
    });

    this.sm.on('sortable.dropped', (e, newParent, node) => {
      if (newParent !== undefined)
        ScenePanel.default.onDropped(newParent, node);
    });
  }

}

export default LeftMenuView;