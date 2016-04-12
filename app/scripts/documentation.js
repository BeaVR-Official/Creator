//import Three from 'three';

/**
 * Created by urvoy_p on 10/03/16.
 */
class WebView {

    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.domElement);
    }

    /**
     * Toto
     * @param lolo
     * @param lola
     */
    lol(lolo, lola) {
        window.alert("lol: {this.scene}");
    }
}

export default WebView;

export const toto = 42;

export let too = 2;

export function fuuu() {
    return "fuuuuu";
}

export const Test = {
    lol: "lol",
    lol2: "pol"
};
