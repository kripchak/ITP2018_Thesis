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


  kinectron.setColorCallback(colorCallback);
  kinectron.setDepthCallback(depthCallback);
  kinectron.setBodiesCallback(drawJoints);
  kinectron.startMultiFrame(["color", "depth", "body"]);

 	
  //kinectron.startTrackedBodies(drawJoints);
  //kinectron.startRGBD(drawKinectImg);
  //kinectron.startTrackedBodies(drawJoints); 
}

// Use '9' key to stop kinect from running 
window.addEventListener('keydown', function(event){
	
	if (event.keyCode === 57) {
		  kinectron.stopAll();
	}

});

  function colorCallback(colorImg) {
    //process color frame here
  }

  function depthCallback(depthImg) {
    //process depth frame here
  }

  function bodyCallback(body) {
    //process body object here
  }




function drawKinectImg(data) {

  // Return if currently processing an image
	if (busy) {
    return;
  }

	// Image data needs to be draw to img element before texture
  // Only draw if there is an image from Kinectron
  if (data.src) {
  	console.log(data.src);
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
	//console.log(data);

	var bodyScale = 500.0;
	for(var i = 0; i < data.length; i++){
		if(data[i].tracked){
			// update line skeleton with incoming joint data

  // spine and left leg 

  line.geometry.vertices[0].x = data[i].joints[3].cameraX*bodyScale;
  line.geometry.vertices[0].y = data[i].joints[3].cameraY*bodyScale;
  line.geometry.vertices[0].z = data[i].joints[3].cameraZ*bodyScale;

  line.geometry.vertices[1].x = data[i].joints[2].cameraX*bodyScale;
  line.geometry.vertices[1].y = data[i].joints[2].cameraY*bodyScale;
  line.geometry.vertices[1].z = data[i].joints[2].cameraZ*bodyScale;

  line.geometry.vertices[2].x = data[i].joints[20].cameraX*bodyScale;
  line.geometry.vertices[2].y = data[i].joints[20].cameraY*bodyScale;
  line.geometry.vertices[2].z = data[i].joints[20].cameraZ*bodyScale;

  line.geometry.vertices[3].x = data[i].joints[1].cameraX*bodyScale;
  line.geometry.vertices[3].y = data[i].joints[1].cameraY*bodyScale;
  line.geometry.vertices[3].z = data[i].joints[1].cameraZ*bodyScale;

  line.geometry.vertices[4].x = data[i].joints[0].cameraX*bodyScale;
  line.geometry.vertices[4].y = data[i].joints[0].cameraY*bodyScale;
  line.geometry.vertices[4].z = data[i].joints[0].cameraZ*bodyScale;

  line.geometry.vertices[5].x = data[i].joints[12].cameraX*bodyScale;
  line.geometry.vertices[5].y = data[i].joints[12].cameraY*bodyScale;
  line.geometry.vertices[5].z = data[i].joints[12].cameraZ*bodyScale;

  line.geometry.vertices[6].x = data[i].joints[13].cameraX*bodyScale;
  line.geometry.vertices[6].y = data[i].joints[13].cameraY*bodyScale;
  line.geometry.vertices[6].z = data[i].joints[13].cameraZ*bodyScale;

  line.geometry.vertices[5].x = data[i].joints[14].cameraX*bodyScale;
  line.geometry.vertices[5].y = data[i].joints[14].cameraY*bodyScale;
  line.geometry.vertices[5].z = data[i].joints[14].cameraZ*bodyScale;

  line.geometry.vertices[6].x = data[i].joints[15].cameraX*bodyScale;
  line.geometry.vertices[6].y = data[i].joints[15].cameraY*bodyScale;
  line.geometry.vertices[6].z = data[i].joints[15].cameraZ*bodyScale;

  // left arm 

  line1.geometry.vertices[0].x = data[i].joints[20].cameraX*bodyScale;
  line1.geometry.vertices[0].y = data[i].joints[20].cameraY*bodyScale;
  line1.geometry.vertices[0].z = data[i].joints[20].cameraZ*bodyScale;

  line1.geometry.vertices[1].x = data[i].joints[4].cameraX*bodyScale;
  line1.geometry.vertices[1].y = data[i].joints[4].cameraY*bodyScale;
  line1.geometry.vertices[1].z = data[i].joints[4].cameraZ*bodyScale;

  line1.geometry.vertices[2].x = data[i].joints[5].cameraX*bodyScale;
  line1.geometry.vertices[2].y = data[i].joints[5].cameraY*bodyScale;
  line1.geometry.vertices[2].z = data[i].joints[5].cameraZ*bodyScale;

  line1.geometry.vertices[3].x = data[i].joints[5].cameraX*bodyScale;
  line1.geometry.vertices[3].y = data[i].joints[5].cameraY*bodyScale;
  line1.geometry.vertices[3].z = data[i].joints[5].cameraZ*bodyScale;

  line1.geometry.vertices[4].x = data[i].joints[7].cameraX*bodyScale;
  line1.geometry.vertices[4].y = data[i].joints[7].cameraY*bodyScale;
  line1.geometry.vertices[4].z = data[i].joints[7].cameraZ*bodyScale;


  // right arm 

  line2.geometry.vertices[0].x = data[i].joints[20].cameraX*bodyScale;
  line2.geometry.vertices[0].y = data[i].joints[20].cameraY*bodyScale;
  line2.geometry.vertices[0].z = data[i].joints[20].cameraZ*bodyScale;

  line2.geometry.vertices[1].x = data[i].joints[8].cameraX*bodyScale;
  line2.geometry.vertices[1].y = data[i].joints[8].cameraY*bodyScale;
  line2.geometry.vertices[1].z = data[i].joints[8].cameraZ*bodyScale;

  line2.geometry.vertices[2].x = data[i].joints[9].cameraX*bodyScale;
  line2.geometry.vertices[2].y = data[i].joints[9].cameraY*bodyScale;
  line2.geometry.vertices[2].z = data[i].joints[9].cameraZ*bodyScale;

  line2.geometry.vertices[3].x = data[i].joints[10].cameraX*bodyScale;
  line2.geometry.vertices[3].y = data[i].joints[10].cameraY*bodyScale;
  line2.geometry.vertices[3].z = data[i].joints[10].cameraZ*bodyScale;

  line2.geometry.vertices[4].x = data[i].joints[11].cameraX*bodyScale;
  line2.geometry.vertices[4].y = data[i].joints[11].cameraY*bodyScale;
  line2.geometry.vertices[4].z = data[i].joints[11].cameraZ*bodyScale;

  // right leg 

  line3.geometry.vertices[0].x = data[i].joints[0].cameraX*bodyScale;
  line3.geometry.vertices[0].y = data[i].joints[0].cameraY*bodyScale;
  line3.geometry.vertices[0].z = data[i].joints[0].cameraZ*bodyScale;

  line3.geometry.vertices[1].x = data[i].joints[16].cameraX*bodyScale;
  line3.geometry.vertices[1].y = data[i].joints[16].cameraY*bodyScale;
  line3.geometry.vertices[1].z = data[i].joints[16].cameraZ*bodyScale;

  line3.geometry.vertices[2].x = data[i].joints[17].cameraX*bodyScale;
  line3.geometry.vertices[2].y = data[i].joints[17].cameraY*bodyScale;
  line3.geometry.vertices[2].z = data[i].joints[17].cameraZ*bodyScale;

  line3.geometry.vertices[3].x = data[i].joints[18].cameraX*bodyScale;
  line3.geometry.vertices[3].y = data[i].joints[18].cameraY*bodyScale;
  line3.geometry.vertices[3].z = data[i].joints[18].cameraZ*bodyScale;

  line3.geometry.vertices[4].x = data[i].joints[19].cameraX*bodyScale;
  line3.geometry.vertices[4].y = data[i].joints[19].cameraY*bodyScale;
  line3.geometry.vertices[4].z = data[i].joints[19].cameraZ*bodyScale;

  // update all skeleton lines 

  line.geometry.verticesNeedUpdate = true;
  line1.geometry.verticesNeedUpdate = true;
  line2.geometry.verticesNeedUpdate = true;
  line3.geometry.verticesNeedUpdate = true;
  
		}
	}
  
}


  // update position of light on right hand

  //bulbLight.position.x = data.joints[kinectron.HANDRIGHT].cameraX;
  //bulbLight.position.y = data.joints[kinectron.HANDRIGHT].cameraY;
  //bulbLight.position.z = data.joints[kinectron.HANDRIGHT].cameraZ;



// Frames are delivered individually to their respective callbacks

 
