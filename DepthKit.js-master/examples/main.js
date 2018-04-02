//Some general Three.js components
        var renderer,
            scene,
            camera,
            dolly,
            controls,
            raycaster,
            mouse = new THREE.Vector2(0, 0);

        //DepthKit character
        var character;


var cnt = 0.0;
var boxWristL, boxWristR, boxHandL, boxHandR;

function initThreeJS() {

            //Check availablity of the WebVR API - the polyfill polyfills .getVRDisplays() but should still not find any display if there isn't one
			WEBVR.checkAvailability().catch( function( message ) {
				document.body.appendChild( WEBVR.getMessageContainer( message ) );
			});

            //Setup renderer
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.vr.enabled = true;
            document.body.appendChild(renderer.domElement);

            // Setup scene
            scene = new THREE.Scene();

            // Setup camera and dolly to move the camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 500);

            // Use a group or an empty Object3D class to control the camera position/rotation
            dolly = new THREE.Group();
            dolly.add(camera);
            dolly.rotateY(Math.PI);
            dolly.position.set(0, 1.5, -2);
            scene.add(dolly);

            // Setup webVR display/polyfill and add button
            WEBVR.getVRDisplay(function (display) {
                renderer.vr.setDevice(display);
                document.body.appendChild(WEBVR.getButton(display, renderer.domElement));
            });

            //** To use webVR for Vive/Rift, Chormium requires a .webm video file

            //DepthKit(mesh/wire/points rendering, path to txt, path to video)
            character = new DepthKit("mesh", "../assets/Chae/Chae_Demo_Upres.txt", "../assets/Chae/Chae_Demo_Upres.webm");

            //Position and rotation adjustments
            character.scale.set(0.001, 0.001, 0.001);
            character.position.y = 1.1;
            character.rotateZ(Math.PI / 2);
            character.rotateX(Math.PI);

            //Make it loop once activated
            character.depthkit.setLoop(true);

            //Hit play
            character.depthkit.play();

            //Add the character to the scene
            scene.add(character);

            // A grid helper as a floor reference
			var gridHelper = new THREE.GridHelper(10, 10);
			scene.add(gridHelper);

            window.addEventListener('resize', onWindowResize, false);


        }

function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

function update(){
            renderer.animate( render );

            render();
        }

function render() {

            renderer.render(scene, camera);

        }



function initKinectron(){
	var kinectron = new Kinectron("172.16.227.214"); // Add Kinectron IP address here
	kinectron.makeConnection();

	kinectron.setColorCallback(colorCallback);
	kinectron.setDepthCallback(depthCallback);
	kinectron.setBodiesCallback(bodyCallback);
	kinectron.startMultiFrame(["color", "depth", "body"]);
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
update();




       

