/**
 * Created by kersal_e on 11/04/2016.
 */

class Creator {
    constructor(width, height, ui) {
        this.ui = ui;
        document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0xdddddd, 1);
        $(".SceneView").append(this.renderer.domElement);

        this.dCamera = new THREE.PerspectiveCamera( 50, 1, 0.1, 10000 );
        this.dCamera.name = 'Camera';
        this.dCamera.position.set( 20, 10, 20 );
        this.dCamera.lookAt( new THREE.Vector3() );
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            35,             // Field of view
            800 / 600,      // Aspect ratio
            0.1,            // Near plane
            10000           // Far plane
        );
        this.camera.position.set(-15, 10, 10);
        this.camera.lookAt(this.scene.position);
        this.raycaster = new THREE.Raycaster();
    }

    addBox() {
        var geometry = new THREE.BoxGeometry(5, 5, 5);
        var material = new THREE.MeshLambertMaterial({color: 0xFF0000});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.userData.id = _.uniqueId();
        mesh.name= 'box_' + mesh.userData.id;
        mesh.mirroredLoop = true;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
    }

    display() {
        console.log("coucou");
    }

    addLight() {
        var light = new THREE.PointLight(0xFFFF00);
        light.position.set(10, 0, 10);
        this.scene.add(light);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    select(mouse) {
        if (mouse == undefined)
            return;
        console.log(mouse);
        this.raycaster.setFromCamera(mouse, this.camera);

        // calculate objects intersecting the picking ray
        var intersects = this.raycaster.intersectObjects( this.scene.children );

        for ( var i = 0; i < intersects.length; i++ ) {
            this.ui.pushDataInView(intersects[ i ].object);
            console.log(intersects[ i ].object);
        }
    }

    getScene() {
        return this.scene;
    }

    setRenderSize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}

class UI {
    pushDataInView (object) {
        $(".objectName").val(object.name);
        $(".TransPosX").val(object.position.x);
        $(".TransPosY").val(object.position.y);
        $(".TransPosZ").val(object.position.z);
        $(".TransRotX").val(object.rotation.x);
        $(".TransRotY").val(object.rotation.y);
        $(".TransRotZ").val(object.rotation.z);
        $(".TransScaleX").val(object.scale.x);
        $(".TransScaleY").val(object.scale.y);
        $(".TransScaleZ").val(object.scale.z);
    }
}

var ui = new UI();
var creator = new Creator($(window).width(), $(window).height(), ui);
creator.addBox();
creator.addLight();
creator.render();

function onMouseClick( event ) {
    var mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    creator.select(mouse);
}

window.addEventListener( 'click', onMouseClick, false );


window.scene = creator.getScene();

console.log("coucou");

$("body").bind("blur focus focusin focusout load resize scroll unload click" + " dblclick mousedown mouseup mousemove mouseover mouseout mouseenter " + "mouseleave change select submit keydown keypress keyup error", function (e) {
    creator.render();
});

$(window).resize(function () {
    creator.setRenderSize($(window).width(), $(window).height());
});

$(".menuRightMiddle").draggable({containment: '.SceneView'});

$(".menuLeftMiddle").draggable({containment: '.SceneView'});

var data = [
    {
        label: 'Main Camera',
        children: [
            { label: 'Sphere',
            children : [
                { label : 'DirectionalLight' },
                { label : 'SpotLight'},
                { label : 'Material'}
            ]},
            {
                label: 'Cube',
                children: [{
                    label: 'material'
                }]
            }
        ]
    }
];

$(function() {
    $('#tree1').tree({
        data: data,
        dragAndDrop: true,
        autoOpen: 0
    });
});

