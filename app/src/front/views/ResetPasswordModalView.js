/**
 * Created by Nicolas on 11/16/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import AuthModal from './AuthModalView';

class ResetPasswordModalView extends Backbone.View {

    get template() {
        return _.template(Loader.templates.ResetPasswordModal);
    }

    get events() {
        return {
            'click #back_button' : 'openAuthModal',
            'click #reset_password_button' : 'resetPassword'
        };
    }

    get $el() {
        return $('.ModalSelector');
    }

    resetPassword(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        if ($('#reset_password_email').val() !== "") {
            $.post('http://beavr.fr:3000/api/reset-password',
              {email: $('#reset_password_email').val()}
            ).done(() => {
                var modal = new AuthModal();
                $('#reset_password_modal').animateCssOut('fadeOutRight', modal);
            }).fail((err) => {
                console.log(err);
                if (err.responseText)
                    console.debug("Lors du reset : " + err.responseText);
            })
        }
    }

    constructor() {
        super({
            events: {}
        });
        Loader.initStyles();
    }

    openAuthModal() {
        var modal = new AuthModal();
        $('#reset_password_modal').animateCssOut('fadeOutRight', modal);
    }

    initialize() {}

    show() {
        this.render();
        $('#reset_password_modal').animateCssIn('fadeInRight');
    }

    render() {
        this.$el.html(this.template());
        return this;
    }
}

export default ResetPasswordModalView;