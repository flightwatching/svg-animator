'use strict';

/*
DEAL WITH CONFIDENCE FACTOR
*/

var svg = d3.select('svg');
var cf = svg.select('#CF_anim');
var bg = svg.select('#CF_bg_anim').selectAll('[fill]');

var color = d3.scaleQuantize()
    .domain([97, 100])
		.range(['darkorange', bg.attr('fill')]);
//		.range(['darkorange', bg.attr('fill')]);


window.setInterval(function() {
	var val = 99.9-window.myData.pressDiff;
	cf.text(val.toFixed(1));
	bg.attr('fill', color(val));
}, 1000);
