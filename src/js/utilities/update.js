var ms = require('../vendor/modularscale');
var splitUnits = require('./splitUnits');
var floatElseString = require('./floatElseString');
_out = {};

_out.allStyling = function(data) {
  for (var i = 0; i < data._allEls.length; i++) {
    _out.styling(data._allEls[i], data);
  }
}

_out.styling = function(el, data) {
  var els = document.querySelectorAll('.sample-content ' + el);
  var size = _out._getFontSize(el, data);
  var lh = _out._getLineHeight(size, data);
  var _blh = splitUnits(data['base-line-height']);
  var margin = (_blh.val * data.minLineHeightMultiple) + _blh.units;

  for (var i = 0; i < els.length; i++) {
    els[i].style.fontSize = size;
    els[i].style.lineHeight = lh;
    els[i].style.marginTop = margin;
    els[i].style.marginBottom = margin;
  }
}

_out._getLineHeight = function(fontSize, data) {
  var _lh = splitUnits(data['base-line-height']);
  var out = _lh.val;
  var _fs = splitUnits(fontSize);
  while (out < _fs.val) {
    out += _lh.val * data.minLineHeightMultiple;
  }
  return out + _lh.units;
}

_out._getFontSize = function(el, data) {
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

module.exports = _out;
