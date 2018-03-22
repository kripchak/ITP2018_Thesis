console.log(THREE);


function init(){

	var scene = new THREE.Scene();
	var gui = new dat.GUI();


	var enableFog = false;
	if (enableFog){
		scene.fog = new THREE.FogExp2(0xffffff, 0.2);
	}

	var box = getBox(1,1,1);
	var plane = getPlane(20);
	var pointLight = getPointLight(1);
	var sphere = getSphere(0.05);

	plane.name = 'plane-1';
	plane.rotation.x = Math.PI/2;
	box.position.y = box.geometry.parameters.height/2;
	pointLight.position.y = 1.5;
	pointLight.intensity = 2;

	gui.add(pointLight, 'intensity', 0, 10);
	gui.add(pointLight.position, 'y',0,5);

	scene.add(box);
	scene.add(plane);
	scene.add(pointLight);
	pointLight.add(sphere);


	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	);
	
	camera.position.z = 5;
	camera.position.x = 1;
	camera.position.y = 3;
	camera.lookAt(new THREE.Vector3(0,0,0));

	var renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.setClearColor(0xffffff);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('webgl').appendChild(renderer.domElement);
	
	var controls = new THREE.OrbitControls (camera, renderer.domElement);

	update(renderer,scene, camera, controls);

return scene;
}

function getBox(w,h,d){
	var geometry = new THREE.BoxGeometry(w,h,d);
	var material = new THREE.MeshPhongMaterial({
	color: 0x888888
	})

	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	mesh.castShadow = true;

return mesh;
}

function getSphere(size){
	var geometry = new THREE.SphereGeometry(size,24,24);
	var material = new THREE.MeshBasicMaterial({
	color: 0xffffff
	})

	var mesh = new THREE.Mesh(
		geometry,
		material
	);


return mesh;
}

function getPlane(size){
	var geometry = new THREE.PlaneGeometry(size,size);
	var material = new THREE.MeshPhongMaterial({
	color: 0x888888,
	side: THREE.DoubleSide
	})

	var mesh = new THREE.Mesh(
		geometry,
		material
	);

	mesh.receiveShadow = true;

return mesh;
}

function getPointLight(intensity){
	var light = new THREE.PointLight(0xffffff, intensity);
	light.castShadow = true;
	return light;

}

function update(renderer, scene, camera, controls){
	renderer.render(
		scene,
		camera
	);

	controls.update();

	var plane = scene.getObjectByName('plane-1');

	requestAnimationFrame(function(){
		update(renderer,scene,camera,controls);
	});

}



 init();
