import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from './reviewBook.module.css';
const ReviewBookCard = ({
  img,
  title,
  writer,
  content,
  name,
  rating,
  createDateTime,
}: {
  img: string;
  title: string;
  writer: string;
  content?: string;
  name?: string;
  rating?: number;
  createDateTime?: Date;
}) => {
  const background = ['#FFF5F5', '#FFF9F1', '#FFFDF0', '#FFFDF3', '#FFFDF5'];
  const [currentGradientIndex, setCurrentGradientIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * background.length);
    setCurrentGradientIndex(background[randomIndex]);
  }, []);
  return (
    <div className={styles.card} style={{ background: currentGradientIndex }}>
      <div className={styles.coverWrapper}>
        <img className={styles.cover} src={img}></img>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.writer}>{writer}</div>
        <div className={styles.rate}>
          <div className={styles.content}>{content}</div>
          <div>{rating}</div>
        </div>
        <div className={styles.reviewer}>
          <span className={styles.name}>{name}</span>
          <span>{moment(createDateTime).format('YYYY.MM.DD')}</span>
        </div>
      </div>
    </div>
  );
};
export default ReviewBookCard;
