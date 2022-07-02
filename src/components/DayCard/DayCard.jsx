import styles from './DayCard.module.css';

const DayCard = ({ day, image, tempMin, tempMax }) => {
  return (
    <div className={styles.container}>
      <p className={styles.day}>{day}</p>
      <img className={styles.image} src={image} alt='' />
      <div className={styles.temperatures}>
        <p className={styles.temperaturesMax}>{tempMax}</p>
        <p className={styles.temperaturesMin}>{tempMin}</p>
      </div>
    </div>
  );
};

export default DayCard;
