import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import '../styles.css';
import s from './Searchbar.module.css';
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
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>
              <ImSearch />
            </span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.name}
            onChange={this.inputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
