if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// three js scene elements
var container;
var scene, camera, light, renderer;
var controls, stats;

// geometry for point cloud
var geometry, mesh, material, texture;

// lines for skeleton
var line, line1, line2, line3;



// altering kinectron texture
var dClipping1, flrClipping1, xLeftClip1, xRightClip1;  

window.addEventListener('load', init);

function init() {

	// create three.js scene
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	stats = new Stats();
	container.appendChild( stats.dom );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 30, 13, 2000 );

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x000000, 1);
	container.appendChild( renderer.domElement );

	controls = new THREE.TrackballControls( camera, renderer.domElement );

	createKinectImg();
	  initSkeleton();


	// Set initial texture values from gui
	updateMaterial();

	initKinectron();

	initGui();

	window.addEventListener( 'resize', onWindowResize, false );

	animate();

}

function createKinectImg() {

	// set clipping and dimensions
	var width = 768, height = 424;
	var nearClipping = 850, farClipping = 4000;

	// texture for kinect image 
	texture = new THREE.Texture(img1);
	texture.minFilter = THREE.NearestFilter;

	// geo for kinect point cloud
	geometry = new THREE.BufferGeometry();

	// create verts for kinect
	var vertices = new Float32Array( width * height * 3 );

	for ( var i = 0, j = 0, l = vertices.length; i < l; i += 3, j ++ ) {

		vertices[ i ] = j % width;
		vertices[ i + 1 ] = Math.floor( j / width );

	}

	// vertices to geometry
	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

	// create shader material
	material = new THREE.ShaderMaterial( {

		uniforms: {

			"map1":         { value: texture },
			"width":        { value: width },
			"height":       { value: height },
			"nearClipping": { value: nearClipping },
			"farClipping":  { value: farClipping },
			"dClipping1": 	{ value: dClipping1 },
			"flrClipping1": { value: flrClipping1 },
			"pointSize":    { value: 2 },
			"zOffset":      { value: 1000 },
      "xLeftClip1":   { value: xLeftClip1 }, 
      "xRightClip1":  { value: xRightClip1 }
		},

		vertexShader: document.getElementById( 'vs' ).textContent,
		fragmentShader: document.getElementById( 'fs' ).textContent,
		blending: THREE.AdditiveBlending,
		depthTest: false, 
		depthWrite: false,
		transparent: true

	} );

	mesh = new THREE.Points( geometry, material );
	scene.add( mesh );
}

function initSkeleton() {
  var materialLine = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 });

  // start lines at random positions

  // one line for spine and left leg 

  var geometryLine = new THREE.Geometry();
  geometryLine.vertices.push(new THREE.Vector3(-1, 0, 0));
  geometryLine.vertices.push(new THREE.Vector3(0, 1, 0));
  geometryLine.vertices.push(new THREE.Vector3(1, 0, 0));
  geometryLine.vertices.push(new THREE.Vector3(1, 0, 0));
  geometryLine.vertices.push(new THREE.Vector3(1, 0, 0));
  geometryLine.vertices.push(new THREE.Vector3(1, 0, 0));
  geometryLine.vertices.push(new THREE.Vector3(1, 0, 0));

  line = new THREE.Line(geometryLine, materialLine);
  scene.add(line);

  // one line for left arm

  var geometryLine1 = new THREE.Geometry();
  geometryLine1.vertices.push(new THREE.Vector3(-1, 0, 0));
  geometryLine1.vertices.push(new THREE.Vector3(0, 1, 0));
  geometryLine1.vertices.push(new THREE.Vector3(1, 0, 0));
  geometryLine1.vertices.push(new THREE.Vector3(1, 0, 0));
  geometryLine1.vertices.push(new THREE.Vector3(1, 0, 0));
  
  line1 = new THREE.Line(geometryLine1, materialLine);
  scene.add(line1);

  // one line for right arm

  var geometryLine2 = new THREE.Geometry();
  geometryLine2.vertices.push(new THREE.Vector3(-1, 0, 0));
  geometryLine2.vertices.push(new THREE.Vector3(0, 1, 0));
  geometryLine2.vertices.push(new THREE.Vector3(1, 0, 0));
  geometryLine2.vertices.push(new THREE.Vector3(1, 0, 0));
  geometryLine2.vertices.push(new THREE.Vector3(1, 0, 0));
  
  line2 = new THREE.Line(geometryLine2, materialLine);
  scene.add(line2);

  // one line for right leg

  var geometryLine3 = new THREE.Geometry();
  geometryLine3.vertices.push(new THREE.Vector3(-1, 0, 0));
  geometryLine3.vertices.push(new THREE.Vector3(0, 1, 0));
  geometryLine3.vertices.push(new THREE.Vector3(1, 0, 0));
  geometryLine3.vertices.push(new THREE.Vector3(1, 0, 0));
  geometryLine3.vertices.push(new THREE.Vector3(1, 0, 0));
  
  line3 = new THREE.Line(geometryLine3, materialLine);
  scene.add(line3);
}


function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
	render();	
}

function render() {
	stats.update();
	controls.update();
	renderer.render( scene, camera );
}


