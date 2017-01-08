/**
 * Created by Nicolas on 11/17/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import AuthModal from './AuthModalView';
import ProjectCreationModal from './ProjectCreationModalView'

import Cookie from '../cookie';

class ProjectSelectionModalView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ProjectSelectionModal);
  }

  get events() {
    return {
      'click #disconnect_button'            : 'openAuthModal',
      'click #project_creation_button_user' : 'openProjectCreationModal'
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

    let projects = {};
    let req = $.ajax({
      url: "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects/",
      type: "get",
      headers: {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
      dataType: 'json'
    });
    req.done((data) => {
      // TODO projects = data;
    });
    req.fail((err) => {
      alert("Lors de la recup des projets : " + err.responseText);
    });

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