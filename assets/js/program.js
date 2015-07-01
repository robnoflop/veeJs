window.onload = load;

var engin;

function load() {
  GUIInit();
  engin = new veeJsEngin("#video1", "#video2", "#img1", "#img2", "#output");
  engin.tick();
}











var veeJsEnginHelper;

function veeJsEngin(video1, video2, img1, img2, output) {
  this.video1 = document.querySelector(video1);
  this.video2 = document.querySelector(video2);
  this.img1 = document.querySelector(img1);
  this.img2 = document.querySelector(img2);
  this.canvas = document.querySelector(output);
  this.context = this.canvas.getContext("2d");


  this.video1Alpah = 1.0;
  this.video2Alpah = 1.0;

  this.video1AlphaEffect = 1;
  this.video2AlphaEffect = 1;


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


veeJsEngin.prototype.drawSource = function(){



  this.context.globalAlpha = this.video1Alpah*this.video1AlphaEffect;
  this.context.translate(this.canvas.width/2, this.canvas.height/2);
  this.context.rotate(this.video1Rotation);
  this.context.scale(this.video1Scale,this.video1Scale);
  this.context.translate(-this.canvas.width/2, -this.canvas.height/2);
  


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


  //Linear is better here
  this.video1Alpah = 1;
  this.video2Alpah = x;
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