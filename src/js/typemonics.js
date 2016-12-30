(function(window, document, undefined) {
  var ms = require('./vendor/modularscale');
  console.log("Rocket science. 🚀");

  function floatElseString(val) {
    if (val !== undefined && val.match(/^[\d\.\-]+$/g)) {
      val = parseFloat(val);
    }
    return val;
  }

  function splitUnits(val) {
    var d = val.split(/([^\.\d]+)/, 2);
    d[0] = floatElseString(d[0]);
    return {
      val: d[0],
      units: d[1]
    }
  }

  var data = {};
  var allEls = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
  var minLineHeightMultiple = 0.5;

  var inputs = document.querySelectorAll('.control-panel input');
  for (var i = 0; i < inputs.length; i++) {
    var val = floatElseString(inputs[i].value);
    data[inputs[i].name] = val;
    inputs[i].addEventListener('input', onInputChange);
  }

  function onInputChange(e) {
    var name = e.target.name;
    var val = floatElseString(e.target.value);
    if (typeof val === "string" && e.target.hasAttribute('data-val-min')) {
      var _min = parseFloat(e.target.getAttribute('data-val-min'));
      var _val = splitUnits(val);
      if (_val.val < _min) {
        return;
      }
    }

    data[name] = val;

    var updateAllKeys = ['font-base', 'ratio', 'base-line-height'];
    if (updateAllKeys.indexOf(name) > -1) {
      updateAllFontSizes(data);
    } else if (name.indexOf('-step') > -1) {
      var el = name.replace('-step', '');
      updateStyling(el, data);
    }
  }

  function updateAllFontSizes(data) {
    for (var i = 0; i < allEls.length; i++) {
      updateStyling(allEls[i], data);
    }
  }

  function updateStyling(el, data) {
    var els = document.querySelectorAll('.sample-content ' + el);
    var size = getFontSize(el);
    var lh = getLineHeight(size, data, minLineHeightMultiple);
    console.log(el, size, lh);

    for (var i = 0; i < els.length; i++) {
      els[i].style.fontSize = size;
      els[i].style.lineHeight = lh;
    }
  }

  function getLineHeight(fontSize, data, minLineHeightMultiple) {
    var _lh = splitUnits(data['base-line-height']);
    var out = _lh.val;
    var _fs = splitUnits(fontSize);
    while (out < _fs.val) {
      out += _lh.val * minLineHeightMultiple;
    }
    return out + _lh.units;
  }

  function getFontSize(el) {
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

  updateAllFontSizes(data);

  window.ms = ms;
}(window, document));
