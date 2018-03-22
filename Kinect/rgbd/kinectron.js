// Declare kinectron
var kinectron;

// Use image to draw incoming feed
var img1 = new Image();

// Control image processing
var busy = false;

function initKinectron() {

	// Define and create an instance of kinectron
  var kinectronIpAddress = "172.16.224.214"; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron(kinectronIpAddress);

  // Open connection to Kinectron app
  kinectron.makeConnection();

  // Start rgbd feed and send received data to callback
  kinectron.startTrackedBodies(drawJoints);
  kinectron.startRGBD(drawKinectImg);
  //kinectron.startTrackedBodies(drawJoints); 
}

// Use '9' key to stop kinect from running 
window.addEventListener('keydown', function(event){
	
	if (event.keyCode === 57) {
		  kinectron.stopAll();
	}

});


function drawKinectImg(data) {

  // Return if currently processing an image
	if (busy) {
    return;
  }

	// Image data needs to be draw to img element before texture
  // Only draw if there is an image from Kinectron
  if (data.src) {

    busy = true; 

    // get color and depth image from kinectron data
    img1.src = data.src; 

    // when image loads update texture
    img1.onload = function() {
      material.needsUpdate = true;
      texture.needsUpdate = true;
    };
    
    // clear the callstack to avoid stack overflow 
    // see https://stackoverflow.com/questions/8058612/does-calling-settimeout-clear-the-callstack
    setTimeout(function() {
      busy = false;
    });
  } 
}



function drawJoints(data) { 

  // update line skeleton with incoming joint data

  // spine and left leg 

  line.geometry.vertices[0].x = data.joints[3].cameraX;
  line.geometry.vertices[0].y = data.joints[3].cameraY;
  line.geometry.vertices[0].z = data.joints[3].cameraZ;

  line.geometry.vertices[1].x = data.joints[2].cameraX;
  line.geometry.vertices[1].y = data.joints[2].cameraY;
  line.geometry.vertices[1].z = data.joints[2].cameraZ;

  line.geometry.vertices[2].x = data.joints[20].cameraX;
  line.geometry.vertices[2].y = data.joints[20].cameraY;
  line.geometry.vertices[2].z = data.joints[20].cameraZ;

  line.geometry.vertices[3].x = data.joints[1].cameraX;
  line.geometry.vertices[3].y = data.joints[1].cameraY;
  line.geometry.vertices[3].z = data.joints[1].cameraZ;

  line.geometry.vertices[4].x = data.joints[0].cameraX;
  line.geometry.vertices[4].y = data.joints[0].cameraY;
  line.geometry.vertices[4].z = data.joints[0].cameraZ;

  line.geometry.vertices[5].x = data.joints[12].cameraX;
  line.geometry.vertices[5].y = data.joints[12].cameraY;
  line.geometry.vertices[5].z = data.joints[12].cameraZ;

  line.geometry.vertices[6].x = data.joints[13].cameraX;
  line.geometry.vertices[6].y = data.joints[13].cameraY;
  line.geometry.vertices[6].z = data.joints[13].cameraZ;

  line.geometry.vertices[5].x = data.joints[14].cameraX;
  line.geometry.vertices[5].y = data.joints[14].cameraY;
  line.geometry.vertices[5].z = data.joints[14].cameraZ;

  line.geometry.vertices[6].x = data.joints[15].cameraX;
  line.geometry.vertices[6].y = data.joints[15].cameraY;
  line.geometry.vertices[6].z = data.joints[15].cameraZ;

  // left arm 

  line1.geometry.vertices[0].x = data.joints[20].cameraX;
  line1.geometry.vertices[0].y = data.joints[20].cameraY;
  line1.geometry.vertices[0].z = data.joints[20].cameraZ;

  line1.geometry.vertices[1].x = data.joints[4].cameraX;
  line1.geometry.vertices[1].y = data.joints[4].cameraY;
  line1.geometry.vertices[1].z = data.joints[4].cameraZ;

  line1.geometry.vertices[2].x = data.joints[5].cameraX;
  line1.geometry.vertices[2].y = data.joints[5].cameraY;
  line1.geometry.vertices[2].z = data.joints[5].cameraZ;

  line1.geometry.vertices[3].x = data.joints[5].cameraX;
  line1.geometry.vertices[3].y = data.joints[5].cameraY;
  line1.geometry.vertices[3].z = data.joints[5].cameraZ;

  line1.geometry.vertices[4].x = data.joints[7].cameraX;
  line1.geometry.vertices[4].y = data.joints[7].cameraY;
  line1.geometry.vertices[4].z = data.joints[7].cameraZ;


  // right arm 

  line2.geometry.vertices[0].x = data.joints[20].cameraX;
  line2.geometry.vertices[0].y = data.joints[20].cameraY;
  line2.geometry.vertices[0].z = data.joints[20].cameraZ;

  line2.geometry.vertices[1].x = data.joints[8].cameraX;
  line2.geometry.vertices[1].y = data.joints[8].cameraY;
  line2.geometry.vertices[1].z = data.joints[8].cameraZ;

  line2.geometry.vertices[2].x = data.joints[9].cameraX;
  line2.geometry.vertices[2].y = data.joints[9].cameraY;
  line2.geometry.vertices[2].z = data.joints[9].cameraZ;

  line2.geometry.vertices[3].x = data.joints[10].cameraX;
  line2.geometry.vertices[3].y = data.joints[10].cameraY;
  line2.geometry.vertices[3].z = data.joints[10].cameraZ;

  line2.geometry.vertices[4].x = data.joints[11].cameraX;
  line2.geometry.vertices[4].y = data.joints[11].cameraY;
  line2.geometry.vertices[4].z = data.joints[11].cameraZ;

  // right leg 

  line3.geometry.vertices[0].x = data.joints[0].cameraX;
  line3.geometry.vertices[0].y = data.joints[0].cameraY;
  line3.geometry.vertices[0].z = data.joints[0].cameraZ;

  line3.geometry.vertices[1].x = data.joints[16].cameraX;
  line3.geometry.vertices[1].y = data.joints[16].cameraY;
  line3.geometry.vertices[1].z = data.joints[16].cameraZ;

  line3.geometry.vertices[2].x = data.joints[17].cameraX;
  line3.geometry.vertices[2].y = data.joints[17].cameraY;
  line3.geometry.vertices[2].z = data.joints[17].cameraZ;

  line3.geometry.vertices[3].x = data.joints[18].cameraX;
  line3.geometry.vertices[3].y = data.joints[18].cameraY;
  line3.geometry.vertices[3].z = data.joints[18].cameraZ;

  line3.geometry.vertices[4].x = data.joints[19].cameraX;
  line3.geometry.vertices[4].y = data.joints[19].cameraY;
  line3.geometry.vertices[4].z = data.joints[19].cameraZ;

  // update all skeleton lines 

  line.geometry.verticesNeedUpdate = true;
  line1.geometry.verticesNeedUpdate = true;
  line2.geometry.verticesNeedUpdate = true;
  line3.geometry.verticesNeedUpdate = true;

  // update position of light on right hand

  //bulbLight.position.x = data.joints[kinectron.HANDRIGHT].cameraX;
  //bulbLight.position.y = data.joints[kinectron.HANDRIGHT].cameraY;
  //bulbLight.position.z = data.joints[kinectron.HANDRIGHT].cameraZ;
}
