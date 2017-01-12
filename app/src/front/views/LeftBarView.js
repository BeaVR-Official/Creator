/**
 * Created by napsters on 18/11/2016.
 */

//Ne pas supprimer cet import "unused"
import LeftBarSugarMaple from './LeftBarSugarMaple';

import Loader from '../utils';
import * as Backbone from 'backbone';
import * as _ from '../../../../node_modules/underscore';
import $ from 'jquery';

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
      'click #item1': 'openThreeView',
      'click #item2': 'openBasicObjects',
      'click #item3': 'openLights',
      'click #item4': 'openMaterials',
      'click #item5': 'openSkyboxes',
      'click #item6': 'addCategorie'
    };
  }

  openThreeView() {
    this.leftBar.switchLeftBarView({type: 'TreeView'});
  }

  openBasicObjects() {
    var objects = [];
    objects.push({name: "Cube", logo: 'assets/images/cube.png', type: 'box', typeOfImport: 'default'});
    objects.push({name: "Cylinder", logo: 'assets/images/cylinder.png', type: 'cylinder', typeOfImport: 'default'});
    objects.push({name: "Sphere", logo: 'assets/images/sphere.png', type: 'sphere', typeOfImport: 'default'});
    objects.push({name: "Add", logo: 'assets/images/plus.png', type: 'add', typeOfImport: 'default'});
    this.leftBar.switchLeftBarView({objects: objects});
  }

  openLights() {
    var objects = [];
    objects.push({name: "Ambiente", logo: 'assets/images/ambientLight.png', type: 'ambient', typeOfImport: 'default'});
    objects.push({name: "Directionnelle", logo: 'assets/images/directionalLight.png', type: 'directional', typeOfImport: 'default'});
    objects.push({name: "Radiale", logo: 'assets/images/pointLight.png', type: 'point', typeOfImport: 'default'});
    objects.push({name: "Spot", logo: 'assets/images/spotLight.png', type: 'spot', typeOfImport: 'default'});
    this.leftBar.switchLeftBarView({objects: objects});
  }

  openMaterials() {
    var objects = [];
    objects.push({name: "Sable", logo: 'assets/images/sand.png', type: 'ground', resource:'assets/images/groundTex/ground_4.png', typeOfImport: 'default'});
    objects.push({name: "Pierre", logo: 'assets/images/stone.png', type: 'ground', resource:'assets/images/groundTex/ground_3.png', typeOfImport: 'default'});
    objects.push({name: "Herbe", logo: 'assets/images/grass.png', type: 'ground', resource:'assets/images/groundTex/ground_1.png', typeOfImport: 'default'});
    objects.push({name: "Bois", logo: 'assets/images/wood.png', type: 'ground', resource:'assets/images/groundTex/ground_2.png', typeOfImport: 'default'});
    // objects.push({name: "Add", logo: 'assets/images/plus.png'});
    this.leftBar.switchLeftBarView({objects: objects});
  }

  openSkyboxes() {
    var objects = [];
    objects.push({name: "Désert", logo: 'assets/images/DesertIcon.png', type: 'sky', resource:'assets/skyBox/sky_1'});
    objects.push({name: "Ciel", logo: 'assets/images/skyIcon.png', type: 'sky', resource:'assets/skyBox/sky_1'});
    objects.push({name: "Ville", logo: 'assets/images/townIcon.png', type: 'sky', resource:'assets/skyBox/sky_1'});
    objects.push({name: "Nuit", logo: 'assets/images/nightIcon.png', type: 'sky', resource:'assets/skyBox/sky_1'});
    // objects.push({name: "Add", logo: 'assets/images/plus.png'});
    this.leftBar.switchLeftBarView({objects: objects});
  }

  addCategorie() {
    this.menuCollection.add(
      new ItemLeftMenu({id: 7, name: 'special', logo: 'fa fa-question', isUsed: true}),
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

    itemsMenu.push(new ItemLeftMenu({id: 1, name: 'Three View', logo: 'list icon', isUsed: true}));
    itemsMenu.push(new ItemLeftMenu({id: 2, name: 'Objects', logo: 'cubes icon', isUsed: true}));
    itemsMenu.push(new ItemLeftMenu({id: 3, name: 'Lights', logo: 'fa fa-lightbulb-o', isUsed: true}));
    itemsMenu.push(new ItemLeftMenu({id: 4, name: 'Materials', logo: 'fa fa-tint', isUsed: true}));

    itemsMenu.push(new ItemLeftMenu({id: 5, name: 'SkyBox', logo: 'fa fa-globe', isUsed: true}));

    itemsMenu.push(new ItemLeftMenu({id: 6, name: 'Add', logo: 'fa fa-plus', isUsed: true}));

    this.menu           = new LeftMenuCollection(itemsMenu);
    this.menuCollection = this.menu;

    /*
     this.menu.bind('add', this.render);
     */
    this.listenTo(this.menu, 'all', this.render);

    this.render();

    this.leftBar = new LeftBarSub();
    this.openThreeView();
  }

  initialize() {
  }

  render() {
    this.$el.html(this.template({
      menu: this.menu.toJSON()
    }));
    return this;
  }
}

export default LeftBarView;
