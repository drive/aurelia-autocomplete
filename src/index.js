import {AutoCompleteController} from './autocompletecontroller';
import {AutoCompleteConfiguration} from './autocompleteconfiguration';

export {AutoCompleteController};

export function configure(aurelia, callback) {

  let config = new AutoCompleteConfiguration();

  if (typeof callback === 'function') {
    callback(config);
  }

  aurelia.globalResources('./autocomplete');
}
