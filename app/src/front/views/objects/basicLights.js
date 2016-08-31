/**
 * Created by giraud_d on 17/08/2016.
 */

import Loader from '../../utils';
import Object3D from '../../models/objectModel';
import Objects from '../../collections/objectCollection';
import * as Backbone from 'backbone';

class BasicLightsView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ObjectMenu);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'click .tab' : 'loadBasicLights'
    };
  }

  constructor() {
    super();
  }

  initialize() { // en dur pour le moment
    var basicObject = [];
    basicObject.push(new Object3D({name: 'Ambiant Light', logo:'assets/images/ambiantLight.png'}));
    basicObject.push(new Object3D({name: "Directional Light", logo:'assets/images/directionalLight.png'}));
    basicObject.push(new Object3D({name: "Point light", logo:'assets/images/pointlight.png'}));
    basicObject.push(new Object3D({name: "Spot Light", logo:'assets/images/spotLight.png'}));
    this.objects = new Objects(basicObject);
    this.render();
  }

  render() {
    this.$el.html(this.template({
      objectsCategories : this.objects.toJSON()
    }));
    return this;
  }

  loadBasicLights(e) {
    $(".tab.active").each(function() {
      $(this).removeClass('active');
    });
    var selectedElem = $(e.target).closest('.tab');
    selectedElem.addClass("active");
    switch (selectedElem.data("id")) {
      case "Ambiant Light":
        break;
      case "Directional Light":
        break;
      case "Point light":
        break;
      case "Spot Light":
        break;
    }
  }

}

export default BasicLightsView;