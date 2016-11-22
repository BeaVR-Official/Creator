/**
 * Created by napsters on 18/11/2016.
 */

import Router from "../Router";

import ItemLeftMenu from "../models/ItemLeftMenu";

import * as Backbone from 'backbone';

class LeftMenuCollection extends Backbone.Collection {

    url() {
        return Router.base +  "/creator/categories";
    }

    get model() {
        return ItemLeftMenu;
    }

    constructor(params) {
        super(params);
    }
}

export default LeftMenuCollection;

