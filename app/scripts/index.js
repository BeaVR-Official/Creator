/**
 * Created by kersal_e on 11/04/2016.
 */

class Creator {
    constructor(width, height) {

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            35,             // Field of view
            800 / 600,      // Aspect ratio
            0.1,            // Near plane
            10000           // Far plane
        );
        this.camera.position.set(-15, 10, 10);
        this.camera.lookAt(this.scene.position);
    }

    addBox() {
        var geometry = new THREE.BoxGeometry(5, 5, 5);
        var material = new THREE.MeshLambertMaterial({color: 0xFF0000});
        var mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
    }

    addLight() {
        var light = new THREE.PointLight(0xFFFF00);
        light.position.set(10, 0, 10);
        this.scene.add(light);
    }

    render() {
        this.renderer.setClearColor(0xdddddd, 1);
        this.renderer.render(this.scene, this.camera);
    }

    getScene() {
        return this.scene;
    }

    setRenderSize(width, height) {
        this.renderer.setSize(width, height);
    }
}

var creator = new Creator($(window).width(), $(window).height());
creator.addBox();
creator.addLight();
creator.render();

window.scene = creator.getScene();

$("body").bind("blur focus focusin focusout load resize scroll unload click" + " dblclick mousedown mouseup mousemove mouseover mouseout mouseenter " + "mouseleave change select submit keydown keypress keyup error", function (e) {
    creator.render();
});

$(window).resize(function () {
    creator.setRenderSize($(window).width(), $(window).height());
});

console.log("coucou");
console.log("e");
