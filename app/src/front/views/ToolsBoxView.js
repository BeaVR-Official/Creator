/**
 * Created by ekersale on 13/11/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import EventManager from '../../modules/common/EventManager';
import Project from '../models/project';


require('../../../assets/styles/ToolsBox.scss');

class ToolsBoxView extends Backbone.View {

    get template() {
        return _.template(Loader.templates.ToolsBox);
    }

    get $el() {
        return $('.ToolsBoxSelector');
    }

    get events() {
        return {
            'click #runProject': 'runProject',
            'click #saveProject': 'saveProject',
            'click #validateExport': 'exportProject',
            'click #exportProject': 'openModal',
            'click #cancelExport': 'closeModal'
        };
    }

    runProject() {
        EventManager.emitEvent('runProject');
    }

    saveProject() {
        EventManager.emitEvent('saveProject');
    }

    closeModal() {
        $('.modal.export').removeClass('active');
        $('.modal.export').removeClass('visible');
        $('.export.modals').removeClass('active');
        $('.export.modals').removeClass('visible');
    }

    openModal() {
        $('.export.modals').addClass('active');
        $('.export.modals').addClass('visible');
        $('.export.modals').animateCssIn('fadeIn');
        $('.modal.export').addClass('active');
        $('.modal.export').addClass('visible');
        $('.modal.export').animateCssIn('zoomIn');
    }

    exportProject() {
        this.project = new Project({projectID : '5874a0250684304a2425a54f'});
        this.project.fetch({
            success: function(response) {
                let data = {
                    name: response.attributes.name,
                    description : response.attributes.description,
                    price : 0,
                    logo : 'http://www.cpcwiki.eu/imgs/9/9e/Unknow.png',
                    screenshots: ['http://www.cpcwiki.eu/imgs/9/9e/Unknow.png'],
                    url: "http://beavr.fr:3000/api/creator/" + "57a8daa6574b2905146bd4ef" /*Cookie.getCookieValue("store_id")*/ + "/projects/" + response.attributes.projectID,
                    categories: ["577e89dd7a108ec22897dab3"],
                    devices:["58068d88109a937f868205ea"]
                }
                $.ajax({
                    url : "http://beavr.fr:3000/api/applications/",
                    type: "post",
                    data: data,
                    headers: {Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YThkYWE2NTc0YjI5MDUxNDZiZDRlZiIsImlhdCI6MTQ4Mzk0OTk4N30.eA9WeIqoKPKDsJoAOUwAqMUMvB_T-SUCoZ3dtu5NVY8"}, /*Cookie.getCookieValue("store_token")},*/
                    dataType: 'json',
                    success:function(res) {
                        setTimeout(function(){
                            $.ajax({
                            url : "http://beavr.fr:3000/api/applications/pending/" + res.data.pending._id + "/validate",
                            type: "get",
                            data: data,
                            headers: {Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YThkYWE2NTc0YjI5MDUxNDZiZDRlZiIsImlhdCI6MTQ4Mzk0OTk4N30.eA9WeIqoKPKDsJoAOUwAqMUMvB_T-SUCoZ3dtu5NVY8"}, /*Cookie.getCookieValue("store_token")},*/
                            dataType: 'json'
                        }); }, 1000);
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            }
        });
    }

    constructor() {
        super();
        this.render();
    }

    render() {
        this.$el.html(this.template());
        return this;
    }

}

export default ToolsBoxView;