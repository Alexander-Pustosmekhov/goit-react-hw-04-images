import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import '../styles.css';
import s from './Searchbar.module.css';
import { useState } from 'react';

function Searchbar({ onSubmit }) {
  const [name, setName] = useState('');
  const page = 1;

  const inputChange = e => {
    setName(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '') {
      return;
    }
    onSubmit(name.toLowerCase().trim(), page);
    setName('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
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
          value={name}
          onChange={inputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
