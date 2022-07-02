import styles from './Button.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const Button = ({ label, onClick, tempUnit }) => {
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    if (label === tempUnit) {
      setBackgroundColor(styles.selected);
    } else {
      setBackgroundColor('');
    }
  }, [tempUnit]);

  const handleClick = (e) => {
    onClick(e);
  };

  return (
    <button className={`${styles.button} ${backgroundColor}`} onClick={handleClick}>
      {`°${label}`}
    </button>
  );
};

export default Button;
