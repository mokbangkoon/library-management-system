import { useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { useParams } from 'react-router';

const SubCategoryList = ({ subCategoryList }) => {
  const params = useParams();

  useEffect(() => {
    setValue(0);
  }, [params.id]);
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
      >
        {subCategoryList ? (
          subCategoryList.map((el, idx) => (
            <Tab key={idx} label={`${el.name} (${el.count})`}></Tab>
          ))
        ) : (
          <div>카테고리가 없습니다</div>
        )}
      </Tabs>
    </div>
  );
};
export default SubCategoryList;
