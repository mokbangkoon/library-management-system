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
import CloseIcon from '@mui/icons-material/Close';

const CategoryModal = ({ categoryTitle, selectedCategory, onClose }) => {
  const params = useParams();
  useEffect(() => {
    setSelectedValue(selectedCategory);
  }, []);
  const [selectedValue, setSelectedValue] = useState(selectedCategory);
  const handleListItemClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.innerText.split(' ')[0]);
    onClose(event.target.innerText.split(' ')[0]);
  };

  return (
    <div className="absolute top-3 left-48 rounded-xl border-[#212529] border border-solid w-96 h-96 pl-4 pt-5 pr-3 pb-4 z-[9999] bg-white">
      <div className="flex justify-between pl-1">
        <div className="font-B text-xl mb-4">카테고리를 설정해 주세요.</div>
        <CloseIcon
          onClick={() => onClose('외부클릭', 'clickOutside')}
          className="font-B text-xl cursor-pointer"
        />
      </div>
      <div className="pl-1 overflow-y-auto h-[19rem] font-R text-xl scroll-p-5 bg-white">
        {categoryTitle
          ? categoryTitle.map((title, idx) => {
              return (
                <div
                  className="mb-3 cursor-pointer"
                  onClick={(event) => handleListItemClick(event)}
                >
                  {title.name} ({title.count})
                </div>
              );
            })
          : null}
      </div>
    </div>
    // <Dialog
    //   open={true}
    //   onClose={(event, reason) => {
    //     if (reason === 'backdropClick') {
    //       categoryTitle.forEach((el, idx) => {
    //         if (idx + 1 === Number(params.id)) onClose(el.name, 'clickOutside');
    //       });
    //     }
    //   }}
    //   sx={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
    // >
    //   <DialogTitle
    //     sx={{
    //       color: '#868E96',
    //       fontFamily: 'Pretendard-Bold',
    //       paddingBottom: '28px',
    //       overflowX: 'hidden',
    //     }}
    //   >
    //     카테고리
    //   </DialogTitle>
    //   <FormControl>
    //     <RadioGroup
    //       aria-labelledby="demo-radio-buttons-group-label"
    //       sx={{
    //         width: '30rem',
    //         maxHeight: '33rem',
    //         display: 'flex',
    //         flexWrap: 'nowrap',
    //         marginLeft: '1.715rem',
    //         color: '#868E96',
    //         fontFamily: 'Pretendard-Regular',
    //       }}
    //       name="radio-buttons-group"
    //       onChange={(event) => handleListItemClick(event)}
    //       defaultValue={selectedValue}
    //     >
    //       {categoryTitle
    //         ? categoryTitle.map((title, idx) => (
    //             <FormControlLabel
    //               sx={{
    //                 marginBottom: '16px',
    //               }}
    //               key={idx}
    //               value={title.name}
    //               control={<BpRadio />}
    //               label={`${title.name} (${title.count})`}
    //             />
    //           ))
    //         : null}
    //     </RadioGroup>
    //   </FormControl>
    // </Dialog>
  );
};
export default CategoryModal;
