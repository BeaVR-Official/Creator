/**
 * Created by napsters on 19/11/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import * as _ from '../../../../node_modules/underscore';
import $ from 'jquery';

require('../../../assets/styles/ModalSelectMenu.scss');

class ModalSelectMenuView extends Backbone.View {

    get template() {

        return _.template(Loader.templates.ModalSelectMenu);
    }

    get events() {
        return {
        };
    }

    get $el() {
        return $('.ModalSelectMenu');
    }


    constructor() {

        super({
            events: {}
        });

        this.render();
    }


    render() {
        this.$el.html(this.template());
        return this;
    }
}

export default ModalSelectMenuView;