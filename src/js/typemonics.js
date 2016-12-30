(function(window, document, undefined) {
  var update = require('./utilities/update');
  var splitUnits = require('./utilities/splitUnits');
  var floatElseString = require('./utilities/floatElseString');
  console.log("Rocket science. 🚀");

  var data = {
    _allEls: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
    minLineHeightMultiple: 0.5
  };

  var inputs = document.querySelectorAll('.control-panel input');
  for (var i = 0; i < inputs.length; i++) {
    var val = floatElseString(inputs[i].value);
    data[inputs[i].name] = val;
    inputs[i].addEventListener('input', onInputChange);
  }

  function onInputChange(e) {
    var name = e.target.name;
    var val = floatElseString(e.target.value);
    if (e.target.hasAttribute('data-val-min')) {
      var _min = parseFloat(e.target.getAttribute('data-val-min'));
      var _val = val;
      if (typeof _val === "string") {
        _val = splitUnits(_val).val;
      }
      if (_val < _min) {
        return;
      }
    }

    data[name] = val;

    var updateAllKeys = ['font-base', 'ratio', 'base-line-height'];
    if (updateAllKeys.indexOf(name) > -1) {
      update.allStyling(data);
    } else if (name.indexOf('-step') > -1) {
      var el = name.replace('-step', '');
      update.styling(el, data);
    }
  }

  update.allStyling(data);
}(window, document));
