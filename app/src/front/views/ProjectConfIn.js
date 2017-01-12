/**
 * Created by ekersale on 10/01/2017.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import Cookie from '../cookie';
import ProjectManager from "../../modules/common/ProjectManager";


import Project from '../models/project';

class ProjectConfInView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ProjectConfIn);
  }

  get events() {
    return {
      'click #close_button' : 'remove',
      'click #modify_button' : 'modifyProject'
    };
  }

  get $el() {
    return $('.ModalSelector');
  }

  constructor() {
    super({
      events: {}
    });
    Loader.initStyles();
    console.log(ProjectManager.getId());
    this.project = new Project({projectID : '5874a0250684304a2425a54f'});
    this.listenTo(this.project, 'all', this.render);
    this.project.fetch({
      error: function() {
        alert("Request get Project error. Please verify your well logged. And your project exist.");
      }
    });
  }

  modifyProject() {
    let appName = document.getElementById("applicationName").value;
    let appDesc = document.getElementById("applicationDescription").value;
    let projectData = {
      name : appName,
      description : appDesc
    };
    this.project.save(projectData);
    $('#project_creation_modal').dismissModal('fadeOut');
    this.remove();
  }

  initialize() {};

  render() {
    $('#project_creation_modal').animateCssIn('fadeIn');
    this.$el.html(this.template({project: this.project.toJSON()}));
    return this;
  }

  remove() {
    this.undelegateEvents();
    this.$el.empty();
    this.stopListening();
    return this;
  }
}

export default ProjectConfInView;