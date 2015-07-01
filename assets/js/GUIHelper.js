



function GUIInit(){




	$('#source1Alpha').slider({reversed : true}).on('slide', function(event){
		engin.setAlphaEffect(1, event.value);
	});

	$('#source2Alpha').slider({reversed : true}).on('slide', function(event){
		engin.setAlphaEffect(2, event.value);
	});



	// Control sound volume left
	$('#source1Gain').slider({reversed : true}).on('slide', function(event){
		engin.setVolume(1, event.value);
	});

	// Control sound volume right
	$('#source2Gain').slider({reversed : true}).on('slide', function(event){
		engin.setVolume(2, event.value);
	});	


	$('#crossfadeSlide').slider().on('slide', function(event) {
		engin.crossfade(event.value, 100);
	});

	// play buttons
	$('#play1').on('click', function(event) {
		event.preventDefault();
		engin.startStopVideo(1);
	});


	$('#play2').on('click', function(event) {
		event.preventDefault();
		engin.startStopVideo(2);
	});



	// source select
	$('#src1').on('change', function() { 
		engin.setSource(1, this.files[0]);	
		engin.crossfade(0,100);
		$('#crossfadeSlide').slider('setValue', 0);
	});
	$('#src1').before('<input type="button" id="button-file1" value="Choose Track" class="btn btn-default btn-xs" />');
	$('#src1').hide();
	$('body').on('click', '#button-file1', function() { 
	    $('#src1').trigger('click');    
	});

	$('#src2').on('change', function() { 
		engin.setSource(2, this.files[0]);	
		engin.crossfade(100,100);
		$('#crossfadeSlide').slider('setValue', 100);
	});
	$('#src2').before('<input type="button" id="button-file2" value="Choose Track" class="btn btn-default btn-xs" />');
	$('#src2').hide();
	$('body').on('click', '#button-file2', function() { 
	    $('#src2').trigger('click');    
	});


	// init knob1 
	$('#source1SpeedSlide').knob({
		'width':'80%',
		'fgColor':'#149bdf',
		'change': function (v) { engin.setSpeed(1, v); }			
	});

	$('#source1SpeedSlide').parent('div').css('display', 'inline-block');
	$('#source1SpeedSlide').val(1).trigger('change');


	// init knob2
	$('#source2SpeedSlide').knob({
		'width':'80%',
		'fgColor':'#149bdf',	
		'change': function (v) { engin.setSpeed(2, v); }		
	});

	$('#source2SpeedSlide').parent('div').css('display', 'inline-block');
	$('#source2SpeedSlide').val(1).trigger('change');

	// init knob3
	$('#scale1').knob({
		'width':'80%',
		'fgColor':'#149bdf',	
		'change': function (v) { engin.setScale(1, v); }		
	});

	$('#scale1').parent('div').css('display', 'inline-block');
	$('#scale1').val(1).trigger('change');


	// init knob4
	$('#scale2').knob({
		'width':'80%',
		'fgColor':'#149bdf',
		'change': function (v) { engin.setScale(2, v); }		
	});

	$('#scale2').parent('div').css('display', 'inline-block');
	$('#scale2').val(1).trigger('change');



	// init knob5
	$('#rotation1').knob({
		'width':'80%',
		'fgColor':'#149bdf',
		'change': function (v) { engin.setRotation(1, v/360*2*Math.PI); }		
	});

	$('#rotation1').parent('div').css('display', 'inline-block');
	$('#rotation1').val(0).trigger('change');


	// init knob6
	$('#rotation2').knob({
		'width':'80%',
		'fgColor':'#149bdf',	
		'change': function (v) { engin.setRotation(2, v/360*2*Math.PI); }		
	});

	$('#rotation2').parent('div').css('display', 'inline-block');
	$('#rotation2').val(0).trigger('change');

	


	$('#r1').slider({reversed:true}).on('slide', function(event){
		engin.setRGBFilter(1,$('#r1').val(),$('#g1').val(),$('#b1').val());
	});
	$('#g1').slider({reversed:true}).on('slide', function(event){
		engin.setRGBFilter(1,$('#r1').val(),$('#g1').val(),$('#b1').val());
	});
	$('#b1').slider({reversed:true}).on('slide', function(event){
		engin.setRGBFilter(1,$('#r1').val(),$('#g1').val(),$('#b1').val());
	});

	$('#r2').slider({reversed:true}).on('slide', function(event){
		engin.setRGBFilter(2,$('#r2').val(),$('#g2').val(),$('#b2').val());
	});
	$('#g2').slider({reversed:true}).on('slide', function(event){
		engin.setRGBFilter(2,$('#r2').val(),$('#g2').val(),$('#b2').val());
	});
	$('#b2').slider({reversed:true}).on('slide', function(event){
		engin.setRGBFilter(2,$('#r2').val(),$('#g2').val(),$('#b2').val());
	});
}

