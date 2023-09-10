import nextBtn from '@assets/images/nextBtn.svg';
import styles from './slider.module.css';
export function NextButton(props) {
  const { style, onClick } = props;
  return (
    <button className={styles.btnNext} style={style} onClick={onClick}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={nextBtn} />
      </div>
    </button>
  );
}
