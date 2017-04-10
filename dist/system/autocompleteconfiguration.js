'use strict';

System.register(['./autocompleteoptions'], function (_export, _context) {
  "use strict";

  var autoCompleteOptions, AutoCompleteConfiguration;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_autocompleteoptions) {
      autoCompleteOptions = _autocompleteoptions.autoCompleteOptions;
    }],
    execute: function () {
      _export('AutoCompleteConfiguration', AutoCompleteConfiguration = function AutoCompleteConfiguration() {
        _classCallCheck(this, AutoCompleteConfiguration);

        this.settings = autoCompleteOptions;
      });

      _export('AutoCompleteConfiguration', AutoCompleteConfiguration);
    }
  };
});