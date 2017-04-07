export class AutoCompleteController {
  constructor(search) {
    this.search = search;
  }

  search(searchText) {
    return this.search(searchText)
      .then(results => {
        let suggestions = [];
        for(let result of results) {
          suggestions.push(this.createSuggestion(result));
        }
        return suggestions;
      });
  }
    
  formatSuggestion(suggestion) {
    return suggestion.toString();
  }

  createSuggestion(suggestion) {
    suggestion.selectedText = this.formatSuggestion(suggestion);
    return suggestion;
  }
}