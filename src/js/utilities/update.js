var ms = require('../vendor/modularscale');
var splitUnits = require('./splitUnits');
var floatElseString = require('./floatElseString');
update = {};

update.allStyling = function(data) {
  for (var i = 0; i < data._allEls.length; i++) {
    update.styling(data._allEls[i], data);
  }
}

update.headerStyling = function(data) {
  for (var i = 0; i < data._headers.length; i++) {
    update.styling(data._headers[i], data);
  }
}

update.styling = function(el, data) {
  var els = document.querySelectorAll('.sample-content ' + el);
  var size = update._getFontSize(el, data);
  var lh = update._getLineHeight(size, data);
  var _blh = splitUnits(data['base-line-height']);
  var font = data['body-font-family'];
  document.querySelector('.sample-content').style.fontFamily = "\'$font\'".replace('$font', font);
  if (data._headers.indexOf(el) > -1) {
    font = data['header-font-family'] || data['body-font-family'];
  }
  // console.log(font);
  var margin = (_blh.val * data.minLineHeightMultiple) + _blh.units;

  for (var i = 0; i < els.length; i++) {
    els[i].style.fontFamily = "'$font'".replace('$font', font);
    els[i].style.fontSize = size;
    els[i].style.lineHeight = lh;
    els[i].style.marginTop = margin;
    els[i].style.marginBottom = margin;
  }
}

update._getLineHeight = function(fontSize, data) {
  var _lh = splitUnits(data['base-line-height']);
  var out = _lh.val;
  var _fs = splitUnits(fontSize);
  while (out < _fs.val) {
    out += _lh.val * data.minLineHeightMultiple;
  }
  return out + _lh.units;
}

update._getFontSize = function(el, data) {
  var base = splitUnits(data['font-base']);
  var ratio = data['ratio'];
  var step = data[el + '-step'];
  var size;
  if (step !== undefined) {
    size = (ms.ms(step, [base.val], [ratio]) * base.val) + base.units;
  } else {
    size = data['font-base'];
  }
  return size;
}

module.exports = update;
