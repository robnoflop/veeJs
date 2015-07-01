window.onload = load;

var engin;

function load() {
  GUIInit();
  engin = new veeJsEngin("#video1", "#video2", "#img1", "#img2", "#output");
  engin.tick();
}




<<<<<<< Updated upstream
document.querySelector("#source1Gain").onmousemove = (function() {
  engin.setVolume(1, this.value);
});

document.querySelector("#source2Gain").onmousemove = (function() {
  engin.setVolume(2, this.value);
});

document.querySelector("#rotation1").onmousemove = (function() {
  engin.setRotation(1, this.value);
});

document.querySelector("#rotation2").onmousemove = (function() {
  engin.setRotation(2, this.value);
});

document.querySelector("#scale1").onmousemove = (function() {
  engin.setScale(1, this.value);
});

document.querySelector("#scale2").onmousemove = (function() {
  engin.setScale(2, this.value);
});

document.querySelector("#alpha1").onmousemove = (function() {
  engin.setAlpha(1, this.value);
});

document.querySelector("#alpha2").onmousemove = (function() {
  engin.setAlpha(2, this.value);
});

document.querySelector("#src1").onchange = (function() {
  engin.setSource(1, this.files[0]);
});

document.querySelector("#src2").onchange = (function() {
  engin.setSource(2, this.files[0]);
});

document.querySelector("#play1").onclick = (function() {
  engin.startStopVideo(1);
});

document.querySelector("#play2").onclick = (function() {
  engin.startStopVideo(2);
});

document.querySelector("#rgb1").onclick = (function() {
  engin.setRGBFilter(1,
                    document.querySelector("#r1").value,
                    document.querySelector("#g1").value,
                    document.querySelector("#b1").value);
});

document.querySelector("#rgb2").onclick = (function() {
  engin.setRGBFilter(2,
                    document.querySelector("#r2").value,
                    document.querySelector("#g2").value,
                    document.querySelector("#b2").value);
});
=======
>>>>>>> Stashed changes






var veeJsEnginHelper;

function veeJsEngin(video1, video2, img1, img2, output) {
  this.video1 = document.querySelector(video1);
  this.video2 = document.querySelector(video2);
  this.img1 = document.querySelector(img1);
  this.img2 = document.querySelector(img2);
  this.canvas = document.querySelector(output);
  this.context = this.canvas.getContext("2d");

<<<<<<< Updated upstream
  this.video1Alpaha = 1.0;
  this.video2Alpaha = 0.0;

  this.video1Alpahb = 0.5;
  this.video2Alpahb = 0.5;
=======
  this.video1Alpah = 1.0;
  this.video2Alpah = 1.0;

  this.video1AlphaEffect = 1;
  this.video2AlphaEffect = 1;

>>>>>>> Stashed changes

  this.video1Rotation = 0;
  this.video2Rotation = 0;

  this.video1Scale = 1;
  this.video2Scale = 1;

  this.r1 = 1;
  this.g1 = 1;
  this.b1 = 1;

  this.r2 = 1;
  this.g2 = 1;
  this.b2 = 1;

  this.source1IsVideo = false;
  this.source2IsVideo = false;

  veeJsEnginHelper = this;
}

veeJsEngin.prototype.tick = function(){
  requestAnimationFrame(veeJsEnginHelper.tick);

  veeJsEnginHelper.context.clearRect(0, 0, veeJsEnginHelper.canvas.width, veeJsEnginHelper.canvas.height);
  veeJsEnginHelper.drawSource();

};

