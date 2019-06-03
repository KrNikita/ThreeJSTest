
var App = {
    planeMesh: null,
    mouse: null,
    defaultMaterial: null,
    raycaster: null,
    scene: null,
    camera: null,
    previewMesh: null,

    updateMouseDataByEvent: function(event){
        this.mouse.x = ( event.clientX / (window.innerWidth - sidePanelWidth) ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    },

    getIntersectionsWithPlacementPlane: function(){
    	//Setup raycaster
        this.raycaster.setFromCamera( this.mouse, this.camera );
        return this.raycaster.intersectObject(this.planeMesh);
    },

    setPreviewMeshPosition: function(position){
        this.previewMesh.position.set(position.x, position.y, position.z);
    },

    addMeshToScene: function(mesh){
        this.scene.add(mesh);
    },

    initialize: function(){
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        //Create default material for all meshes
        this.defaultMaterial = new THREE.MeshLambertMaterial();
        //Create geometry which will be used as zone for dragged objects placement
        var _geometry = new THREE.Geometry();
        _geometry.vertices.push(
            new THREE.Vector3(-1000, 0, -1000),
            new THREE.Vector3(-1000, 0, 1000),
            new THREE.Vector3(1000, 0, 1000),
            new THREE.Vector3(1000, 0, -1000));

        _geometry.faces.push(
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(2, 3, 0)
        );
        this.planeMesh = new THREE.Mesh(_geometry);
    },

    start: function(){
        //Init render here and add canvas to main_viewport div
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth - 300, window.innerHeight);
        document.getElementsByClassName('main_viewport')[0].appendChild(renderer.domElement);

        //Set camera default position
        this.camera.position.set(0, 2, 5);

        //Create orbit camera control
        var controls = new THREE.OrbitControls(this.camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 10;
        controls.maxDistance = 100;
        controls.maxPolarAngle = Math.PI;

        //Add light and grid
        var ambientLight = new THREE.AmbientLight(0xcccccc, 0.3);
        this.scene.add(ambientLight);

        var light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 10, 0);
        this.scene.add(light);

        var gridHelper = new THREE.GridHelper(100, 200);
        this.scene.add(gridHelper);

        //Run render loop
        var render = function () {
            requestAnimationFrame(render);
            renderer.render(this.scene, this.camera);
        }.bind(this);

        render();
    },
}
