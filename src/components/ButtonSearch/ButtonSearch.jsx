import styles from './ButtonSearch.module.css';

const ButtonSearch = ({ onClickSearch }) => {
  return (
    <button onClick={onClickSearch} className={styles.button}>
      Search
    </button>
  );
};

export default ButtonSearch;
