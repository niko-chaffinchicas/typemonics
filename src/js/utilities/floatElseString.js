function floatElseString(val) {
  if (val !== undefined && val.match(/^[\d\.\-]+$/g)) {
    val = parseFloat(val);
  }
  return val;
}

module.exports = floatElseString;
