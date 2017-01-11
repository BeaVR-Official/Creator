/**
 * Created by Nicolas on 11/19/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import Cookie from '../cookie';
import EventManager from '../../modules/common/EventManager';

import Scene from '../models/scene';

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
        //this.render();
    }

    openPrevModal() {
        var modal = this.prev;
        $('#project_creation_modal').animateCssOut('fadeOutRight', modal, true);
    }

    createProject() {

        let appName = document.getElementById("applicationName").value;
        let appDesc = document.getElementById("applicationDescription").value;
        let projectData = {
            name : appName,
            description : appDesc
        };

        let req = $.ajax({
            url : "http://beavr.fr:3000/api/creator/" + Cookie.getCookieValue("store_id") + "/projects",
            type: "post",
            data: projectData,
            headers: {Authorization: "Bearer " + Cookie.getCookieValue("store_token")},
            dataType: 'json'
        });
        req.done ((res) => {
            let resProject = {
                name: appName,
                description: appDesc,
                id: res.data.project._id
            }
            this.createNewProjectAndScene(resProject);
            $('#project_creation_modal').dismissModal('fadeOut');
        });
        req.fail ((err) => {
           alert("Lors de la save du projet dans l'API : " + err.responseText);
        });
    }

    createNewProjectAndScene(projectData) {
        EventManager.emitEvent('createNewProject', projectData);
        //let scene = new Scene();
        let data = {
            sceneName: "S1",
            scene: scene
        };
        EventManager.emitEvent('addScene', data).then((res) => {
            scene.attributes = res.scene.attributes;
        });
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