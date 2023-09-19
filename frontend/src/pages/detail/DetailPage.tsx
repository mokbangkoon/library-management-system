import {
  getBook,
  getPosts,
  getReviews,
  getShareFindInfo,
  shareBook,
} from '@apis/api';
import { bookDetail } from '@apis/apiResponse';
import activeBookIcon from '@assets/images/activeBookIcon.svg';
import bookIcon from '@assets/images/icon-book.svg';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import { detailParam } from '@src/apis/apiParam';
import DetailTab from '@src/components/Common/Tab/DetailTab';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './detail.module.css';

const DetailPage = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const token = localStorage.getItem('access-token');

  const param: detailParam = { bookId: id };
  const [detailData, setDetailData] = useState<bookDetail>({});
  const [tabData, setTabData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [isNewReview, setIsNewReview] = useState(0);
  const [findBtn, setFindBtn] = useState(detailData.isFind);
  const [shareBtn, setShareBtn] = useState(detailData.isShare);
  const [beSharedBtn, setBeSharedBtn] = useState(detailData.isDoneShared);

  const clickFindBookBtn = async(e) => {
    if (!token) {
      navigateTo('/login');
    } else {
      await shareBook({ bookId: id, bookStatusId: 1 });
      setFindBtn(detailData.isFind ? true : false);
    }
  };
  const clickShareBookBtn = async(e) => {
    if (!token) {
      navigateTo('/login');
    } else {
      await shareBook({ bookId: id, bookStatusId: 3 });
      setShareBtn(detailData.isShare ? true : false);
    }
  };
  const clickGetBookBtn = async(e) => {
    if (!token) {
      navigateTo('/login');
    } else {
      await shareBook({ bookId: id, bookStatusId: 0 });
      setBeSharedBtn(detailData.isDoneShared ? true : false);
    }
  };
  const fetchNewReviews = async () => {
    try {
      const newReviewData = await getReviews({ bookId: id, page: 1, size: 10 });
      return newReviewData;
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailData, shareFindData, reviewData, reportData, studyData] =
          await Promise.all([
            getBook(param),
            getShareFindInfo(param),
            getReviews({ bookId: id, page: 1, size: 10 }),
            getPosts({ bookId: id, postType: 1, page: 1, size: 10 }),
            getPosts({ bookId: id, postType: 2, page: 1, size: 10 }),
          ]);
        setDetailData({...detailData, ...shareFindData });

        console.log(shareFindData);
        const bookIntro = {
          detailNum: detailData?.detailNum,
          introduce: detailData?.introduce,
        };
        const result = [bookIntro].concat(studyData, reportData, reviewData);
        if (isNewReview) result[3] = await fetchNewReviews();
        setTabData(result);
      } catch (error) {}
    };
    fetchData();
  }, [isNewReview, findBtn, shareBtn, beSharedBtn]);

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
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </div>
            <div className={styles.rating}>{detailData.avgRating}점</div>
            <div className={styles.ratingCount}>
              ({detailData.reviewCount}명)
            </div>
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
                <span>대기 인원</span>
                <span>{detailData.shareCount}</span>
              </div>
            </div>
          </div>
          <div className={`${styles.buttonWrapper} ${styles.leftAlign}`}>
            {token == null ? (
              <button className={styles.findCount} onClick={clickFindBookBtn}>
                <img
                  src={token && detailData.isFind ? activeBookIcon : bookIcon}
                ></img>
                책을 찾습니다 ({detailData.findCount})명
              </button>
            ) : (
              <button
                className={
                  detailData.isFind ? styles.activeFind : styles.findCount
                }
                onClick={clickFindBookBtn}
              >
                <img
                  src={token && detailData.isFind ? activeBookIcon : bookIcon}
                ></img>
                책을 찾습니다 ({detailData.findCount})명
              </button>
            )}
            {token == null ? (
              <button
                className={styles.shareButton}
                onClick={clickShareBookBtn}
              >
                책 공유하기
              </button>
            ) : (
              <button
                className={
                  detailData.isShare
                    ? styles.activeShare
                    : detailData.shareCount == detailData.count
                    ? styles.notActiveShare
                    : styles.shareButton
                }
                onClick={clickShareBookBtn}
              >
                {!detailData.isShare ? '책 공유하기' : '책 공유 취소하기'}
              </button>
            )}
            {token == null ? (
              <button className={styles.shareButton} onClick={clickGetBookBtn}>
                책 공유받기
              </button>
            ) : (
              <button
                className={
                  detailData.isBeShared
                    ? styles.shareButton
                    : styles.notActiveBeShare
                }
                onClick={clickGetBookBtn}
              >
                책 공유받기
              </button>
            )}
          </div>
        </div>
      </div>
      <DetailTab
        tabData={tabData}
        token={token}
        param={id}
        tabValue={tabValue}
        setTabValue={setTabValue}
        setIsNewReview={setIsNewReview}
      ></DetailTab>
    </div>
  );
};
export default DetailPage;
