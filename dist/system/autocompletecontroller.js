"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var AutoCompleteController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("AutoCompleteController", AutoCompleteController = function () {
        function AutoCompleteController(search) {
          _classCallCheck(this, AutoCompleteController);

          this.search = search;
        }

        AutoCompleteController.prototype.search = function search(searchText) {
          var _this = this;

          return this.search(searchText).then(function (results) {
            var suggestions = [];
            for (var _iterator = results, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var result = _ref;

              suggestions.push(_this.createSuggestion(result));
            }
            return suggestions;
          });
        };

        AutoCompleteController.prototype.formatSuggestion = function formatSuggestion(suggestion) {
          return suggestion.toString();
        };

        AutoCompleteController.prototype.createSuggestion = function createSuggestion(suggestion) {
          suggestion.selectedText = this.formatSuggestion(suggestion);
          return suggestion;
        };

        return AutoCompleteController;
      }());

      _export("AutoCompleteController", AutoCompleteController);
    }
  };
});