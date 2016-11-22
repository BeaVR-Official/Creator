/**
 * Created by napsters on 19/11/2016.
 */

import Router from "../Router";

import ItemMenu from "../models/ItemMenu";

import * as Backbone from 'backbone';

class ItemCollection extends Backbone.Collection {

    url() {
        return Router.base +  "/creator/itemList";
    }

    get model() {
        return ItemMenu;
    }

    constructor(params) {
        super(params);
    }

}

export default ItemCollection;
