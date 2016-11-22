/**
 * Created by Nicolas on 11/19/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';

import $ from 'jquery';

class ProjectCreationModalView extends Backbone.View {

    get template() {
        return _.template(Loader.templates.ProjectCreationModal);
    }

    get events() {
        return {
            'click #back_button' : 'openPrevModal',
            'click #create_button' : 'createProject'
        };
    }

    get $el() {
        return $('.ModalSelector');
    }

    constructor(prev) {
        super({
            events: {}
        });
        this.prev = prev;
        Loader.initStyles();
    }

    openPrevModal() {
        var modal = this.prev;
        $('#project_creation_modal').animateCssOut('fadeOutRight', modal, true);
    }

    createProject() {
        $('#project_creation_modal').dismissModal('fadeOut');
    }

    initialize() {}

    show() {
        this.render();
        $('#project_creation_modal').animateCssIn('fadeInRight');
    }

    render() {
        this.$el.html(this.template());
        return this;
    }
}

export default ProjectCreationModalView;