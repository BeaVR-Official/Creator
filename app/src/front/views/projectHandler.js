/**
 * Created by ekersale on 07/10/2016.
 */

/**
 * Created by kersal_e on 27/07/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import ProjectCollection from '../collections/projectsCollection';

class ProjectHandler extends Backbone.View {

  get template() {
    return _.template(Loader.templates.ProjectHandler);
  }

  get $el() {
    return $('.ProjectHandler');
  }

  get events() {
    return {

    };
  }

  constructor(params) {
    super({
      events: {}
    });
    this.render();
    this.projectCollection = new ProjectCollection();
    this.projectCollection.fetch();
    _.bind(this.render, this);
    this.projectCollection.bind('change', this.render);
    this.projectCollection.bind('change', _.bind(this.render, this));
  }

  initialize() {

  }

  update() {
    this.projectCollection.fetch();
  }

  show() {
    this.update();
    $(".basic.modal").modal({
      observeChanges: true,
      onVisible: function () {
        $(".basic.modal").modal("refresh");
      }}).modal("show");
  }

  render() {
    this.$el.html(this.template({results: this.projectCollection}));
    return this;
  }

}

export default ProjectHandler;