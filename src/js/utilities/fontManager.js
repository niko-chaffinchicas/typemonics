function FontManager() {
  var self = this;
  self._baseHref = 'https://fonts.googleapis.com/css?family=$font:400,400i,700"';
  self.loadedFonts = ["Roboto"];
  self.availableFonts = {
    "Roboto": "Roboto",
    "Kumar+One": "Kumar One",
    "Open+Sans": "Open Sans",
    "Montserrat": "Montserrat"
  }
}

FontManager.prototype.getFontFamily = function(fontKey) {
  var self = this;
  var family = self.availableFonts[fontKey] || fontKey;
  console.log(family);
  return family;
};

FontManager.prototype._getFontOption = function(fontKey) {
  var self = this;
  var opt = document.createElement('option');
  opt.value = fontKey;
  opt.innerHTML = self.availableFonts[fontKey];
  return opt;
}

FontManager.prototype._getFontLink = function(fontKey) {
  var self = this;
  var link = document.createElement('link');
  link.rel = "stylesheet";
  link.href = self._baseHref.replace('$font', fontKey);
  return link;
}

FontManager.prototype.registerDropdown = function(select) {
  var self = this;
  select.addEventListener('change', function(e) {
    self._onSelectChange.call(self, e);
  });
  for (var font in self.availableFonts) {
    if (!select.querySelector('option[value="' + font + '"]')) {
      var opt = self._getFontOption(font);
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
