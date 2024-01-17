import React, { FC, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Stack } from '@mui/material';
import Map from './Map';
import { store } from '../../../../store/store';
import { LatLng } from 'leaflet';
import AddressBlock from '../AddPointModal/AddressBlock';
import useGetAddressService from '../hooks/useGetAddressService';
import { useAppSelector, } from '../../../../store';


const style = {
  position: 'absolute' as 'absolute',
  top: '0px',
  left: '0px',
  // transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '95vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

type TMapModalMain = {
  handleSaveModal: (coord: LatLng, addressValue: string | undefined) => void
}

type WithDisplayName<T extends { display_name?: string }> = T;

const MapModalMain: FC<TMapModalMain> = ({ handleSaveModal }) => {

  const [open, setOpen] = React.useState(false);

  const [addressValue, setAddressValue] = useState<string | undefined>('')
  const [addressTextLoad, setAddressTextLoad] = useState(false)

  const { getAddress } = useGetAddressService()
  const isMapMove = useAppSelector((store) => store.carsSettings.config.mapMove)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const extractFullAddress = <T extends { display_name?: string }>(data: WithDisplayName<T>): string | undefined => {
    return data.display_name;
  };


  // Выбрать кнопка на карте
  const handleChooseButton = () => {
    const mapCenterFromState = store.getState().carsSettings.config.mapCenter;

    // Передаем в форму
    if (mapCenterFromState) {
      handleSaveModal(mapCenterFromState, addressValue)
    }
    handleClose()
  }


  useEffect(() => {
    if (open && isMapMove === false) {
      const coordinates = store.getState().carsSettings.config.mapCenter
      getAddress(coordinates)
        .then((data) => extractFullAddress(data))
        .then(data => {
          setAddressValue(data)
          setAddressTextLoad(false)
        })
    }
    if (isMapMove) {
      setAddressValue('')
      setAddressTextLoad(true)
    }
    return () => {
      setAddressValue('')
    }
  }, [isMapMove])





  return (
    <>
      {!addressValue ?
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={<TravelExploreIcon
            sx={{ width: '100%' }}
          />}>
          Выбрать Адрес
        </Button>
        : <input
          onClick={handleOpen}
          id="pointAddressInput"
          className="modal-input"
          type="text"
          value={addressValue}
          required
          readOnly
        />
      }


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Stack display={'flex'} flexDirection={'column'} sx={{ height: '100%' }} gap={0.5}>

            <Stack
              sx={{ width: '100%', height: '2rem' }}
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <AddressBlock address={addressValue} load={addressTextLoad}></AddressBlock>
            </Stack>

            <Stack display={'flex'}
              sx={{ width: '100%', height: '100%' }}
            >
              <Map></Map>
            </Stack>

            <Stack
              sx={{ width: '100%', height: '2rem' }}
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={4}
            >
              <Button variant='outlined' onClick={handleClose}>Отменить</Button>
              <Button variant='outlined' onClick={handleChooseButton}>Выбрать</Button>
            </Stack>

          </Stack>

        </Box>

      </Modal>
    </>
  );
}

export default MapModalMain;