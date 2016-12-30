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

  var inputs = document.querySelectorAll('.control-panel input');
  for (var i = 0; i < inputs.length; i++) {
    var val = floatElseString(inputs[i].value);
    data[inputs[i].name] = val;
    inputs[i].addEventListener('input', onInputChange);
  }

  function onInputChange(e) {
    var name = e.target.name;
    var val = floatElseString(e.target.value);

    data[name] = val;

    if (name == "font-base" || name == "ratio") {
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

    for (var i = 0; i < els.length; i++) {
      console.log(size);
      els[i].style.fontSize = size;
    }
  }

  function getFontSize(el) {
    var base = splitUnits(data['font-base']);
    var ratio = data['ratio'];
    var step = data[el + '-step'];
    var size;
    if (step !== undefined) {
      console.log(step, base.val, ratio);
      size = (ms.ms(step, [base.val], [ratio]) * base.val) + base.units;
    } else {
      size = data['font-base'];
    }
    return size;
  }

  updateAllFontSizes(data);

  window.ms = ms;
}(window, document));
