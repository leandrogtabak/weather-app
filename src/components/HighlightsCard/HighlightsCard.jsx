import styles from './HighlightsCard.module.css';

const HighlightsCard = ({ title, value, unit, children }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.measurement}>
        <p className={styles.value}>{value}</p>
        <p className={styles.unit}>{unit}</p>
      </div>

      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default HighlightsCard;
