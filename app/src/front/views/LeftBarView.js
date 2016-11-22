/**
 * Created by napsters on 18/11/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import * as _ from '../../../../node_modules/underscore';
import $ from 'jquery';

import ContainerObject from '../views/ContainerObjectView';
import ModalSelectFile from '../views/ModalSelectFileView';
import ModalSelectMenu from '../views/ModalSelectMenu';


import ItemLeftMenu from '../models/ItemLeftMenu';
import LeftMenuCollection from  '../collections/LeftMenuCollection';

require('../../../assets/styles/LeftBar.scss');

class LeftBarView extends Backbone.View {

    //static var menuCollection = null;

    get template() {

        return _.template(Loader.templates.LeftBar);
    }



    get events() {
        return {
            'click #item2' : 'openContainerObject',
            'click #item3' : 'addFile',
            'click #item4' : 'addMenu',
        };
    }

    get $el() {
        return $('.LeftBarSelector');
    }

    addMenu(){

        console.log(this.menuCollection);

        var modalMenu = new ModalSelectMenu();
        modalMenu.render();
    }

    openContainerObject() {


        //this.menu.push(new ItemLeftMenu({id: 5, name: 'Test', logo: 'list icon', isUsed:true}));

        //console.log(this.menu);

        var container = new ContainerObject();
        container.render();
    }

    addFile(){

       var modal = new ModalSelectFile();
       modal.render();
    }

    constructor() {

        super({
            events: {}
        });

        Loader.initStyles();

        var itemsMenu = [];

        itemsMenu.push(new ItemLeftMenu({id: 1, name: 'Three View', logo: 'list icon', isUsed:true}));
        itemsMenu.push(new ItemLeftMenu({id: 2, name: 'Topics', logo: 'cubes icon', isUsed:true}));
        itemsMenu.push(new ItemLeftMenu({id: 3, name: 'Settings', logo: 'puzzle icon', isUsed:true}));
        itemsMenu.push(new ItemLeftMenu({id: 4, name: 'Ajouter', logo: 'plus square outline icon', isUsed:true}));

        itemsMenu.push(new ItemLeftMenu({id: 4, name: 'Environnement', logo: 'plus square outline icon', isUsed:false}));
        itemsMenu.push(new ItemLeftMenu({id: 4, name: 'Textures', logo: 'plus square outline icon', isUsed:false}));
        itemsMenu.push(new ItemLeftMenu({id: 4, name: 'Scripts', logo: 'plus square outline icon', isUsed:false}));


        this.menu = new LeftMenuCollection(itemsMenu);
        this.menuCollection = this.menu;

        this.menu.bind('add', this.render);


        this.render();
    }

    render() {

        console.log("RENDER :>");
        console.log(this.menu);

        this.$el.html(this.template({
            menu: this.menu.toJSON()
        }));
        return this;
    }

    /*
    render() {
        this.$el.html(this.template());
        return this;
    }*/
}

export default LeftBarView;
