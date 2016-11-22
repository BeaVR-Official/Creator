/**
 * Created by ekersale on 08/11/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';

import AuthModal from './AuthModalView';

require('../../../assets/styles/HelloWorld.scss');

class ObjectMenuView extends Backbone.View {

    get template() {
        return _.template(Loader.templates.HelloWorld);
    }

    get events() {
        return {
            'click .openAuthModal' : 'openAuthModal'
        };
    }

    get $el() {
        return $('.HelloWorldSelector');
    }

    openAuthModal() {
        new AuthModal().show(false);
    }

    constructor() {
        super({
            events: {}
        });
        this.render();
    }

    initialize() {}

    render() {
        this.$el.html(this.template());
        return this;
    }
}

export default ObjectMenuView;