import { useEffect, useState } from 'react';
import styles from './purchasedBook.module.css';
const PurchasedBookCard = ({
  img,
  title,
  writer,
  categories,
}: {
  img: string;
  title: string;
  writer: string;
  categories: string;
}) => {
  const categoryTag = categories.split('>');
  const gradients = [
    'linear-gradient(180deg, #FFD4FF 0%, #FFF4F7 0.01%, #EBE4FF 100%)',
    'linear-gradient(180deg, #FFEFEB 0%, #F9EAFF 100%)',
    'linear-gradient(180deg, #E8F7FF 0%, #FEE8D5 100%)',
    'linear-gradient(180deg, #FFF5E7 0%, #FFDFD4 100%)',
  ];
  const [currentGradientIndex, setCurrentGradientIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    setCurrentGradientIndex(gradients[randomIndex]);
  }, []);

  return (
    <div className={styles.card} style={{ background: currentGradientIndex }}>
      <div className={styles.coverWrapper}>
        <img className={styles.cover} src={img}></img>
      </div>
      <div className={styles.info}>
        <div className={styles.categoryWrapper}>
          {categoryTag.map((category, idx) => {
            return (
              <span className={styles.category} key={idx}>
                {category}
              </span>
            );
          })}
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.writer}>{writer}</div>
      </div>
    </div>
  );
};

export default PurchasedBookCard;
