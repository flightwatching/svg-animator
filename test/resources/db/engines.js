'use strict';

/*
DEAL WITH ENGINES
*/

var lime='#339933';
var bgColor = '#333333';
var darkorange = 'darkorange';

var svg = d3.select('svg');
var valveRotation = d3.scaleLinear().domain([0, 1]).range([90, 0]).clamp(true);
var maxNeedleAngle=250;
var maxPress=100;
var pdRotation = d3.scaleLinear().domain([0, maxPress]).range([0, maxNeedleAngle]).clamp(true);
var redZonePress=maxPress*0.85; // redZone is about 85% of all span

var pipeColor = d3.scaleLinear()
    .domain([0, 100])
    .range([bgColor, lime]).clamp(true);

var eng1= {
	inputPress:100,
	bias:0,
	prvOpen:1,
	draw: {
		prvGaugeNeedle: svg.select('#PD1_needle_anim'),
		prvGaugeValue: svg.select('#PD1_value_anim'),
		prvGaugeCenter: [svg.select('#PD1_center_anim').node().getBBox().x, svg.select('#PD1_center_anim').node().getBBox().y],

		prvValve: svg.select('#PRV1_anim'),
		prvValveCenter: [svg.select('#PRV1_center_anim').node().getBBox().x, svg.select('#PRV1_center_anim').node().getBBox().y],

		inputPipe: svg.select('#pre_PD1_pipe_anim'),
		outputPipe: svg.select('#post_PD1_pipe_anim')
	}
};

var eng2= {
	inputPress:100,
	prvOpen:1,
	bias:2,
	draw: {
		prvGaugeNeedle: svg.select('#PD2_needle_anim'),
		prvGaugeValue: svg.select('#PD2_value_anim'),
		prvGaugeCenter: [svg.select('#PD2_center_anim').node().getBBox().x, svg.select('#PD2_center_anim').node().getBBox().y],

		prvValve: svg.select('#PRV2_anim'),
		prvValveCenter: [svg.select('#PRV2_center_anim').node().getBBox().x, svg.select('#PRV2_center_anim').node().getBBox().y],

		inputPipe: svg.select('#pre_PD2_pipe_anim'),
		outputPipe: svg.select('#post_PD2_pipe_anim')
	}
};

window.myData.pressDiff=0;

var updateEng = function(eng) {
	eng.inputPress = window.myData.randomize(80, 100, 5000, eng.bias); //slowly between 80 and 100
	eng.prvOpen=window.myData.randomize(0, 1, 5000, eng.bias); //slowly between 0 and 1
	eng.prvPress=eng.inputPress*eng.prvOpen;
	return eng;
};

var draw = function(eng) {
	//updates the PD gauge (random makes the needle vibrate)
	eng.draw.prvGaugeNeedle
	.attr('transform', 'rotate('+pdRotation(eng.prvPress+Math.random()*maxPress*0.02)+','+eng.draw.prvGaugeCenter+')')
	.attr('fill', function() {return (eng.prvPress>redZonePress)?darkorange:lime;});
	eng.draw.prvGaugeValue
	.text(eng.prvPress.toFixed(0))
	.attr('fill', function() {return (eng.prvPress>redZonePress)?darkorange:lime;});

	//rotates the PRV valve
	eng.draw.prvValve
	.attr('transform', 'rotate('+valveRotation(eng.prvOpen)+','+eng.draw.prvValveCenter+')');

	// pipe color
	eng.draw.inputPipe.attr('stroke', pipeColor(eng.inputPress));
	eng.draw.outputPipe.attr('stroke', pipeColor(eng.prvPress));
};


window.setInterval(function() {
	draw(updateEng(eng1));
	draw(updateEng(eng2));
	window.myData.pressDiff=Math.abs(eng1.prvOpen-eng2.prvOpen);
}, 100);
