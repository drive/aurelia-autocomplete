import { bindingMode, observable, BindingEngine } from 'aurelia-binding';
import { bindable, InlineViewStrategy } from 'aurelia-templating';
import { Focus } from 'aurelia-templating-resources';
import { inject, Optional } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { TaskQueue } from 'aurelia-task-queue';
import { autoCompleteOptions } from './autocompleteoptions';

let nextID = 0;

@inject(Element, BindingEngine, TaskQueue, Optional.of(Focus))
export class Autocomplete {
  @bindable controller;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable title = '';
  @bindable placeholder = '';
  @bindable disabled = false;
  @bindable delay = 300;
  @bindable small = false;
  @bindable horizontal = false;
  @observable inputValue = '';

  id = nextID++;
  expanded = false;
  updatingInput = false;
  suggestions = [];
  index = -1;
  suggestionsUL = null;
  userInput = '';

  constructor(element, bindingEngine, taskQueue, focus) {
    this.element = element;
    this.bindingEngine = bindingEngine;
    this.taskQueue = taskQueue;

    this.focusSubscription = null;
    if (focus) {
      this.focusSubscription = this.bindingEngine.propertyObserver(focus, "value")
        .subscribe(this.focusChanged.bind(this));
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
    this.controller.search(value)
      .then(suggestions => {
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

    // down
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

    // up
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

    // escape
    if (key === 27) {
      this.display(this.userInput);
      this.collapse();
      return;
    }

    // enter
    if (key === 13) {
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
      this.element.querySelector("input").focus();
    }
  }
}