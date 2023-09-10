import nextBtn from '@assets/images/prevBtn.svg';
import styles from './slider.module.css';

export function PrevButton(props) {
  const { className, style, onClick } = props;
  return (
    <button className={styles.btnPrev} style={style} onClick={onClick}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={nextBtn} />
      </div>
    </button>
  );
}
