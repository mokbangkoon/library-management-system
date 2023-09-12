import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import moment from 'moment';
import * as React from 'react';
import styles from './detailTab.module.css';

const renderReviews = (reviews) => {
  if (reviews.length === 0) return <div>등록된 리뷰가 없습니다.</div>;
  return reviews.map((review, idx) => (
    <div key={idx}>
      <h2>{review.name}</h2>
      <p>{review.content}</p>
      <Rating
        name="half-rating"
        readOnly
        precision={0.5}
        value={Number(review.rating)}
        sx={{
          color: '#F60',
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <span>{moment(review.createDateTime).format('YYYY.MM.DD')}</span>
    </div>
  ));
};

const renderPosts = (posts, index) => {
  if (posts.length === 0)
    return <div>등록된 {index === 2 ? '감상평' : '스터디'}가 없습니다.</div>;

  return posts.map((post, idx) => (
    <div key={idx} className={styles.post}>
      <h3>{post.title}</h3>
      <h4>{post.name}</h4>
      <p>{post.content}</p>
      {post.tags && (
        <p>
          {post.tags.split(',').map((tag, idx) => (
            <span key={idx} className={styles.tag}>
              {tag}
            </span>
          ))}
        </p>
      )}
      <span>{moment(post.createDateTime).format('YYYY.MM.DD')}</span>
    </div>
  ));
};

function DetailTab({ tabData }) {
  const [intro, study, report, review] = tabData;
  const [value, setValue] = React.useState('책 소개');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getTabStyle = () => ({
    fontSize: '24px',
    height: '66px',
    border: '2px solid var(--gray-gray-100, #F1F3F5)',
    '&.Mui-selected': {
      color: '#ffffff',
      borderColor: '#000000',
      backgroundColor: '#000000',
    },
  });

  
  const tabItems = [
    { value: '책 소개', label: '책 소개', dataKey: 0 },
    {
      value: '스터디',
      label: `스터디 (${study?.posts?.length || 0})`,
      dataKey: 1,
    },
    {
      value: '감상평',
      label: `감상평 (${report?.posts?.length || 0})`,
      dataKey: 2,
    },
    {
      value: '리뷰',
      label: `리뷰 (${review?.reviews?.length || 0})`,
      dataKey: 3,
    },
  ];
  
  return (
    <Box>
      <Tabs
        className={styles.detailTab}
        value={value}
        onChange={handleChange}
        textColor="inherit"
        TabIndicatorProps={{
          sx: {
            backgroundColor: '#000000',
            color: '#ffffff',
          },
        }}
        sx={{ minHeight: '66px', height: '66px' }}
      >
        {tabItems.map((item) => (
          <Tab
            key={item.value}
            value={item.value}
            label={item.label}
            sx={getTabStyle()}
          />
        ))}
      </Tabs>
      {value === '책 소개' && (
        <Box sx={{ padding: '44px 0 0 0' }}>
          <h2 className={styles.title}>책 소개</h2>
          <p className={styles.introduce}>
            {intro?.introduce
              ? `${intro.introduce}`
              : '해당 책은 책 소개가 없습니다. 책에 대해 상세한 정보를 얻으려면 아래 링크를 확인하세요.'}
          </p>
          <li>
            <span className={styles.linkTitle}>
              교보문구에서 책 상세 내역 확인하기
            </span>
            <a
              className={styles.bookLink}
              href={`https://product.kyobobook.co.kr/detail/${intro?.detailNum}`}
              target="_blank"
              rel="noreferrer"
            >
              책 보러가기
            </a>
          </li>
        </Box>
      )}

      {value === '스터디' && (
        <Box sx={{ padding: '44px 0 0 0', display: 'flex' }}>
          {renderPosts(study?.posts, 2)}
        </Box>
      )}

      {value === '감상평' && (
        <Box sx={{ padding: '44px 0 0 0', display: 'flex' }}>
          {renderPosts(report?.posts, 3)}
        </Box>
      )}

      {value === '리뷰' && (
        <Box sx={{ padding: '44px 0 0 0' }}>
          {renderReviews(review?.reviews)}
        </Box>
      )}
    </Box>
  );
}
export default DetailTab;
