/**
 * Created by kersal_e on 28/07/2016.
 */

import Loader from '../utils';
import Object3D from '../models/objectModel';
import Objects from '../collections/objectCollection';
import BasicObjectsView from './objects/basicObjects';
import BasicLightsView from './objects/basicLights';
import * as Backbone from 'backbone';

class ScriptsMenuView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ScriptsMenu);
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

    object.push(new Object3D({name: "Add", logo:'assets/images/add.png'}));
    this.objects = new Objects(object);
  }

  render() {
    this.$el.html(this.template({
      objectsCategories : this.objects.toJSON()
    }));
    return this;
  }

  loadObjects(e) {
  }

}

export default ScriptsMenuView;