/**
 * Created by ekersale on 08/11/2016.
 */

import Router from './Router';
import Loader from './utils';
import Backbone from 'backbone';
import $ from 'jquery';

require('../../assets/styles/Fonts.scss');
require('../../assets/styles/Main.scss');

class Application {
    constructor() {
        Loader.loadTemplates(['AuthModal', 'RegisterModal', 'ResetPasswordModal', 'ProjectSelectionModal',
                'ProjectCreationModal', 'SettingsBox', 'NextPrevBox', 'ToolsBox', 'TopBar', 'Sidebar' ],
            function() {
                new Router();
                Backbone.history.start();
            }
        );
    }
}

$(() => {
    new Application();
});