import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  ListItem,
  ListItemButton,
  Radio,
  RadioGroup,
} from '@mui/material';

const BookListPage = ({ categoryTitle, selectedCategory, onClose }) => {
  useEffect(() => {
    setSelectedValue(selectedCategory);
  }, []);
  const [selectedValue, setSelectedValue] = useState(selectedCategory);
  const handleListItemClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onClose(event.target.value);
  };

  return (
    <Dialog open={true} sx={{ maxHeight: 500 }}>
      <DialogTitle
        sx={{
          color: '#868E96',
          fontFamily: 'Pretendard-Bold',
          paddingBottom: '28px',
        }}
      >
        카테고리
      </DialogTitle>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          sx={{
            width: '30rem',
            maxHeight: '33rem',
            display: 'flex',
            flexWrap: 'nowrap',
            marginLeft: '1.715rem',
            color: '#868E96',
            fontFamily: 'Pretendard-Regular',
          }}
          name="radio-buttons-group"
          onChange={(event) => handleListItemClick(event)}
          defaultValue={selectedValue}
        >
          {categoryTitle
            ? categoryTitle.map((title, idx) => (
                <FormControlLabel
                  sx={{
                    marginBottom: '1.5rem',
                    alignItems: 'center',
                    display: 'flex',
                    '& .MuiRadio-root': {
                      color: '#FFA500',
                      '&.Mui-checked': {
                        color: '#FFFFFF',
                      },
                    },
                  }}
                  key={idx}
                  value={title.name}
                  control={<Radio />}
                  label={`${title.name} (${title.count})`}
                />
              ))
            : null}
        </RadioGroup>
      </FormControl>
    </Dialog>
  );
};
export default BookListPage;
