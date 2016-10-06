/**
 * Created by kersal_e on 28/07/2016.
 */

import Loader from '../utils';
import Object3D from '../models/objectModel';
import Objects from '../collections/objectCollection';
import BasicObjectsView from './objects/basicObjects';
import BasicLightsView from './objects/basicLights';
import * as Backbone from 'backbone';
import ActionBlockView from './objects/actionBlock';


import ScriptOrganizer from "../../modules/creator/script/ScriptOrganizer";
import ScriptScheduler from "../../modules/creator/script/ScriptScheduler";
import Trigger from "../../modules/creator/script/Trigger";

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
  }

  render() {
    var object = [];

    for (let trigger of ScriptOrganizer.getAllTriggers()) {
      object.push(new Object3D({name: trigger.uuid, trigger: trigger, logo:'assets/images/action.png'}));
    }

    this.objects = new Objects(object);

    this.$el.html(this.template({
      objectsCategories : this.objects.toJSON()
    }));
    return this;
  }

  loadObjects(e) {
    if (this.objects !== undefined) {
      const elem  = $(e.currentTarget);
      const found = this.objects.where({name: elem.data('id')});

      found.forEach((clicked) => {
        const v = new ActionBlockView(clicked.attributes.trigger.uuid); // passer l'objet de la collection cliqué à la view d'édition
        v.render();
      });
    }

  }

}

export default ScriptsMenuView;