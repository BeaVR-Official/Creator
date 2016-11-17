/**
 * Created by kersal_e on 28/07/2016.
 */

import Loader from '../utils';
import Object3D from '../models/objectModel';
import Objects from '../collections/objectCollection';
import BasicObjectsView from './objects/basicObjects';
import BasicLightsView from './objects/basicLights';
import ActionBlockView from './objects/actionBlock';
import ExternalObject from './objects/externalObject';
import WorldCustomization from './objects/worldCustomization';
import * as Backbone from 'backbone';

class ObjectMenuView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ObjectMenu);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'click .tab' : 'loadObjects',
    };
  }

  constructor() {
    super();
  }

  initialize() { // en dur pour le moment
    var object = [];
    object.push(new Object3D({name: "Add Action Block", logo:'assets/images/multi-tab.png'}));
    object.push(new Object3D({name: "Add Reaction Block", logo:'assets/images/multi-tab.png'}));
    object.push(new Object3D({name: "Basic objects", logo:'assets/images/multi-tab.png'}));
    object.push(new Object3D({name: "Lights", logo:'assets/images/ambientLight.png'}));
    object.push(new Object3D({name: "External objects", logo:'assets/images/puzzle.png'}));
    object.push(new Object3D({name: "World", logo:'assets/images/painter-palette.png'}));
    this.objects = new Objects(object);

    this.basicObjectView = new BasicObjectsView();
    this.basicLightView = new BasicLightsView();
    this.actionBlock = new ActionBlockView();
    this.externalObject = new ExternalObject();
    this.worldCustomization = new WorldCustomization();
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
        this.basicObjectView.render();
        break;
      case "Lights":
        this.basicLightView.render();
        break;
      case "External objects":
        this.externalObject.render();
        break;
      case "World":
        this.worldCustomization.render();
        break;
      case "Add Action Block":
        this.actionBlock.render();
        break;
      case "Add Reaction Block":
        break;
    }
  }

}

export default ObjectMenuView;