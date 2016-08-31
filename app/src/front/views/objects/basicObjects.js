/**
 * Created by giraud_d on 17/08/2016.
 */

import Loader from '../../utils';
import Object3D from '../../models/objectModel';
import Objects from '../../collections/objectCollection';
import * as Backbone from 'backbone';

class BasicObjectsView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ObjectMenu);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'click .tab' : 'loadBasicObjects'
    };
  }

  constructor() {
    super();
  }

  initialize() { // en dur pour le moment
    var basicObject = [];
    basicObject.push(new Object3D({name: "Cube", logo:'assets/images/cube.png'}));
    basicObject.push(new Object3D({name: "Cylinder", logo:'assets/images/cylinder.png'}));
    basicObject.push(new Object3D({name: "Sphere", logo:'assets/images/sphere.png'}));
    this.objects = new Objects(basicObject);
    this.render();
  }

  render() {
    this.$el.html(this.template({
      objectsCategories : this.objects.toJSON()
    }));
    return this;
  }

  loadBasicObjects(e) {
    $(".tab.active").each(function() {
      $(this).removeClass('active');
    });
    var selectedElem = $(e.target).closest('.tab');
    selectedElem.addClass("active");
    switch (selectedElem.data("id")) {
      case "Cube": //new cube
        break;
      case "Cylinder": //new cylinder
        break;
      case "Sphere": //new sphere
        break;
    }
  }

}

export default BasicObjectsView;