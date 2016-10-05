/**
 * Created by giraud_d on 04/10/2016.
 */

/**
 * Created by giraud_d on 04/10/2016.
 */

import Loader from '../../utils';
import * as Backbone from 'backbone';
import Scene from '../../../modules/creator/Scene';

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
    this.$el.html(this.template);
    $("#scene_name").val(Scene._name);
    return this;
  }

  get events() {
    return {
      'click #validate_scene_name': 'changesceneName',
      'click #validate_delete_scene': 'deleteScene'
    };
  }

  changesceneName() {
    let value = $("#scene_name").val();
    Scene._name = value;
    $("#display_scene_name").text(value);
  }

  deleteScene() {
    // Todo dans sceneManager
  }
}

export default ScenePanelView;