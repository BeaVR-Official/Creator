/**
 * Created by ekersale on 08/11/2016.
 */

import HelloWorldView from './views/HelloWorldView';
import AuthModalView from './views/AuthModalView';
import RegisterModalView from './views/RegisterModalView'
import ResetPasswordModalView from './views/ResetPasswordModalView'
import ProjectSelectionModalView from './views/ProjectSelectionModalView'
import ProjectCreationModalView from './views/ProjectCreationModalView'
import * as Backbone from 'backbone';
import SettingsBox from './views/SettingsBox';
import NextPrevBox from './views/NextPrevBox';
import ToolsBox from './views/ToolsBox';
import TopBarView from './views/TopBarView';


class Router extends Backbone.Router {

    constructor() {
        super({
            routes: {
                '': 'StartMenu',
                'settings': 'settings'
            }
        });
    }

    StartMenu() {
        this.home();
        /*var authModal = new AuthModalView();
        authModal.show(false);*/
    }

/*    HelloWorld() {
        new HelloWorldView();
    }*/

    settings() {
        new ProjectSelectionModalView();
    }

    home() {
        new SettingsBox();
        new NextPrevBox();
        new ToolsBox();
        new TopBarView();
    }

    AuthModal() {
        new AuthModalView();
    }

    RegisterModal() {
        new RegisterModalView();
    }

    ResetPasswordModal() {
        new ResetPasswordModalView();
    }

    ProjectSelectionModal() {
        new ProjectSelectionModalView();
    }

    ProjectCreationModal() {
        new ProjectCreationModalView();
    }

}

export default Router;