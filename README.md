# aurelia-autocomplete

aurelia-autocomplete is a plugin for the Aurelia platform for a autocomplete control.

Shamelessly ripped, _improved_, and packaged from a @jdanyow gist https://gist.github.com/jdanyow/acf8253329939b2e046cd0e3394351fe. Inspired by a want to escape a jQuery implementation we had been using in drivesoftware/aurelia-widgets.

Currently implemented for bootstrap but this could be abstracted in future.

### Installation

`npm install drivesoftware/aurelia-autocomplete`

aurelia.json:
```json
{
   "name": "aurelia-autocomplete",
   "main": "index",
   "path": "../node_modules/aurelia-autocomplete/dist/amd",
   "resources": [
      "*.js",
      "*.html",
      "autocomplete.css"
   ]
}
```

### Basic Usage

Activate the plugin in your application's aurelia configure callback:

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-autocomplete');

  aurelia.start().then(a => a.setRoot());
}
```

In your view

```html
<autocomplete value.bind="selectedValue" controller.bind="clientAutoCompleteController"></autocomplete>
```

In your view model

```javascript
import {AutoCompleteController} from 'aurelia-autocomplete';

//...

this.selectedValue = null;
this.clientAutoCompleteController = new AutoCompleteController((searchText) => this.clientApi.search(searchText));
```

The default controller implementation provided expects a single constructor argument which is a search function `suggestion[] search(string searchText)`. The result of the search function should be an array of suggestions based on the search text. A second optional constructor argument allows provision of a callback of the form `string formatSuggestion(suggestion)` if no value is provided, `toString()` is used on the suggestion objects.

### Advanced Usage

#### AutoCompleteController

Provide a format suggestion callback

`string formatSuggestion(suggestion)`

Used to convert a suggestion to a string of text describing that suggestion. Default implementation just calls `suggestion.toString()`

**Example**
Given suggestion results 
```json
{
  "code": "A-SUGGESTION",
  "description": "A Suggestion Result"
}
```

you could format suggestions by creating a controller using

```javascript
new AutoCompleteController(someSearchCallback, (suggestion) => `${suggestion.code} ${suggestion.description}`);
}

// example suggestion when selected or listed would be formatted as 'A-SUGGESTION A Suggestion Result'
```

`suggestion createSuggestion(suggestion)`

 Used to create suggestion objects for the autocomplete control. Default implementation adds a `selectedText` property (using `formatSuggestion`) to the suggestion which is used by the default suggestion result template (which is a replacable part described below).

 The default suggestion template used by the autocomplete control uses a compose element to render a configurable/dynamic view
```html
<!-- the replacable suggestion part -->
<template replaceable part="suggestion">
  <compose view.bind="suggestionView" view-model.bind="suggestion"></compose>
</template>

<!-- the default view template passed to suggestionView -->
<template>${selectedText}</template
```
where the `selectedText` property will be created by `createSuggestion`

**Example**

Use the code and description properties of the above suggestion results.

Create suggestions that include code and description properties:
```javascript
createSuggestion(suggestion) {
  return {
    id: suggestion.id,
    code: suggestion.code,
    description: suggestion.description
  };
}
```

Format the autocomplete results with code in bold by replacing the suggestion part:
```html
<autocomplete value.bind="selectedValue" controller.bind="clientAutoCompleteController">
  <template replace-part="suggestion"><strong>${suggestion.code}</strong> ${suggestion.description}</template>
</autocomplete>
```

If you have a common format across your application that you would like to use for suggestions in all places where the autocomplete used (and the default `selectedText` does not satisfy your needs) you can configure the template used by the compose in the fallback slot. This means you will not need the extra part replacement line in your markup `<template replaceable part="suggestion"><strong>${suggestion.code}</strong> ${suggestion.description}</template>` for every autocomplete control. This is done via plugin configuration:

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-autocomplete', config => {
      config.settings.suggestionTemplate = '<template><strong>${code}</strong> ${description}</template>'
    });

  aurelia.start().then(a => a.setRoot());
}
```

**NOTE:** the properties used by the template are not `suggestion.` prefixed as they are when replacing the slot content inline.

### Webpack Installation
If you are using Webpack and Aurelia, there are a few additional steps you must complete before you can make usage of this plugin.

1. Run `npm install drivesoftware/aurelia-autocomplete`
2. Insert `aurelia.use.plugin(PLATFORM.moduleName('aurelia-autocomplete'));` into your main bootstrapping file (such as `main.ts`)
3. Add the following code to the `webpack.config.js` file. Insert it between `new AureliaPlugin(),` and `new ProvidePlugin({ 'Promise': 'bluebird' }),`:
```js
new ModuleDependenciesPlugin({
  'aurelia-autocomplete': [
    './autocomplete.js',
    './autocomplete.html',
    './autocompleteconfiguration.js',
    './autocompletecontroller.js',
    './autocompleteoptions.js',
  ],
}),
```

Now you should be able to successfully use the plugin like normal.
