import { useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import Loader from '../Components/Loader/Loader';

function useBackDrop() {
  const [show, setShow] = useState(false);

  const startBackDrop = () => setShow(true);
  const stopBackDrop = () => setShow(false);

  // Создаем элемент Backdrop, который можно будет рендерить
  const BackDropComponent = show ? (
    // <Backdrop open={show} style={{ zIndex: 9999 }}>
    //   <CircularProgress color="inherit" />
    // </Backdrop>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <Loader />
    </Backdrop>
  ) : null;

  return { startBackDrop, stopBackDrop, BackDropComponent };
}

export default useBackDrop;
