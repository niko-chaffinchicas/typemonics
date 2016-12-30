var _availableFonts = require('./_availableFonts');

function FontManager() {
  var self = this;
  self._baseHref = 'https://fonts.googleapis.com/css?family=$font:400,400i,700"';
  self.loadedFonts = ["Roboto"];
  self.availableFonts = _availableFonts;
}

FontManager.prototype.getFontFamily = function(fontKey) {
  var self = this;
  var family = fontKey;
  if (self.availableFonts.indexOf(fontKey) > -1) {
    family = family.replace(/\+/g, ' ');
  }
  return family;
};

FontManager.prototype._getFontOption = function(fontKey) {
  var self = this;
  var opt = document.createElement('option');
  opt.value = fontKey;
  opt.innerHTML = self.getFontFamily(fontKey);
  return opt;
}

FontManager.prototype._getFontLink = function(fontKey) {
  var self = this;
  var link = document.createElement('link');
  link.rel = "stylesheet";
  link.href = self._baseHref.replace('$font', fontKey);
  return link;
}

FontManager.prototype.registerDropdown = function(select, _selected) {
  var self = this;
  select.addEventListener('change', function(e) {
    self._onSelectChange.call(self, e);
  });
  for (var i = 0; i < self.availableFonts.length; i++) {
    var font = self.availableFonts[i];
    if (!select.querySelector('option[value="' + font + '"]')) {
      var opt = self._getFontOption(font);
      if (_selected == font) {
        opt.setAttribute('selected', '');
      }
      select.appendChild(opt);
    }
  }
}

FontManager.prototype._onSelectChange = function(e) {
  var self = this;
  var font = e.target.value;
  if (self.loadedFonts.indexOf(font) == -1) {
    var link = self._getFontLink(font);
    document.head.appendChild(link);
    self.loadedFonts.push(font);
    // console.log("Loaded up", font);
  }
}

module.exports = FontManager;
