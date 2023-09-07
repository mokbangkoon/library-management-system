import star from '../../../../assets/images/star.svg';
import styles from './bestBook.module.css';
const BestBookCard = ({
  idx,
  img,
  title,
  writer,
}: {
  idx: number;
  img: string;
  title: string;
  writer: string;
}) => {
  return (
    <div className={styles.card}>
      {idx + 1 == 1 ? (
        <div className={styles.topWrapper}>
          <img src={star} />
          <span className={styles.top}>UBcare Best {idx + 1}</span>
          <img src={star} />
        </div>
      ) : (
        <div className={styles.rank}>{idx + 1}</div>
      )}
      <div className={styles.wrapper}>
        <img className={styles.cover} src={img}></img>
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.writer}>{writer}</div>
        </div>
      </div>
    </div>
  );
};
export default BestBookCard;
