/**
 * Created by giraud_d on 04/10/2016.
 */

import Loader from '../../utils';
import * as Backbone from 'backbone';
import ProjectManager from '../../../modules/common/ProjectManager';

class ProjectPanelView extends Backbone.View {

  constructor() {
    super();
  }

  initialize() {
  }
  
  get template() {
    return _.template(Loader.templates.ProjectPanel);
  }

  get $el() {
    return $('.properties-left-panel');
  }

  render() {
    this.$el.html(this.template);
    $("#project_name").val(ProjectManager.getName());
    return this;
  }

  get events() {
    return {
      'click #validate_project_name': 'changeProjectName'
    };
  }

  changeProjectName() {
    let value = $("#project_name").val();
    ProjectManager.setName(value);
    $("#display_project_name").text(value);
  }

}

export default ProjectPanelView;