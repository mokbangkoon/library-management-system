import find from '@assets/images/find.svg';
import next from '@assets/images/next.svg';
import share from '@assets/images/share.svg';
import { Link } from 'react-router-dom';
import styles from './shareAndBook.module.css';
const ShareAndBookCard = ({
  idx,
  bookId,
  type,
  img,
  title,
  writer,
}: {
  idx?: number;
  bookId: number;
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
      {idx === 0 ? (
        <Link to={`book/guide/${type}`}>
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
        </Link>
      ) : (
        <Link to={`book/${bookId}`}>
          <div className={styles.coverWrapper}>
            <img className={styles.cover} src={img}></img>
          </div>
          <div className={styles.info}>
            <div className={styles.title}>{title}</div>
            <div className={styles.writer}>{writer}</div>
          </div>
        </Link>
      )}
    </div>
  );
};
export default ShareAndBookCard;
