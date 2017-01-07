/**
 * Created by Nicolas on 11/19/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import Cookie from '../cookie';
import EventManager from '../../modules/common/EventManager';

import TopBar from './TopBarView';

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

        let appName = document.getElementById("applicationName").value;
        let appDesc = document.getElementById("applicationDescription").value;
        let data = {
            name : appName,
            description : appDesc
        };

        $.ajax({
            url : "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects",
            type: "post",
            data: data,
            headers: {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
            dataType: 'json',
            statusCode : {
                404 : function (data) {
                    alert('Err 404');
                },
                200 : function (data) {
                    EventManager.emitEvent('createNewProject', data);
                    TopBar.addTab(true);
                },
                500 : function (data) {
                    alert("Err 500");
                }
            }
        });

        $('#project_creation_modal').dismissModal('fadeOut');
    }

    initialize() {};

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