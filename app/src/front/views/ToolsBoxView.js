/**
 * Created by ekersale on 13/11/2016.
 */

import Loader from '../utils';
import Backbone from 'backbone';

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
        };
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