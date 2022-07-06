import '../styles.css';
import { ImSearch } from 'react-icons/im';
const { Component } = require('react');

class Searchbar extends Component {
  state = {
    name: '',
    page: 1,
  };

  inputChange = e => {
    this.setState({ name: e.currentTarget.value });
  };

  resetForm = () => {
    this.setState({ name: '' });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, page } = this.state;
    this.props.onSubmit(name, page);
    this.resetForm();
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">
              <ImSearch />
            </span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={this.state.name}
            onChange={this.inputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
