/**
 * Created by ekersale on 08/11/2016.
 */

import LeftBarView from './views/LeftBarView';
import AuthModalView from './views/AuthModalView';
import RegisterModalView from './views/RegisterModalView'
import ResetPasswordModalView from './views/ResetPasswordModalView'
import ProjectSelectionModalView from './views/ProjectSelectionModalView'
import ProjectCreationModalView from './views/ProjectCreationModalView'
import Backbone from 'backbone';
import SettingsBox from './views/SettingsBoxView';
import NextPrevBox from './views/NextPrevBoxView';
import ToolsBox from './views/ToolsBoxView';
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


    settings() {
        new ProjectSelectionModalView();
    }

    home() {
        new SettingsBox();
        new NextPrevBox();
        new ToolsBox();
        new TopBarView();
        new LeftBarView();
        this.AuthModal();
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