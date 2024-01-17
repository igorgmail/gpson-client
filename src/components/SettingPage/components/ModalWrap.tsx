import React, { FC } from "react"

import { Fab, Box, Typography, Modal, Fade, Stack, Divider } from "@mui/material"

// Icons
import AddIcon from '@mui/icons-material/Add';

import Backdrop from '@mui/material/Backdrop';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

type TModalWrap = {
  modalTitle: string,
  children: React.ReactNode,
  open: boolean,
  setOpen: (a: boolean) => void
}
const ModalWrap: FC<TModalWrap> = ({ modalTitle, children, open, setOpen }) => {

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}
      sx={{ width: '80%' }}
    >

      <Fab color="primary" aria-label="add-car" size="small"
        onClick={() => handleOpen()}
        sx={{
          backgroundColor: '#078c75', marginTop: '1rem', zIndex: 100,
          '&:hover': {
            bgcolor: 'rgb(7, 140, 117, 0.5)',
          }
        }}
      >
        <AddIcon />
      </Fab>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...style, width: ['80%', '60%', '50%'] }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {modalTitle}
            </Typography>
            <Divider sx={{ mt: '1rem', mb: '1rem' }} />

            {children}
          </Box>
        </Fade>
      </Modal>
    </Stack >

  );
}

export default ModalWrap;

