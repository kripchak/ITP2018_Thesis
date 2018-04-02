
var scene, camera, renderer, controls;

var cnt = 0.0;
var boxWristL, boxWristR, boxHandL, boxHandR;

function initKinectron(){
	var kinectron = new Kinectron("172.16.227.214"); // Add Kinectron IP address here
	kinectron.makeConnection();

	kinectron.setColorCallback(colorCallback);
	kinectron.setDepthCallback(depthCallback);
	kinectron.setBodiesCallback(bodyCallback);
	kinectron.startMultiFrame(["color", "depth", "body"]);
}

function initThreeJS() {

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000 
	);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('webgl').appendChild(renderer.domElement);

	controls = new THREE.OrbitControls(camera,renderer.domElement);

	// Listen for window resize  
  	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function rendering() {
	update();

	//controls.update();

	renderer.render(
		scene,
		camera
	);
	requestAnimationFrame(function(){
		rendering();
	});
}

function getBox(w, h, d, coloring) {
	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshBasicMaterial({
		color: coloring
	});

	var mesh = new THREE.Mesh(
		geometry,
		material
	);

	return mesh;
}

function getPlane(w, d, coloring){
	var geometry = new THREE.PlaneGeometry(w,d);
	var material = new THREE.MeshBasicMaterial({
		color:coloring,
		side: THREE.DoubleSide
	});

	var mesh = new THREE.Mesh(
		geometry,
		material
		);

	return mesh;
}

function initialDraw(){
	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 5;
	camera.lookAt (new THREE.Vector3(0, 0, 0));

	boxWristL = getBox(.1, .1, .1, 0x00ff00);
	boxWristL.position.x = -1 * boxWristL.geometry.parameters.width;

	boxWristR = getBox(.1, .1, .1, 0x00ff00);
	boxWristR.position.x = boxWristR.geometry.parameters.width;

	boxHandL = getBox(.1, .1, .1, 0x0000ff);
	boxHandL.position.x = -1 * boxHandL.geometry.parameters.width * 2;

	boxHandR = getBox(.1, .1, .1, 0x0000ff);
	boxHandR.position.x = boxHandR.geometry.parameters.width * 2;

	var plane = getPlane(4, 4, 0xff0000);
	plane.rotation.x = Math.PI/2;
	plane.name = 'plane-1';

	scene.add(boxWristL);
	scene.add(boxWristR);
	scene.add(boxHandL);
	scene.add (boxHandR);
	scene.add(plane);
}

function update(){

	//var plane = scene.getObjectByName('plane-1');
	//scene.traverse(function(child){
	//});
//	cnt += .01;
//	boxWristL.position.y = Math.sin(cnt);
}

function colorCallback(colorImg){

}

function depthCallback(depthImg){

}

function bodyCallback(bodies){
	var bodyScale = 5.0;

	for (var i =0; i < bodies.length; i++){
		if (bodies[i].tracked) {
     		boxWristL.position.x = bodies[i].joints[6].cameraX*bodyScale;
     		boxWristL.position.y = bodies[i].joints[6].cameraY*bodyScale;
      		boxWristL.position.z = bodies[i].joints[6].cameraZ*bodyScale;

      		boxWristR.position.x = bodies[i].joints[10].cameraX*bodyScale;
     		boxWristR.position.y = bodies[i].joints[10].cameraY*bodyScale;
      		boxWristR.position.z = bodies[i].joints[10].cameraZ*bodyScale;

      		boxHandL.position.x = bodies[i].joints[7].cameraX*bodyScale;
     		boxHandL.position.y = bodies[i].joints[7].cameraY*bodyScale;
      		boxHandL.position.z = bodies[i].joints[7].cameraZ*bodyScale;

      		boxHandR.position.x = bodies[i].joints[11].cameraX*bodyScale;
     		boxHandR.position.y = bodies[i].joints[11].cameraY*bodyScale;
      		boxHandR.position.z = bodies[i].joints[11].cameraZ*bodyScale;
		}
    }
}


initKinectron();
initThreeJS();
initialDraw();
rendering();