/**
 * Created by napsters on 18/11/2016.
 */

import Loader from '../utils';
import * as Backbone from 'backbone';
import * as _ from '../../../../node_modules/underscore';
import $ from 'jquery';

import Item from '../models/ItemMenu';
import ItemMenuCollection from '../collections/ItemMenuCollection';


require('../../../assets/styles/ContainerObject.scss');

class ContainerObjectView extends Backbone.View {

    get template() {

        return _.template(Loader.templates.ContainerObject);
    }

    get events() {
        return {
            'click .removeButton' : 'removeObjet',
        };
    }

    removeObjet(e){

        //get l'id de l'objet à remove
        console.log(e.currentTarget.id);

        //console.log("this =>");
        console.log(this);

        this.object.remove(this.object.at(e.currentTarget.id - 1));

        console.log("Size collection ");
        console.log(this.object);

        this.$el.html(this.template({
            object: this.object.toJSON()
        }));
        return this;

    }
    get $el() {
        return $('.ContainerObjectSelector');
    }


    constructor() {

        super({
            events: {}
        });

        let objectByCategorie = [];
        var i = 0;


        objectByCategorie.push(new Item({id: 1, name: 'Three View 1', logo: 'lightning icon', category: '', modelPath: '', isUsed:true, isMadeByUser:''}));
        objectByCategorie.push(new Item({id: 2, name: 'Three View 2', logo: 'legal icon', category: '', modelPath: '', isUsed:true, isMadeByUser:''}));
        objectByCategorie.push(new Item({id: 3, name: 'Three View 3', logo: 'magnet icon', category: '', modelPath: '', isUsed:true, isMadeByUser:''}));
        objectByCategorie.push(new Item({id: 4, name: 'Three View 4', logo: 'sun icon', category: '', modelPath: '', isUsed:true, isMadeByUser:true}));

        objectByCategorie.push(new Item({id: 5, name: 'Three View 5', logo: 'rocket icon', category: '', modelPath: '', isUsed:false, isMadeByUser:true}));
        objectByCategorie.push(new Item({id: 5, name: 'Three View 5', logo: 'keyboard icon', category: '', modelPath: '', isUsed:false, isMadeByUser:true}));
        objectByCategorie.push(new Item({id: 5, name: 'Three View 5', logo: 'hotel icon', category: '', modelPath: '', isUsed:false, isMadeByUser:true}));
        objectByCategorie.push(new Item({id: 5, name: 'Three View 5', logo: 'paw icon', category: '', modelPath: '', isUsed:false, isMadeByUser:true}));



        this.object = new ItemMenuCollection(objectByCategorie);

        //this.object.bind('change add remove reset', this.render);
        this.render();
    }

    render() {
        this.$el.html(this.template({
            object: this.object.toJSON()
        }));
        return this;
    }

    /*render() {
        this.$el.html(this.template());
        return this;
    }*/
}

export default ContainerObjectView;
