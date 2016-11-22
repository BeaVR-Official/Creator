/**
 * Created by napsters on 18/11/2016
 */

import Router from "../Router";
import * as Backbone from 'backbone';

class ItemLeftMenu extends Backbone.Model{

    get idAttribute(){
        return '_id';
    }

    get cidPrefix(){
        return '__c';
    }

    url(){
        return "" + Router.base;
    }

    defaults(){

        return {
            id: -1,
            name: '',
            logo: '',
            isUsed: false
        };
    }

    get(name){
        return this.attributes[name];
    }
}

export default ItemLeftMenu;