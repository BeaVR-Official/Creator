/**
 * Created by Nicolas on 11/17/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import AuthModal from './AuthModalView';
import ProjectCreationModal from './ProjectCreationModalView'

// tmp
import ItemMenuCollection from '../collections/ItemMenuCollection';
import Item from '../models/ItemMenu';

import Cookie from '../cookie';
import EventManager from '../../modules/common/EventManager';

class ProjectSelectionModalView extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ProjectSelectionModal);
  }

  get events() {
    return {
      'click #disconnect_button'            : 'openAuthModal',
      'click #project_creation_button_user' : 'openProjectCreationModal',
      'click .projectSelected'              : 'loadSelectedProject'
    };
  }

  get $el() {
    return $('.ModalSelector');
  }

  constructor() {
    super({
      events: {}
    });

    let req = $.ajax({
      url: "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects/",
      type: "get",
      headers: {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
      dataType: 'json'
    });
    req.done((data) => {
      this.fillProjectSelection(data.data.projects);
      Loader.initStyles();
    });
    req.fail((err) => {
      alert("Lors de la recup des projets : " + err.responseText);
    });

  }

  fillProjectSelection(projectsData) {
    let projectsCollection = [];
    projectsData.forEach((project) => {
      projectsCollection.push(new Item({id: project._id, name: project.name}));
    });
    // TODO Creer un model collection ou merge avec celui d'elliot
    this.object = new ItemMenuCollection(projectsCollection);
  }

  loadSelectedProject(e) {
    let selectedElem = $(e.target).closest('.projectSelected');
    EventManager.emitEvent('loadProject', selectedElem.data("id"));
    $('#project_selection_modal').dismissModal('fadeOut');
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
    if (this.object === undefined) {
      this.$el.html(this.template({
        object: ""
      }));
      return this;
    }
    this.$el.html(this.template({
      object: this.object.toJSON()
    }));
    return this;
  }
}

export default ProjectSelectionModalView;