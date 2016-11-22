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
            'click #back_button' : 'openAuthModal'
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