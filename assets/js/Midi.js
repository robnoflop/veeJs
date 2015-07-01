/************************************************
 *	Midi-interface 				(MODEL)			*
 ***********************************************/


var Midi = function(){
	
	// default midi map for berhinder MM-1
	this.defaultMap = {
		"crossfadeSlide" : {0: 176, 1: 64},

		"source1Gain" : {0 : 176, 1: 48},
		"source2Gain" : {0 : 176, 1: 51},
		"source1Alpha" : {0 : 176, 1: 49},
		"source2Alpha" : {0 : 176, 1: 50},

		"play1" : {0 : 128, 1: 16},
		"play2" : {0 : 128, 1: 17},

		"r1" : {0 : 176, 1: 6},
		"g1" : {0 : 176, 1: 10},
		"b1" : {0 : 176, 1: 14},

		"r2" : {0 : 176, 1: 9},
		"g2" : {0 : 176, 1: 13},
		"b2" : {0 : 176, 1: 17},

		"scale1" : {0 : 176, 1: 7},
		"rotation1" : {0 : 176, 1: 11},
		"source1SpeedSlide" : {0 : 176, 1: 15},

		"scale2" : {0 : 176, 1: 8},
		"rotation2" : {0 : 176, 1: 12},
		"source2SpeedSlide" : {0 : 176, 1: 16}
		
	}
};





Midi.prototype.initMidi = function(){

	if(this.observer ===  null){
		new Error("Define Observer in Midi");
		return;
	}

	if(navigator.requestMIDIAccess)	{	
  		navigator.requestMIDIAccess().then(	
  			this.midiSuccess,
  			this.midiFailure
  		);	
  	}else{
  		this.midiFailure();
  	}	
}





Midi.prototype.midiSuccess = function(midi){
	var inputs = midi.inputs;

	for(var input of inputs.values()){		
		input.open();
		input.addEventListener('midimessage', receivedMidi , false);

	}	
}	

Midi.prototype.midiFailure = function(){
	new Error("Midi failure. Does your browser support Midi Interfaces?");
}





















