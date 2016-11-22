import Loader from '../utils';
import Backbone from 'backbone';

require('../../../assets/styles/Sidebar.scss');

class SidebarView extends Backbone.View {

    get template() {
        return _.template(Loader.templates.Sidebar);
    }

    get $el() {
        return $('.SidebarSelector');
    }

    get events() {
        return {
        };
    }

    constructor() {
        super();
        this.render();
    }

    initialize() {
    }

    render() {
        this.$el.html(this.template());
        return this;
    }

}

export default SidebarView;