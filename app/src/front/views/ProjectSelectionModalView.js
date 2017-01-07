/**
 * Created by Nicolas on 11/17/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import AuthModal from './AuthModalView';
import ProjectCreationModal from './ProjectCreationModalView'

class ProjectSelectionModalView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ProjectSelectionModal);
  }

  get events() {
    return {
      'click #disconnect_button':       'openAuthModal',
      'click #project_creation_button': 'openProjectCreationModal'
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

    //TODO GET /api/creator/:idUser/projects (renvoie tous les projets de l'utilisateur)
  }

  openAuthModal() {
    var modal = new AuthModal();
    $('#project_selection_modal').animateCssOut('fadeOutRight', modal);
  }

  openProjectCreationModal() {
    var modal = new ProjectCreationModal(this);
    $('#project_selection_modal').animateCssOut('fadeOutLeft', modal);
  }

  initialize() {
  }

  show(backanim = false) {
    this.render();
    if (backanim)
      $('#project_selection_modal').animateCssIn('fadeInLeft');
    else
      $('#project_selection_modal').animateCssIn('fadeInRight');
  }

  render() {
    this.$el.html(this.template());
    return this;
  }
}

export default ProjectSelectionModalView;