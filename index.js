const sidePanelWidth = 300;
var dragModelUrl = null;
var previewMeshLoaded = false;
var previewMeshLoading = false;

function onDragOver(event) {
    event.preventDefault();
    if(dragModelUrl === null)return;
    if(App.previewMesh === null && previewMeshLoading === false){
        previewMeshLoading = true;
        new THREE.OBJLoader().load(dragModelUrl, function(object){
            App.previewMesh = new THREE.Mesh(object.children[0].geometry, App.defaultMaterial);
            //Calc intersections with placement plane
            var intersects = App.getIntersectionsWithPlacementPlane();
            if(intersects[0]) {
                App.setPreviewMeshPosition(intersects[0].point);
            }
            App.addMeshToScene(App.previewMesh);
            previewMeshLoaded = true;
        });
    }else if(previewMeshLoaded){
        App.updateMouseDataByEvent(event);
        //Calc intersections with placement plane
        var intersects = App.getIntersectionsWithPlacementPlane();
        if(intersects[0]) {
            App.setPreviewMeshPosition(intersects[0].point);
        }
    }
}

function onDrop(event) {
    event.preventDefault();
    App.previewMesh = null;
    //Reset global vars
    dragModelUrl = null;
    previewMeshLoading = false;
    previewMeshLoaded = false;
}

function dragStart(event){
    //I`m don`t use  event.dataTransfer.setData because i need to get model url in onDragOver event, instead onDrop
    dragModelUrl = event.srcElement.getAttribute('model-url').toString()
}

