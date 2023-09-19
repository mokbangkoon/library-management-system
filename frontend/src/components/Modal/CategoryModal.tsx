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
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router';

const BookListPage = ({ categoryTitle, selectedCategory, onClose }) => {
  const params = useParams();
  useEffect(() => {
    setSelectedValue(selectedCategory);
  }, []);
  const [selectedValue, setSelectedValue] = useState(selectedCategory);
  const handleListItemClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onClose(event.target.value);
  };
  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    '.Mui-focusVisible &': {
      outline: '2px auto white',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background:
        theme.palette.mode === 'dark'
          ? 'rgba(57,75,89,.5)'
          : 'rgba(206,217,224,.5)',
    },
    'input:checked ~ &': {
      boxShadow: 'none',
      background: '#FF6600',
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#FF6600',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#FF6600',
    },
  });
  const BpRadio = (props) => {
    return (
      <Radio
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  };

  return (
    <Dialog
      open={true}
      onClose={(event, reason) => {
        if (reason === 'backdropClick') {
          categoryTitle.forEach((el, idx) => {
            if (idx + 1 === Number(params.id)) onClose(el.name, 'clickOutside');
          });
        }
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DialogTitle
        sx={{
          color: '#868E96',
          fontFamily: 'Pretendard-Bold',
          paddingBottom: '28px',
          overflowX: 'hidden',
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
                    marginBottom: '16px',
                  }}
                  key={idx}
                  value={title.name}
                  control={<BpRadio />}
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
