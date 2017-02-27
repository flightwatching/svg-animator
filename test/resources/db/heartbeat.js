'use strict';

/**
BLINKS THE REAL TIME DOT
**/

var svg = d3.select('svg');
var heartbeat = svg.selectAll('#RT_anim');
var rInit = heartbeat.attr('r');


window.setInterval(function() {
	heartbeat.attr('r', rInit).attr('opacity', 1).transition().duration(800).attr('r', rInit/1.1).attr('opacity', 0.5);
}, 1692);
