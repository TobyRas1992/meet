import React, {Component} from 'react';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: []
  }

  handleInputChanged = (event) => { 
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().includes(value.toUpperCase())});
    this.setState({query: value, suggestions}); //takes value from input and updates state of query based on that value.
  }

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion
    });
    this.props.updateEvents(suggestion); // sets events state with events with same location as selected city. 
  }

  render() {
    return (
      <div className="CitySearch">
        <input type="text"className="city" value={this.state.query} onChange={this.handleInputChanged} /> {/* all textObjects have a value property */}
        <ul className="suggestions">
          {this.state.suggestions.map((suggestion) => (
            <li key={suggestion}
            onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>))} 
            {/* onClick holds a reference to handleItemCLicked(), we must wrap it in an outer function to pass in a named argument */}
          <li onClick={() => this.handleItemClicked('all')}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;