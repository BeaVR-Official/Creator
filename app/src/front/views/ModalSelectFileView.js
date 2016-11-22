/**
 * Created by napsters on 19/11/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import * as _ from '../../../../node_modules/underscore';
import $ from 'jquery';

require('../../../assets/styles/ModalSelectFile.scss');

class ModalSelectFileView extends Backbone.View {

    get template() {

        return _.template(Loader.templates.ModalSelectFile);
    }

    get events() {
        return {
        };
    }

    get $el() {
        return $('.ModalSelectFile');
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

export default ModalSelectFileView;