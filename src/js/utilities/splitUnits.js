var floatElseString = require('./floatElseString');

function splitUnits(val) {
  var d = val.split(/([^\.\d]+)/, 2);
  d[0] = floatElseString(d[0]);
  return {
    val: d[0],
    units: d[1]
  }
}

module.exports = splitUnits;
