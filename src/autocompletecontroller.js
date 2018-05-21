export class AutoCompleteController {
  constructor(search, formatSuggestion = null) {
    this._search = search;
    this._formatSuggestion = formatSuggestion;
  }

  search(searchText) {
    return this._search(searchText)
      .then(results => {
        let suggestions = [];
        for (let result of results) {
          suggestions.push(this.createSuggestion(result));
        }
        return suggestions;
      });
  }

  formatSuggestion(suggestion) {
    if (this._formatSuggestion)
      return this._formatSuggestion(suggestion);
    else
      return suggestion.toString();
  }

  createSuggestion(suggestion) {
    suggestion.selectedText = this.formatSuggestion(suggestion);
    return suggestion;
  }
}