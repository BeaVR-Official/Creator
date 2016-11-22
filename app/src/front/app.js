/**
 * Created by ekersale on 08/11/2016.
 */

import Router from './Router';
import Loader from './utils';
import * as Backbone from 'backbone';
import $ from 'jquery';

require('../../assets/styles/fonts.scss');
require('../../assets/styles/main.scss');

class Application {
    constructor() {
        Loader.loadTemplates(['AuthModal', 'RegisterModal', 'ResetPasswordModal', 'ProjectSelectionModal',
                'ProjectCreationModal', 'SettingsBox', 'NextPrevBox', 'ToolsBox', 'TopBar'  ],
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