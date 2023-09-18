import { postReview } from '@apis/api';
import LoginModal from '@components/Common/Modal/LoginModal';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import styles from './reviewInput.module.css';

const labels: { [index: string]: string } = {
  0:'이 책을 평가해주세요!',
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function ReviewInput({ token, bookId, setTabValue, setIsNewReview }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [content, setTextInput] = useState('');
  const [rating, setRating] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  const handleTextInput = (event) => {
    setTextInput(event.target.value);
  };
  const openModal = () => {
    if (!token) {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const createReview = async () => {
    await postReview({ bookId, content, rating });
    setTabValue(3);
    setIsNewReview(1);
  };

  return (
    <div className={styles.wrapper}>
      <FormGroup row onClick={openModal}>
        <div className={styles.reviewContainer}>
          {rating !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
          )} 
          <Rating
            name="hover-feedback"
            value={rating}
            precision={0.5}
            getLabelText={getLabelText}
            size="large"
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            icon={
              <StarIcon
                style={{ width: '4rem', height: '4rem', color: '#F60' }}
              ></StarIcon>
            }
            emptyIcon={
              <StarIcon
                style={{ opacity: 0.55, width: '4rem', height: '4rem' }}
                fontSize="inherit"
              />
            }
          />
        </div>
        <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue={token == null ? '로그인 후 리뷰를 작성해주세요' : ''}
          variant="outlined"
          sx={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            width: '1100px',
            cursor: 'none',
          }}
          onChange={handleTextInput}
        />
        <Button
          variant="contained"
          disableElevation
          sx={{
            color: 'white',
            backgroundColor: '#377EEE;',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            textTransform: 'lowercase',
            width: '100px',
          }}
          onClick={createReview}
        >
          리뷰쓰기
        </Button>
      </FormGroup>
      <LoginModal open={isModalOpen} clickBtn={closeModal} />
    </div>
  );
}
export default ReviewInput;