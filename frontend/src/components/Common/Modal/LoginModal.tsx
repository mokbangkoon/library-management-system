import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ open, clickBtn }) {
  const navigateTo = useNavigate();
  return (
    <div>
      <Dialog
        onClose={clickBtn}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">리뷰작성</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            로그인 후 리뷰 작성이 가능합니다. 로그인 페이지로 이동하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigateTo('/login')}>확인</Button>
          <Button onClick={clickBtn} autoFocus>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
