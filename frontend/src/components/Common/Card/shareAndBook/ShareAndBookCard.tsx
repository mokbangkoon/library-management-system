import find from '../../../../assets/images/find.svg';
import next from '../../../../assets/images/next.svg';
import share from '../../../../assets/images/share.svg';
import styles from './shareAndBook.module.css';
const ShareAndBookCard = ({
  idx,
  type,
  img,
  title,
  writer,
}: {
  idx?: number;
  type: string;
  img: string;
  title: string;
  writer: string;
}) => {
  const cardClassName = `${styles.card} ${type}`;

  return (
    <div
      className={`${cardClassName} ${
        type === 'share' ? styles.shareBackground : styles.findBackground
      }`}
    >
      {idx == 0 ? (
        <div className={styles.guide}>
          <img
            className={styles.guideImg}
            src={type === 'share' ? share : find}
          />
          <div className={styles.guideTitle}>{title}</div>
          <div className={styles.guideWrapper}>
            <span className={styles.guideSubTitle}>{writer}</span>
            <img src={next} />
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.coverWrapper}>
            <img className={styles.cover} src={img}></img>
          </div>
          <div className={styles.info}>
            <div className={styles.title}>{title}</div>
            <div className={styles.writer}>{writer}</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShareAndBookCard;
