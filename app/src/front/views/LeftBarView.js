/**
 * Created by napsters on 18/11/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import * as _ from '../../../../node_modules/underscore';
import $ from 'jquery';

import LeftBarSugarMaple from './LeftBarSugarMaple';


import ItemLeftMenu from '../models/ItemLeftMenu';
import LeftMenuCollection from  '../collections/LeftMenuCollection';

import LeftBarSub from '../views/LeftBarSub';

require('../../../assets/styles/LeftBar.scss');

class LeftBarView extends Backbone.View {

    //static var menuCollection = null;

    get template() {
        return _.template(Loader.templates.LeftBar);
    }

    get events() {
        return {
            'click #item1' : 'openThreeView',
            'click #item2' : 'openBasicObjects',
            'click #item3' : 'openLights',
            'click #item4' : 'openMaterials',
            'click #item5' : 'openSkyboxes',
            'click #item6' : 'addCategorie'
        };
    }

    openThreeView() {
        $('.LeftBarSubSelector').css('width', '220px');
        this.leftBar.switchLeftBarView({type: 'TreeView'});
    }

    openBasicObjects() {
        $('.LeftBarSubSelector').css('width', '220px');
        var objects = [];
        objects.push({name: "Cube", logo:'assets/images/cube.png', type: 'box'});
        objects.push({name: "Cylinder", logo:'assets/images/cylinder.png', type: 'cylinder'});
        objects.push({name: "Sphere", logo:'assets/images/sphere.png', type: 'sphere'});
        objects.push({name: "Add", logo:'assets/images/plus.png'});
        this.leftBar.switchLeftBarView({objects: objects});
    }

    openLights() {
        $('.LeftBarSubSelector').css('width', '220px');
        var objects = [];
        objects.push({name: "Ambiente", logo:'assets/images/ambientLight.png'});
        objects.push({name: "Directionnelle", logo:'assets/images/directionalLight.png'});
        objects.push({name: "Pointée", logo:'assets/images/pointLight.png'});
        objects.push({name: "Spot", logo:'assets/images/spotLight.png'});
        objects.push({name: "Add", logo:'assets/images/plus.png'});
        this.leftBar.switchLeftBarView({objects: objects});
    }

    openMaterials() {
        $('.LeftBarSubSelector').css('width', '220px');
        var objects = [];
        objects.push({name: "Sable", logo:'assets/images/sand.png'});
        objects.push({name: "Pierre", logo:'assets/images/stone.png'});
        objects.push({name: "Herbe", logo:'assets/images/grass.png'});
        objects.push({name: "Bois", logo:'assets/images/wood.png'});
        this.leftBar.switchLeftBarView({objects: objects});
    }

    openSkyboxes() {
        $('.LeftBarSubSelector').css('width', '220px');
        var objects = [];
        objects.push({name: "Désert", logo:'assets/images/DesertIcon.png'});
        objects.push({name: "Ciel", logo:'assets/images/skyIcon.png'});
        objects.push({name: "Ville", logo:'assets/images/townIcon.png'});
        objects.push({name: "Nuit", logo:'assets/images/nightIcon.png'});
        objects.push({name: "Add", logo:'assets/images/plus.png'});
        this.leftBar.switchLeftBarView({objects: objects});
    }

    addCategorie() {
        this.menuCollection.add(
          new ItemLeftMenu({id: 7, name: 'special', logo: 'fa fa-question', isUsed:true}),
          {at: this.menuCollection.models.length - 1}
        );
    }

    get $el() {
        return $('.LeftBarSelector');
    }

    constructor() {

        super({
            events: {}
        });

        Loader.initStyles();

        var itemsMenu = [];

        itemsMenu.push(new ItemLeftMenu({id: 1, name: 'Three View', logo: 'list icon', isUsed:true}));
        itemsMenu.push(new ItemLeftMenu({id: 2, name: 'Objects', logo: 'cubes icon', isUsed:true}));
        itemsMenu.push(new ItemLeftMenu({id: 3, name: 'Lights', logo: 'fa fa-lightbulb-o', isUsed:true}));
        itemsMenu.push(new ItemLeftMenu({id: 4, name: 'Materials', logo: 'fa fa-tint', isUsed:true}));

        itemsMenu.push(new ItemLeftMenu({id: 5, name: 'SkyBox', logo: 'fa fa-globe', isUsed: true}));

        itemsMenu.push(new ItemLeftMenu({id: 6, name: 'Add', logo: 'fa fa-plus', isUsed:true}));

        this.menu = new LeftMenuCollection(itemsMenu);
        this.menuCollection = this.menu;

/*
        this.menu.bind('add', this.render);
*/
        this.listenTo(this.menu, 'all', this.render);

        this.render();

        this.leftBar = new LeftBarSub();
        this.openThreeView();

        let leftBarSugarMaple = new LeftBarSugarMaple();
        leftBarSugarMaple.initializeSugar();
    }

    render() {
        this.$el.html(this.template({
            menu: this.menu.toJSON()
        }));
        return this;
    }
}

export default LeftBarView;