var midiObj = new Midi();
midiObj.initMidi();


var midiLearn = false;
var midiLearnObj = null;


// register context handler
$(document).ready(function(){
    $(document).bind("contextmenu",function(e){        
        e.preventDefault();        
        midiLearn = true;


        $('#midiLearnOut').css('color','#0A0');

        var targetElement = null;

        if(e.target.id !== '' && e.target.id !== null)
        	targetElement = e.target.id;



        else if (
        	$(e.target).parent().parent().next().attr('id') !== null &&
        	$(e.target).parent().parent().next().attr('id') !== 'undefined'){
        	targetElement = $(e.target).parent().parent().next().attr('id');
        }
        else
        	return;



        midiLearnObj = targetElement;
    });
});


// MIDI

receivedMidi = function(midi){

	// execute only this if learning mode
	if(midiLearn){

		midiObj.defaultMap[midiLearnObj] = {
			0: midi.data[0], 
			1: midi.data[1] 
		};

		midiLearn = false;

		$('#midiLearnOut').css('color','#AAA');
		return;
	}

	var UIElem= null;

	// look up midi message and find UI element that is assigned
	for(midiDest in midiObj.defaultMap){
		if(midiObj.defaultMap[midiDest][0] === midi.data[0] &&
		   midiObj.defaultMap[midiDest][1] === midi.data[1]){
			UIElem = midiDest;
			break;
		}
	}

	switch(UIElem) {

		case 'crossfadeSlide':
			$('#crossfadeSlide')
				.slider('setValue', midi.data[2]/1.27, true);
		break;

		case 'source1Gain':
			$('#source1Gain')
				.slider('setValue', midi.data[2]/127, true);
		break;

		case 'source2Gain':
			$('#source2Gain')
				.slider('setValue', midi.data[2]/127, true);
		break;


		case 'source1Alpha':
			$('#source1Alpha')
				.slider('setValue', midi.data[2]/127, true);
		break;


		case 'source2Alpha':
			$('#source2Alpha')
				.slider('setValue', midi.data[2]/127, true);
		break;


		case 'play1':
			$('#play1').trigger('click');
		break;


		case 'play2':
			$('#play2').trigger('click');
		break;


		case 'r1': 
			$('#r1').slider('setValue', midi.data[2]/127, true);
		break;

		
		case 'g1': 
			$('#g1').slider('setValue', midi.data[2]/127, true);
		break;
			

		case 'b1': 
			$('#b1').slider('setValue', midi.data[2]/127, true);
		break;


		case 'r2': 
			$('#r2').slider('setValue', midi.data[2]/127, true);
		break;


		case 'g2': 
			$('#g2').slider('setValue', midi.data[2]/127, true);
		break;


		case 'b2': 
			$('#b2').slider('setValue', midi.data[2]/127, true);
		break;


		case 'scale1': 
			$('#scale1').val(midi.data[2]/127*6).trigger('change'); 
		break;


		case 'rotation1': 
			$('#rotation1').val( midi.data[2]/127*360 ).trigger('change'); 
		break;


		case 'source1SpeedSlide': 
			$('#source1SpeedSlide').val( midi.data[2]/127*4 ).trigger('change'); 
		break;



		case 'scale2': 
			$('#scale2').val( midi.data[2]/127*6 ).trigger('change'); 
		break;


		case 'rotation2': 
			$('#rotation2').val( midi.data[2]/127*360 ).trigger('change'); 
		break;


		case 'source2SpeedSlide': 
			$('#source2SpeedSlide').val( midi.data[2]/127*4 ).trigger('change');
		break;


	  default:
	  	console.log('unkown midi responder: '+UIElem+' '+midi.data[0]+' '+midi.data[1]);
	} 
}