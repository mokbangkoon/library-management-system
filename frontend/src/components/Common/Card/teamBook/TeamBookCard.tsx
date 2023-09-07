import styles from './teamBook.module.css';
const TeamBookCard = ({
  img,
  title,
  writer,
}: {
  img: string;
  title: string;
  writer: string;
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.coverWrapper}>
        <img className={styles.cover} src={img} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.writer}>{writer}</div>
      </div>
    </div>
  );
};
export default TeamBookCard;
