(function(window, document, undefined) {
  var update = require('./utilities/update');
  var splitUnits = require('./utilities/splitUnits');
  var floatElseString = require('./utilities/floatElseString');
  var FontManager = require('./utilities/fontManager');
  console.log("Rocket science. 🚀");

  var data = {
    _allEls: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
    _headers: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    minLineHeightMultiple: 0.5,
  };

  data._fontManager = new FontManager();

  var fontSelects = document.querySelectorAll('.control-panel select[data-font-select]');
  for (var i = 0; i < fontSelects.length; i++) {
    data._fontManager.registerDropdown(fontSelects[i]);
    data[fontSelects[i].name] = fontSelects[i].value;
    data[fontSelects[i].name + '-family'] = data._fontManager.getFontFamily(fontSelects[i].value);
    fontSelects[i].addEventListener('change', onFontSelected);
  }

  var inputs = document.querySelectorAll('.control-panel input');
  for (var i = 0; i < inputs.length; i++) {
    var val = floatElseString(inputs[i].value);
    data[inputs[i].name] = val;
    inputs[i].addEventListener('input', onInputChange);
  }

  function onFontSelected(e) {
    var name = e.target.name;
    var val = e.target.value;
    data[name] = val;
    data[name + '-family'] = data._fontManager.getFontFamily(val);
    if (name == "header-font") {
      update.headerStyling(data);
    } else {
      update.allStyling(data);
    }
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

  window._data = data;

  update.allStyling(data);
}(window, document));
