'use strict';

window.myData={

  randomize: function(min, max, wavelength_ms, phase) {
    var d = new Date();
    var rnd = (1+Math.cos(d/wavelength_ms+phase))/2; //between 0 and 1;
    return min+(max-min)*rnd;
  }

};
