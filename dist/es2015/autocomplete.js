var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
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

import { bindingMode, observable, BindingEngine } from 'aurelia-binding';
import { bindable, InlineViewStrategy } from 'aurelia-templating';
import { Focus } from 'aurelia-templating-resources';
import { inject, Optional } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { TaskQueue } from 'aurelia-task-queue';
import { autoCompleteOptions } from './autocompleteoptions';

let nextID = 0;

export let Autocomplete = (_dec = inject(Element, BindingEngine, TaskQueue, Optional.of(Focus)), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = class Autocomplete {

  constructor(element, bindingEngine, taskQueue, focus) {
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

  detached() {
    if (this.focusSubscription !== null) {
      this.focusSubscription.dispose();
    }
  }

  display(name) {
    this.updatingInput = true;
    this.inputValue = name;
    this.updatingInput = false;
  }

  formatSuggestion(suggestion) {
    if (suggestion == null) {
      return '';
    }
    return this.controller.formatSuggestion(suggestion);
  }

  collapse() {
    this.expanded = false;
    this.index = -1;
  }

  select(suggestion) {
    this.value = suggestion;
    const name = this.formatSuggestion(this.value);
    this.userInput = name;
    this.display(name);
    this.collapse();
  }

  valueChanged() {
    this.select(this.value);
  }

  inputValueChanged(value) {
    if (this.updatingInput) {
      return;
    }
    this.userInput = value;
    if (value === '') {
      this.value = null;
      this.collapse();
      return;
    }
    this.controller.search(value).then(suggestions => {
      this.index = -1;
      this.suggestions.splice(0, this.suggestions.length, ...suggestions);
      if (suggestions.length === 1) {
        this.select(suggestions[0]);
      } else if (suggestions.length === 0) {
        this.collapse();
      } else {
        this.expanded = true;
      }
    });
  }

  scroll() {
    const ul = this.suggestionsUL;
    const li = ul.children.item(this.index === -1 ? 0 : this.index);
    if (li.offsetTop + li.offsetHeight > ul.offsetHeight) {
      ul.scrollTop += li.offsetHeight;
    } else if (li.offsetTop < ul.scrollTop) {
      ul.scrollTop = li.offsetTop;
    }
  }

  keydown(key) {
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
  }

  blur() {
    this.select(this.value);
    this.taskQueue.queueMicroTask(() => this.element.dispatchEvent(DOM.createCustomEvent('blur')));
  }

  suggestionClicked(suggestion) {
    this.select(suggestion);
  }

  focusChanged(newFocus, oldFocus) {
    if (newFocus) {
      this.taskQueue.queueMicroTask(() => this.element.querySelector("input").focus());
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'controller', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'title', [bindable], {
  enumerable: true,
  initializer: function () {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [bindable], {
  enumerable: true,
  initializer: function () {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'disabled', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'delay', [bindable], {
  enumerable: true,
  initializer: function () {
    return 300;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'small', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'horizontal', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'inputValue', [observable], {
  enumerable: true,
  initializer: function () {
    return '';
  }
})), _class2)) || _class);