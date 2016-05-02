/**
 * Created by urvoy_p on 24/04/16.
 */

import CreatorUI from './modules/Creator.ui.js';
import Creator from './modules/Creator.js';

debugger;

// require('offline-plugin/runtime').install();

let creatorUI = new CreatorUI("#mainView", Creator);

// Sample
Creator.addCircle(5,32, 32);
Creator.addLight();
