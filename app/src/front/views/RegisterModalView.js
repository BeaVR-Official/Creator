/**
 * Created by Nicolas on 11/13/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

import AuthModal from './AuthModalView';

class RegisterModalView extends Backbone.View {

    get template() {
        return _.template(Loader.templates.RegisterModal);
    }

    get events() {
        return {
            'click #back_button' : 'openAuthModal',
            'click #register_user_button' : 'registerUser'
        };
    }

    get $el() {
        return $('.ModalSelector');
    }

    registerUser(e) {
        e.stopImmediatePropagation();
        if ($('#register_email').val() !== "" && $('#register_password').val() !== ""
          && $('#register_pseudo').val() !== "" && $('#register_firstname').val() !== ""
          && $('#register_lastname').val() !== "") {
            $.post('http://beavr.fr:3000/api/users',
              {email: $('#register_email').val(), password: $('#register_password').val(), pseudo: $('#register_pseudo').val(),
              firstName: $('#register_firstname').val(), lastName: $('#register_lastname').val()}
            ).done(() => {
                var modal = new AuthModal();
                $('#register_modal').animateCssOut('fadeOutRight', modal);
            }).fail((err) => {
                console.log(err);
                if (err.responseText)
                    console.debug("Lors du register : " + err.responseText);
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
        $('#register_modal').animateCssOut('fadeOutRight', modal);
    }

    initialize() {}

    show() {
        this.render();
        $('#register_modal').animateCssIn('fadeInRight');
    }

    render() {
        this.$el.html(this.template());
        return this;
    }
}

export default RegisterModalView;