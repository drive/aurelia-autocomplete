'use strict';

System.register(['aurelia-binding', 'aurelia-templating', 'aurelia-templating-resources', 'aurelia-dependency-injection', 'aurelia-pal', 'aurelia-task-queue', './autocompleteoptions'], function (_export, _context) {
  "use strict";

  var bindingMode, observable, BindingEngine, bindable, InlineViewStrategy, Focus, inject, Optional, DOM, TaskQueue, autoCompleteOptions, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, nextID, Autocomplete;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaBinding) {
      bindingMode = _aureliaBinding.bindingMode;
      observable = _aureliaBinding.observable;
      BindingEngine = _aureliaBinding.BindingEngine;
    }, function (_aureliaTemplating) {
      bindable = _aureliaTemplating.bindable;
      InlineViewStrategy = _aureliaTemplating.InlineViewStrategy;
    }, function (_aureliaTemplatingResources) {
      Focus = _aureliaTemplatingResources.Focus;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
      Optional = _aureliaDependencyInjection.Optional;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_aureliaTaskQueue) {
      TaskQueue = _aureliaTaskQueue.TaskQueue;
    }, function (_autocompleteoptions) {
      autoCompleteOptions = _autocompleteoptions.autoCompleteOptions;
    }],
    execute: function () {
      nextID = 0;

      _export('Autocomplete', Autocomplete = (_dec = inject(Element, BindingEngine, TaskQueue, Optional.of(Focus)), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function Autocomplete(element, bindingEngine, taskQueue, focus) {
          _classCallCheck(this, Autocomplete);

          _initDefineProp(this, 'controller', _descriptor, this);

          _initDefineProp(this, 'value', _descriptor2, this);

          _initDefineProp(this, 'title', _descriptor3, this);

          _initDefineProp(this, 'placeholder', _descriptor4, this);

          _initDefineProp(this, 'disabled', _descriptor5, this);

          _initDefineProp(this, 'delay', _descriptor6, this);

          _initDefineProp(this, 'small', _descriptor7, this);

          _initDefineProp(this, 'horizontal', _descriptor8, this);

          _initDefineProp(this, 'inputValue', _descriptor9, this);

          this.id = nextID++;
          this.expanded = false;
          this.updatingInput = false;
          this.suggestions = [];
          this.index = -1;
          this.suggestionsUL = null;
          this.userInput = '';

          this.element = element;
          this.bindingEngine = bindingEngine;
          this.taskQueue = taskQueue;

          this.focusSubscription = null;
          if (focus) {
            this.focusSubscription = this.bindingEngine.propertyObserver(focus, "value").subscribe(this.focusChanged.bind(this));
          }

          this.suggestionView = new InlineViewStrategy(autoCompleteOptions.suggestionTemplate);
        }

        Autocomplete.prototype.detached = function detached() {
          if (this.focusSubscription !== null) {
            this.focusSubscription.dispose();
          }
        };

        Autocomplete.prototype.display = function display(name) {
          this.updatingInput = true;
          this.inputValue = name;
          this.updatingInput = false;
        };

        Autocomplete.prototype.formatSuggestion = function formatSuggestion(suggestion) {
          if (suggestion == null) {
            return '';
          }
          return this.controller.formatSuggestion(suggestion);
        };

        Autocomplete.prototype.collapse = function collapse() {
          this.expanded = false;
          this.index = -1;
        };

        Autocomplete.prototype.select = function select(suggestion) {
          this.value = suggestion;
          var name = this.formatSuggestion(this.value);
          this.userInput = name;
          this.display(name);
          this.collapse();
        };

        Autocomplete.prototype.valueChanged = function valueChanged() {
          this.select(this.value);
        };

        Autocomplete.prototype.inputValueChanged = function inputValueChanged(value) {
          var _this = this;

          if (this.updatingInput) {
            return;
          }
          this.userInput = value;
          if (value === '') {
            this.value = null;
            this.collapse();
            return;
          }
          this.controller.search(value).then(function (suggestions) {
            var _suggestions;

            _this.index = -1;
            (_suggestions = _this.suggestions).splice.apply(_suggestions, [0, _this.suggestions.length].concat(suggestions));
            if (suggestions.length === 1) {
              _this.select(suggestions[0]);
            } else if (suggestions.length === 0) {
              _this.collapse();
            } else {
              _this.expanded = true;
            }
          });
        };

        Autocomplete.prototype.scroll = function scroll() {
          var ul = this.suggestionsUL;
          var li = ul.children.item(this.index === -1 ? 0 : this.index);
          if (li.offsetTop + li.offsetHeight > ul.offsetHeight) {
            ul.scrollTop += li.offsetHeight;
          } else if (li.offsetTop < ul.scrollTop) {
            ul.scrollTop = li.offsetTop;
          }
        };

        Autocomplete.prototype.keydown = function keydown(key) {
          if (!this.expanded) {
            return true;
          }

          if (key === 40) {
            if (this.index < this.suggestions.length - 1) {
              this.index++;
              this.display(this.formatSuggestion(this.suggestions[this.index]));
            } else {
              this.index = -1;
              this.display(this.userInput);
            }
            this.scroll();
            return;
          }

          if (key === 38) {
            if (this.index === -1) {
              this.index = this.suggestions.length - 1;
              this.display(this.formatSuggestion(this.suggestions[this.index]));
            } else if (this.index > 0) {
              this.index--;
              this.display(this.formatSuggestion(this.suggestions[this.index]));
            } else {
              this.index = -1;
              this.display(this.userInput);
            }
            this.scroll();
            return;
          }

          if (key === 27) {
            this.display(this.userInput);
            this.collapse();
            return;
          }

          if (key === 13 || key === 9) {
            if (this.index >= 0) {
              this.select(this.suggestions[this.index]);
            }
            return;
          }

          return true;
        };

        Autocomplete.prototype.blur = function blur() {
          var _this2 = this;

          this.select(this.value);
          this.taskQueue.queueMicroTask(function () {
            return _this2.element.dispatchEvent(DOM.createCustomEvent('blur'));
          });
        };

        Autocomplete.prototype.suggestionClicked = function suggestionClicked(suggestion) {
          this.select(suggestion);
        };

        Autocomplete.prototype.focusChanged = function focusChanged(newFocus, oldFocus) {
          var _this3 = this;

          if (newFocus) {
            this.taskQueue.queueMicroTask(function () {
              return _this3.element.querySelector("input").focus();
            });
          }
        };

        return Autocomplete;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'controller', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'title', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'disabled', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'delay', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return 300;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'small', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'horizontal', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'inputValue', [observable], {
        enumerable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class));

      _export('Autocomplete', Autocomplete);
    }
  };
});