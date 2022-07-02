import styles from './ProgressBar.module.css';

const ProgressBar = ({ percentage }) => {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <p className={styles.label}>0</p>
        <p className={styles.label}>50</p>
        <p className={styles.label}>100</p>
      </div>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className={styles.labelPContainer}>
        <p className={styles.labelP}>%</p>
      </div>
    </div>
  );
};

export default ProgressBar;
