/**
 * Created by napsters on 19/11/2016.
 */

import Router from "../Router";
import * as Backbone from 'backbone';

class ItemMenu extends Backbone.Model {

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
            category:'',
            modelPath: '',
            isUsed: false,
            isMadeByUser: false
        };
    }

}

export default ItemMenu;