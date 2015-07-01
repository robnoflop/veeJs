



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