import styles from './WindArrow.module.css';
import { NavigationRounded } from '@material-ui/icons';

const WindArrow = ({ grados, direction }) => {
  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer}>
        <NavigationRounded style={{ fontSize: '20px', transform: `rotate(${grados}deg)` }} />
      </div>
      <p>{direction}</p>
    </div>
  );
};

export default WindArrow;
