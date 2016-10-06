/**
 * Created by kersal_e on 27/07/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import Save from '../../modules/creator/Save';
import ProjectPanelView from './topMenu/ProjectPanel';
import ScenePanelView from './topMenu/ScenePanel';
import TopMenuUtils from "./TopMenu.utils";
import ProjectManager from '../../modules/creator/ProjectManager';
import Scene from '../../modules/creator/Scene';

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
      'click .openModalConnexion' : 'openModalConnexion',
      'click #project_button' : 'openProjectPanel',
      'click #scene_button' : 'openScenePanel'
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
    this.projectPanelView = new ProjectPanelView();
    this.scenePanelView = new ScenePanelView();
    this.utils = new TopMenuUtils();
  }

  openProjectPanel() {
    this.utils.setAndDisableActiveClass("#project_button", "#scene_button");
    this.projectPanelView.render();
  }

  openScenePanel() {
    this.utils.setAndDisableActiveClass("#scene_button", "#project_button");
    this.scenePanelView.render();
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
    this.$el.html(this.template({
      currentProject: {name : ProjectManager._name},
      currentScene: {name: Scene._name},
      currentUser : (this.model.attributes.id != -1) ?
                                               {firstName: this.model.attributes.firstName,
                                                picture: this.model.attributes.picture} : undefined}));
    // this.sceneDropDown.$el = this.$('.scene-dropdown');
    // this.sceneDropDown.render();
    // this.sceneDropDown.delegateEvents();
    return this;
  }
  
}

export default TopMenu;