<<<<<<< Updated upstream
veeJsEngin.prototype.drawSource = function(id){
  //var t = 0.3;
  if (id == 1) {
    this.context.globalAlpha = (parseFloat(this.video1Alpaha) + parseFloat(this.video1Alpahb)) / 2
    this.context.translate(this.canvas.width/2, this.canvas.height/2);
    this.context.rotate(this.video1Rotation);
    this.context.translate(-this.canvas.width/2, -this.canvas.height/2);
    this.context.scale(this.video1Scale,this.video1Scale);

    if (this.source1IsVideo) {
      this.context.drawImage(this.video1, 0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.context.drawImage(this.img1, 0, 0, this.canvas.width, this.canvas.height);
    }
=======
veeJsEngin.prototype.drawSource = function(){
>>>>>>> Stashed changes


<<<<<<< Updated upstream
    // Restore image data within the canvas.
    this.context.putImageData(img, 0, 0);
  } else if (id == 2) {
    this.context.globalAlpha = (parseFloat(this.video2Alpaha) + parseFloat(this.video2Alpahb)) / 2
    this.context.translate(this.canvas.width/2, this.canvas.height/2);
    this.context.rotate(this.video2Rotation);
    this.context.translate(-this.canvas.width/2, -this.canvas.height/2);
    this.context.scale(this.video2Scale,this.video2Scale);

    if (this.source2IsVideo) {
      this.context.drawImage(this.video2, 0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.context.drawImage(this.img2, 0, 0, this.canvas.width, this.canvas.height);
    }
=======
  this.context.globalAlpha = this.video1Alpah*this.video1AlphaEffect;
  this.context.translate(this.canvas.width/2, this.canvas.height/2);
  this.context.rotate(this.video1Rotation);
  this.context.scale(this.video1Scale,this.video1Scale);
  this.context.translate(-this.canvas.width/2, -this.canvas.height/2);
  
>>>>>>> Stashed changes

  if (this.source1IsVideo) {
    this.context.drawImage(this.video1, 0, 0, this.canvas.width, this.canvas.height);
  } else {
    this.context.drawImage(this.img1, 0, 0, this.canvas.width, this.canvas.height);
  }


  this.context.setTransform(1, 0, 0, 1, 0, 0);



  this.context.globalAlpha = this.video2Alpah*this.video2AlphaEffect;
  this.context.translate(this.canvas.width/2, this.canvas.height/2);
  this.context.rotate(this.video2Rotation);
  this.context.scale(this.video2Scale,this.video2Scale);
  this.context.translate(-this.canvas.width/2, -this.canvas.height/2);
  

  if (this.source2IsVideo) {
    this.context.drawImage(this.video2, 0, 0, this.canvas.width, this.canvas.height);
  } else {
    this.context.drawImage(this.img2, 0, 0, this.canvas.width, this.canvas.height);
  }

  var img = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height); // Pull a rectangle of image data from context
  var data = img.data; // Image image data array.
  var len = data.length; // Length of data array.

  // Loop through image data array.
  // Apply color trasform to each block of RGBA values.
  // Applied as: c = c * cmodifier + coffset.
  
  var filterStrength2 = this.video2AlphaEffect * this.video2Alpah;
  var filterStrength1 = Math.max(0,this.video1AlphaEffect-filterStrength2);



  for (i = 0; i < len; i++) {
    data[i] = data[i++] * (this.r1 * filterStrength1 + this.r2 * filterStrength2);                             
    data[i] = data[i++] * (this.g1 * filterStrength1 + this.g2 * filterStrength2);
    data[i] = data[i++] * (this.b1 * filterStrength1 + this.b2 * filterStrength2);
  }

  // Restore image data within the canvas.
  this.context.putImageData(img, 0, 0);

  
  // reset current transformation matrix to the identity matrix
  this.context.setTransform(1, 0, 0, 1, 0, 0);
};

veeJsEngin.prototype.crossfade = function(value, max){
  var x = parseInt(value) / parseInt(max);
  // Use an equal-power crossfading curve:
<<<<<<< Updated upstream
  this.video1Alpaha = Math.cos(x * 0.5*Math.PI);
  this.video2Alpaha = Math.cos((1.0 - x) * 0.5*Math.PI);  
=======
  //this.video1Alpah = Math.cos(x * 0.5*Math.PI);
  //this.video2Alpah = Math.cos((1.0 - x) * 0.5*Math.PI);

  //Linear is better here
  this.video1Alpah = 1;
  this.video2Alpah = x;
>>>>>>> Stashed changes
};

veeJsEngin.prototype.setSpeed = function(id, value){
  if (id == 1) {
    this.video1.playbackRate = value;
  } else if (id == 2) {
    this.video2.playbackRate = value;
  }
}

veeJsEngin.prototype.setAlpha = function(id, value){
  if (id == 1) {
    this.video1Alpahb = value;
  } else if (id == 2) {
    this.video2Alpahb = value;
  }
}

veeJsEngin.prototype.setVolume = function(id, value){
  if (id == 1) {
    this.video1.volume = value;
  } else if (id == 2) {
    this.video2.volume = value;
  }
};

veeJsEngin.prototype.setRotation = function(id, value){
  if (id == 1) {
    this.video1Rotation = value;
  } else if (id == 2) {
    this.video2Rotation = value;
  }
};

veeJsEngin.prototype.setScale = function(id, value){
  if (id == 1) {
    this.video1Scale = value;
  } else if (id == 2) {
    this.video2Scale = value;
  }
};


veeJsEngin.prototype.setAlphaEffect = function(id, value){
  var val = Math.min(1, Math.max(value,0));
  if (id == 1) {
    this.video1AlphaEffect = val;
  } else if (id == 2) {
    this.video2AlphaEffect = val;
  }
};


veeJsEngin.prototype.startStopVideo = function(id){
  if(id == 1) {
    if(this.video1.paused) {
      this.video1.play();
    } else {
      this.video1.pause();
    }
  } else if (id == 2) {
    if(this.video2.paused) {
      this.video2.play();
    } else {
      this.video2.pause();
    }
  }
};

veeJsEngin.prototype.setSource = function(id, file){
  var type = file.type.split("/")[0];
  if (type === "image") {
    if (id == 1) {
      this.img1.src = URL.createObjectURL(file);
      this.source1IsVideo = false;
    } else if (id == 2) {
      this.img2.src = URL.createObjectURL(file);
      this.source2IsVideo = false;
    }
    
  } else if (type === "video") {
    if (id == 1) {
      this.video1.src = URL.createObjectURL(file);
      this.source1IsVideo = true;
    } else if (id == 2) {
      this.video2.src = URL.createObjectURL(file);
      this.source2IsVideo = true;
    }  
  } 
};

veeJsEngin.prototype.setRGBFilter = function(id, r, g, b){
  if (id == 1) {
    this.r1 = r;
    this.g1 = g;
    this.b1 = b;
  } else if(id == 2) {
    this.r2 = r;
    this.g2 = g;
    this.b2 = b;
  }
};