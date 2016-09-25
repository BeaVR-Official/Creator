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
    this.model = params["userModel"];
    this.render();
    _.bind(this.render, this);
    this.model.bind('change', this.render);
    this.model.bind('change', _.bind(this.render, this));
  }

  initialize() {
    // this.sceneDropDown = new SceneDropdownView();
  }

  launchApp() {
    Save.saveCustomObjects(true);
    // TODO à terme : En dur pour le moment
    document.location.href = "http://localhost:63342/Creator/app/runner.html";
  }

  openModalConnexion() {
    $("#connexionModal").modal('show');
  }

  changeUser(user) {
    this.model = user;
    this.render();
  }

  render() {
    this.$el.html(this.template({currentUser : (this.model.attributes.id != -1) ?
                                               {firstName: this.model.attributes.firstName,
                                                picture: this.model.attributes.picture} : undefined}));
    // this.sceneDropDown.$el = this.$('.scene-dropdown');
    // this.sceneDropDown.render();
    // this.sceneDropDown.delegateEvents();
    return this;
  }
}

export default TopMenu;