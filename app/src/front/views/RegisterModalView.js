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