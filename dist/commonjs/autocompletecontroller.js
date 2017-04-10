"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AutoCompleteController = exports.AutoCompleteController = function () {
  function AutoCompleteController(search) {
    _classCallCheck(this, AutoCompleteController);

    this._search = search;
  }

  AutoCompleteController.prototype.search = function search(searchText) {
    var _this = this;

    return this._search(searchText).then(function (results) {
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
}();