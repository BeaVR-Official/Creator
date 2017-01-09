/**
 * Created by Nicolas on 11/13/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import RegisterModal from './RegisterModalView';
import ResetPasswordModal from './ResetPasswordModalView';
import ProjectSelectionModal from './ProjectSelectionModalView';
import ProjectCreationModal from './ProjectCreationModalView';

import Cookie from '../cookie';

require('../../../assets/styles/AuthModal.scss');

class AuthModalView extends Backbone.View {

    get template() {
        return _.template(Loader.templates.AuthModal);
    }

    get events() {
        return {
            'click #register_button' : 'openRegisterModal',
            'click #reset_password' : 'openResetPasswordModal',
            'click #login_button' : 'loginUser',
            'click #project_creation_button' : 'openProjectCreationModal'
        };
    }

    get $el() {
        return $('.ModalSelector');
    }

    openRegisterModal() {
        var modal = new RegisterModal();
        $('#login_modal').animateCssOut('fadeOutLeft', modal);

    }

    openResetPasswordModal() {
        var modal = new ResetPasswordModal();
        $('#login_modal').animateCssOut('fadeOutLeft', modal);
    }

    loginUser(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        if ($('#login_email').val() !== "" && $('#login_password').val() !== "") {
            $.post('http://beavr.fr:3000/api/connection',
              {email: $('#login_email').val(), password: $('#login_password').val()}
            ).done((data) => {
                Cookie.createCookie("store_id", data.data.userId, 28);
                Cookie.createCookie("store_token", data.data.token, 28);
                var modal = new ProjectSelectionModal();
                $('#login_modal').animateCssOut('fadeOutLeft', modal);
            }).fail((err) => {
                console.log(err);
                if (err.responseText)
                    $('#login_error_message').removeClass("hidden");
                    console.debug("Lors de l'auth : " + err.responseText);
            })
        }
    }

    openProjectCreationModal() {
        var modal = new ProjectCreationModal(this);
        $('#login_modal').animateCssOut('fadeOutLeft', modal);
    }

    constructor() {
        super({
            events: {}
        });
        Loader.initStyles();
        this.render();
    }

    show(showAnim = true) {
        this.render();
        if (showAnim)
            $('#login_modal').animateCssIn('fadeInLeft');
    }

    initialize() {}

    render() {
        this.$el.html(this.template());
        return this;
    }

}

export default AuthModalView;