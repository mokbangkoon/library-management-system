import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import styles from './detailTab.module.css';

function DetailTab({tabData}) {
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
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
        <Tab value="책 소개" label="책 소개" sx={getTabStyle()} />
        <Tab value="스터디" label="스터디" sx={getTabStyle()} />
        <Tab value="감상평" label="감상평" sx={getTabStyle()} />
        <Tab value="리뷰" label="리뷰" sx={getTabStyle()} />
      </Tabs>
      {value === '책 소개' && (
        <Box p={3}>
          {/* 책 소개 컨텐츠 */}
          <h2>책 소개</h2>
          <p className={styles.introduce}>
            {tabData.length > 0 ? `${tabData[0].introduce}` : ''}
          </p>
        </Box>
      )}

      {value === '스터디' && (
        <Box p={3}>
          {/* 스터디 컨텐츠 */}
          <h2>스터디</h2>
          <p>여기에 스터디 내용을 작성하세요.</p>
        </Box>
      )}

      {value === '리뷰' && (
        <Box p={3}>
          {/* 리뷰 컨텐츠 */}
          <h2>감상평</h2>
          <p>여기에 감상평 내용을 작성하세요.</p>
        </Box>
      )}

      {value === '감상평' && (
        <Box p={3}>
          {/* 리뷰 컨텐츠 */}
          <h2>감상평</h2>
          <p>여기에 감상평 내용을 작성하세요.</p>
        </Box>
      )}
    </Box>
  );
}
export default DetailTab;
