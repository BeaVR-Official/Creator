/**
 * Created by kersal_e on 27/07/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import Save from '../../modules/creator/Save';
import SceneDropdownView from './topMenu/sceneDropdown';

class TopMenu extends Backbone.View {

  get template() {
    return _.template(Loader.templates.TopMenu);
  }

  get $el() {
    return $('.nav-container');
  }

  get events() {
    return {
      'click #launch': 'launchApp',
      'click .openModalConnexion' : 'openModalConnexion'
    };
  }

  constructor(params) {
    super({
      events: {}
    });
    console.log(params);
    if (params.userModel) {
      var model = params.userModel;
      model.fetch(function() {
        console.log(model);
      });
    }
    this.currentUser = (params != undefined && params["model"]) ? params["model"] : undefined;
  }

  initialize() {
    // this.sceneDropDown = new SceneDropdownView();
    this.render();
  }

  launchApp() {
    Save.saveCustomObjects(true);
    // TODO à terme : En dur pour le moment
    document.location.href = "http://localhost:63342/Creator/app/runner.html";
  }

  openModalConnexion() {
    $("#connexionModal").modal('show');
  }

  render() {
    this.$el.html(this.template(this.currentUser));
    // this.sceneDropDown.$el = this.$('.scene-dropdown');
    // this.sceneDropDown.render();
    // this.sceneDropDown.delegateEvents();
    return this;
  }
}

export default TopMenu;