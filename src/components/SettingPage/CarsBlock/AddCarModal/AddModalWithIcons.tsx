import React, { FC, ReactNode } from 'react';

import { Button, Modal, Grid } from '@mui/material/';
import IconsCarsBlockNet from '../CarsIconMenu/IconsCarsBlockNet';

import { useAppSelector } from '../../../../store';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
};

type TAddModalWithIconsProps = {
  handleIconCarInNetClick: (e: React.MouseEvent) => void,
  modalOpen: boolean,
  children?: ReactNode,
  setModalOpen: (a: boolean) => void
}

const AddModalWithIcons: FC<TAddModalWithIconsProps> = ({ children, handleIconCarInNetClick, modalOpen, setModalOpen }) => {

  const carsIconsArray = useAppSelector((store) => store.carsSettings.icons)

  const handleOpen = (e: React.SyntheticEvent) => {
    setModalOpen(true)
  };

  const handleClose = () => {
    setModalOpen(false)
  };

  return (
    <>
      <Button
        onClick={(e: React.SyntheticEvent) => handleOpen(e)}
        sx={{ width: '100%', padding: '0' }}
        className='buttom-copy'
      >
        {children}
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: '1800' }}
      >
        <Grid container sx={{ ...style, width: { xs: '80%', sm: '40%', md: '30%' } }} className='cars-popup--wrap'>
          {carsIconsArray && carsIconsArray.map((icon) => (
            <IconsCarsBlockNet
              iconObject={icon}
              handleIconCarInNetClick={handleIconCarInNetClick}
              key={icon.icon_id}
            />
          ))}
        </Grid>

      </Modal>
    </>
  );
}

export default AddModalWithIcons

