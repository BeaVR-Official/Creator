/**
 * Created by giraud_d on 04/10/2016.
 */

import Loader from '../../utils';
import * as Backbone from 'backbone';
import Scene from '../../../modules/creator/Scene';
import ProjectManager from '../../../modules/creator/ProjectManager';

class ScenePanelView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ScenePanel);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  constructor() {
    super();
  }

  initialize() {
  }

  render() {
    this.$el.html(this.template({
      sceneList : ProjectManager._sceneManager._scenes
    }));
    $("#scene_name").val(ProjectManager.getCurrentScene().name);
    return this;
  }

  get events() {
    return {
      'click #validate_scene_name': 'changeSceneName',
      'click #validate_delete_scene': 'deleteScene',
      'click #validate_new_scene': 'newScene'
    };
  }

  changeSceneName() {
    let value = $("#scene_name").val();
    Scene._name = value;
    $("#display_scene_name").text(value);
    // TODO actualiser le nom da la liste des scènes
  }

  deleteScene() {
    // Todo dans sceneManager
  }

  newScene() {
    // Changement coté back
    ProjectManager._sceneManager.addNewScene($("#new_scene_name").val());
    
    // Changement coté front
    $("#display_scene_name").text(value);
  }
}

export default ScenePanelView;