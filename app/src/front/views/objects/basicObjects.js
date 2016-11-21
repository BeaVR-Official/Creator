/**
 * Created by giraud_d on 17/08/2016.
 */

import Loader from '../../utils';
import Object3D from '../../models/objectModel';
import Objects from '../../collections/objectCollection';
import * as Backbone from 'backbone';

import GraphicalManager from '../../../modules/common/GraphicalManager';
import EventManager from '../../../modules/common/EventManager';

class BasicObjectsView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ObjectMenu);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  get events() {
    return {
      'click .tab': 'loadBasicObjects'
    };
  }

  constructor() {
    super();
  }

  initialize() { // en dur pour le moment
    let basicObject = [];
    basicObject.push(new Object3D({name: "Cube", logo: 'assets/images/cube.png'}));
    basicObject.push(new Object3D({name: "Cylinder", logo: 'assets/images/cylinder.png'}));
    basicObject.push(new Object3D({name: "Sphere", logo: 'assets/images/sphere.png'}));
    this.objects = new Objects(basicObject);
  }

  render() {
    this.$el.html(this.template({
      objectsCategories: this.objects.toJSON()
    }));
    return this;
  }

  loadBasicObjects(e) {
    $(".tab.active").each(function () {
      $(this).removeClass('active');
    });
    let selectedElem = $(e.target).closest('.tab');

    let currentSceneUuid = GraphicalManager.currentSceneUuid;

    selectedElem.addClass("active");
    switch (selectedElem.data("id")) {
      case "Cube":

        // TEST
        let data = {
          sceneUuid:  currentSceneUuid,
          objectName: "Box_01",
          objectType: "box"
        };
        EventManager.emitEvent('addObject', data);

        break;
      case "Cylinder":
        // Navigator.addCylinder();
        break;
      case "Sphere":
        // Navigator.addSphere();
        break;
    }
  }

}

export default BasicObjectsView;