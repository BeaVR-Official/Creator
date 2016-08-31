/**
 * Created by kersal_e on 28/07/2016.
 */

import Loader from '../utils';
import Object3D from '../models/objectModel';
import Objects from '../collections/objectCollection';
import * as Backbone from 'backbone';
import BasicObjectsView from './objects/basicObjects';
import BasicLightsView from './objects/basicLights';

class ObjectMenuView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ObjectMenu);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'click .tab' : 'loadObjects'
    };
  }

  constructor() {
    super();
  }

  initialize() { // en dur pour le moment
    var object = [];
    object.push(new Object3D({name: "Basic objects", logo:'assets/images/multi-tab.png'}));
    object.push(new Object3D({name: "Lights", logo:'assets/images/ambientLight.png'}));
    object.push(new Object3D({name: "Custom objects", logo:'assets/images/puzzle.png'}));
    object.push(new Object3D({name: "My library", logo:'assets/images/painter-palette.png'}));
    object.push(new Object3D({name: "Add folder", logo:'assets/images/add.png'}));
    this.objects = new Objects(object);
    this.render();
  }

  render() {
    this.$el.html(this.template({
      objectsCategories : this.objects.toJSON()
    }));
    return this;
  }

  loadObjects(e) {
    $(".tab.active").each(function() {
      $(this).removeClass('active');
    });
    var selectedElem = $(e.target).closest('.tab');
    selectedElem.addClass("active");
    switch (selectedElem.data("id")) {
      case "Basic objects":
        new BasicObjectsView();
        break;
      case "Lights":
        new BasicLightsView();
        break;
      case "Custom objects":
        break;
      case "My library":
        break;
      case "Add folder":
        break;
    }
  }

}

export default ObjectMenuView;