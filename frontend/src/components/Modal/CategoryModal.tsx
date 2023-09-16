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
      <DialogTitle>카테고리</DialogTitle>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(event) => handleListItemClick(event)}
          defaultValue={selectedValue}
        >
          {categoryTitle
            ? categoryTitle.map((title) => (
                <FormControlLabel
                  value={title.name}
                  control={<Radio />}
                  label={title.name}
                />
              ))
            : null}
        </RadioGroup>
      </FormControl>
    </Dialog>
  );
};
export default BookListPage;
