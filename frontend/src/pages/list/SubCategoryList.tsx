import { useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { useParams, useNavigate } from 'react-router';
import { auto } from '@popperjs/core';
import Box from '@mui/material/Box';

const SubCategoryList = ({
  subCategoryList,
  totalCount,
  onClickSubCategory,
}) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setValue(0);
  }, [params.id]);
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const clickSubCategory = (name) => {
    navigate(`/category/${params.id}?page=1&subCategory=${name}`);
  };
  const clickTotalCategory = () => {
    navigate(`/category/${params.id}?page=1&subCategory=${'전체보기'}`);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="#fff"
        sx={{
          borderBottom: '2px solid #E9ECEF',
          '& .MuiTab-root': {
            marginBottom: '0.285rem',
            fontSize: '1.715rem',
            fontFamily: 'Pretendard-Bold',
            color: '#868E96',
          },
          '& .Mui-selected': {
            fontWeight: 'bold',
            color: '#212529',
          },
        }}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab
          onClick={clickTotalCategory}
          label={`전체보기 (${totalCount})`}
        ></Tab>
        {subCategoryList ? (
          subCategoryList.map((el, idx) => (
            <Tab
              onClick={() => clickSubCategory(el.name)}
              key={idx}
              label={`${el.name} (${el.count})`}
            ></Tab>
          ))
        ) : (
          <div>카테고리가 없습니다</div>
        )}
      </Tabs>
    </Box>
  );
};
export default SubCategoryList;
