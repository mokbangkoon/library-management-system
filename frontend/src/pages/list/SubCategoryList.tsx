import { useEffect, useState, useRef } from 'react';
import { Tabs, Tab } from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router';
import { auto } from '@popperjs/core';
import Box from '@mui/material/Box';

const SubCategoryList = ({
  subCategoryList,
  totalCount,
  onClickSubCategory,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setValue(0);
  }, [params.id]);

  useEffect(() => {
    if (location.search) {
      const urlParams = new URLSearchParams(location.search);
      const subCategory = urlParams.get('subCategory');
      subCategoryList.forEach((el, idx) => {
        if (subCategory === el.name) {
          setValue(idx + 1);
        }
      });
    }
  }, [subCategoryList]);
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
    <Box sx={{ maxWidth: '100%' }}>
      {subCategoryList ? (
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
          scrollButtons
          allowScrollButtonsMobile
        >
          {subCategoryList.map((el, idx) =>
            idx === 0
              ? [
                  <Tab
                    onClick={clickTotalCategory}
                    label={`전체보기 (${totalCount})`}
                  ></Tab>,
                  <Tab
                    onClick={() => clickSubCategory(el.name)}
                    key={idx}
                    label={`${el.name} (${el.count})`}
                  ></Tab>,
                ]
              : [
                  <Tab
                    onClick={() => clickSubCategory(el.name)}
                    key={idx}
                    label={`${el.name} (${el.count})`}
                  ></Tab>,
                ],
          )}
        </Tabs>
      ) : null}
    </Box>
  );
};
export default SubCategoryList;
