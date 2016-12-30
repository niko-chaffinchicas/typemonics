// Adapted from the original modular scale:
// http://www.modularscale.com/
// https://github.com/modularscale/modularscale-js
var ms = {};

ms.msValue = 0;
ms.msBases = 1;
ms.msRatios = (1+ Math.sqrt(5))/2;

// Values
ms.minorSecond   = 1.067;
ms.majorSecond   = 1.125;
ms.minorThird    = 1.2;
ms.majorThird    = 1.25;
ms.perfectFourth = 1.333;
ms.augFourth    = 1.414;
ms.perfectFifth  = 1.5;
ms.minorSixth    = 1.6;
ms.goldenSection = 1.618;
ms.majorSixth    = 1.667;
ms.minorSeventh  = 1.778;
ms.majorSeventh  = 1.875;
ms.octave        = 2;
ms.majorTenth    = 2.5;
ms.majorEleventh = 2.667;
ms.majorTwelfth  = 3;
ms.doubleOctave  = 4;


// Unique via http://jsfiddle.net/gabrieleromanato/BrLfv/
ms.msUnique = function(origArr) {

    origArr = origArr.sort(function(a,b) {
      var x = a[0];
      var y = b[0];
      return x-y;
    });

    newArr = [];
    var lastVal = null;

    for (var i = 0; i < origArr.length; i++) {
      var currentVal = origArr[i][0];
      if (currentVal != lastVal) {
        newArr.push(origArr[i]);
      };

      lastVal = currentVal;

    }

    return newArr;
}

// Main function
ms.ms = function(value, bases, ratios) {

  if (typeof value === 'string') {
    value = 1;
  }
  if (value == undefined) {
    value = ms.msValue;
  }
  if (bases == undefined) {
    bases = ms.msBases;
  }
  if (ratios == undefined) {
    ratios = ms.msRatios;
  }

  // Error hangling
  if (bases <= 0) {
    bases = 1;
  }
  if (typeof Math.abs(bases[0]) != 'number') {
    bases = 1;
  }

  // Make arrays
  var bases = (''+bases).split(',');
  var ratios = (''+ratios).split(',');

  // Seed return array
  var r = [];
  var strand = null;

  for (var ratio = 0; ratio < ratios.length; ratio++) {
    for (var base = 0; base < bases.length; base++) {

      strand = (base + ratio);
      _base = parseFloat(bases[base]);
      _ratio = parseFloat(ratios[ratio]);

      // Seed list with an initial value
      // r.push(_base);

      // Find values on a positive scale
      if (value >= 0) {
        // Find lower values on the scale
        var i = 0;
        while((Math.pow(_ratio, i) * _base) >= parseFloat(bases[0])) {
          r.push([Math.pow(_ratio, i) * _base, strand]);
          // Break if the _ratio is 1, avoid endless while loop
          if (_ratio == 1) {
            break;
          }
          i--;
        }

        // Find higher possible values on the scale
        var i = 0;
        while(Math.pow(_ratio, i) * _base <= Math.pow(_ratio, value + 1) * _base) {
          r.push([Math.pow(_ratio, i) * _base, strand]);
          // Break if the _ratio is 1, avoid endless while loop
          if (_ratio == 1) {
            break;
          }
          i++;
        }
      } else {
        // Find values on a negitve scale
        var i = 0;
        while((Math.pow(_ratio, i) * _base) <= parseFloat(bases[0])) {
          r.push([Math.pow(_ratio, i) * _base, strand]);
          // Break if the _ratio is 1, avoid endless while loop
          if (_ratio == 1) {
            break;
          }
          i++;
        }

        // // Find higher possible values on the scale
        var i = 0;
        while((Math.pow(_ratio, i) * _base) >= (Math.pow(_ratio, value - 1) * _base)) {
          if (Math.pow(_ratio, i) * _base <= parseFloat(bases[0])) {
            r.push([Math.pow(_ratio, i) * _base, strand]);
            // Break if the _ratio is 1, avoid endless while loop
            if (_ratio == 1) {
              break;
            }
          }
          i--;
        }
      }
    }
  }

  r = ms.msUnique(r);

  // reverse array if value is negitive
  if(value < 0) {
    r = r.reverse();
  }

  if (Math.abs(value) < r.length) {
    return r[Math.abs(value)][0];
  } else {
    return r[r.length - 1][0];
  }
}

module.exports = ms;
