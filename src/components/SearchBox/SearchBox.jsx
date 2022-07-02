import styles from './SearchBox.module.css';
import { SearchRounded } from '@material-ui/icons';

const SearchBox = ({ onInputSearch, onKeyPress }) => {
  const handleOnChange = (e) => {
    onInputSearch(e.target.value);
  };
  const handleKeyPress = (e) => {
    onKeyPress(e);
  };

  return (
    <div className={styles.container}>
      <SearchRounded className={styles.searchIcon} />
      <input onKeyPress={handleKeyPress} onChange={handleOnChange} className={styles.input} type='text' placeholder='search location' />
    </div>
  );
};

export default SearchBox;
