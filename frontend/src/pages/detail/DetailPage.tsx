import { getBook } from "@apis/api";
import { detailParam } from "@apis/apiParam";
import { bookDetail } from "@apis/apiResponse";
import bookIcon from '@assets/images/icon-book.svg';
import Rating from '@mui/material/Rating';
import DetailTab from "@src/components/Common/Tab/DetailTab";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './detail.module.css';

const DetailPage = () => {
  const { id } = useParams();

  const param: detailParam = { bookId: id };
  const [detailData, setDetailData] = useState<bookDetail>({});
  const [tabData, setTabData] = useState([])
  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getBook(param);
          console.log(data)
          setDetailData(data);
          const bookIntro = {
            detailData: data?.detailNum,
            introduce: data?.introduce,
          };
          tabData.push(bookIntro);
          
          setTabData(tabData)
        } catch (error) {}
      };

      fetchData();
  }, []);

  return (
    <div className={styles.detail}>
      <div className={styles.wrapper}>
        <div className={styles.coverWrapper}>
          <img className={styles.cover} src={detailData.img}></img>
        </div>
        <div className={styles.info}>
          <div className={styles.categories}>{detailData.categories}</div>
          <div className={styles.title}>{detailData.title}</div>
          <div className={styles.subtitle}>{detailData.subtitle}</div>
          <div className={styles.subInfo}>
            <span className={styles.subInfoContent}>{detailData.writer}</span>
            <span className={styles.separator}>|</span>
            <span className={styles.subInfoContent}>
              {detailData.publisher}
            </span>
            <span className={styles.separator}>|</span>
            <span className={styles.subInfoContent}>
              {detailData.publishDate}
            </span>
            <span className={styles.separator}>|</span>
            <span className={styles.subInfoContent}>
              {detailData.isEBook ? '전차책' : '종이책'}
            </span>
          </div>
          <div className={styles.ratingWrapper}>
            <div className={styles.star}>
              <Rating
                name="half-rating"
                readOnly
                precision={0.5}
                value={Number(detailData.avgRating)}
                sx={{
                  color: '#F60',
                }}
              />
            </div>
            <div className={styles.rating}>{detailData.avgRating}점</div>
            <div className={styles.ratingCount}>({detailData.avgRating}명)</div>
          </div>
          <div className={styles.shareInfoWrapper}>
            <div className={styles.shareInfo}>책 정보</div>
            <div className={styles.shareInfoContent}>
              <div className={styles.shareInfoRow}>
                <span>구매 권수</span>
                <span>{detailData.count}</span>
              </div>
              <div className={styles.shareInfoRow}>
                <span>공유 권수</span>
                <span>{detailData.shareCount}</span>
              </div>
              <div className={styles.shareInfoRow}>
                <span>대기 권수</span>
                <span>{detailData.shareCount}</span>
              </div>
            </div>
          </div>
          <div className={`${styles.buttonWrapper} ${styles.leftAlign}`}>
            <button className={styles.findCount}>
              <img src={bookIcon}></img>
              책을 찾습니다 ({detailData.findCount})명
            </button>
            <button className={styles.shareButton}>
              {detailData.isShare ? '책 공유하기' : '책 공유하기'}{' '}
            </button>
            <button className={styles.shareButton}>
              {detailData.isFind ? '책 공유받기' : '책 공유받기'}
            </button>
          </div>
        </div>
      </div>
      <DetailTab tabData={tabData}></DetailTab>
    </div>
  );
};
export default DetailPage;
