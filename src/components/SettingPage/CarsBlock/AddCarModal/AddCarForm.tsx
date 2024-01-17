import React, { useState, useEffect, FC } from "react"

import {  Stack, Grid, Button} from "@mui/material"

// Icons
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import AddModalWithIcons from "./AddModalWithIcons";

import { useAppSelector } from "../../../../store";
import { ICarObjectThree } from "../../types/carsSettingsTypes";


type TAddCarForm = {
  handleClose: () => void,
  handleFormSubmit: (carData: Omit<ICarObjectThree, 'car_id'>) => void
}


const AddCarForm: FC<TAddCarForm> = ({ handleClose, handleFormSubmit }) => {

  const iconsCars = useAppSelector((store) => store.carsSettings.icons)


  const [nameCar, setNameCar] = useState('')
  const [iconCar, setIconCar] = useState<string>('')
  const [imeiCar, setImeiCar] = useState('')
  const [alterImeiCar, setAlterImeiCar] = useState('')
  const [modalOpen, setModalOpen] = useState(false);

  const [butDisabled, setButDisabled] = useState(true)

  const handleImeiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return
    if (value.length <= 15) {
      setImeiCar(value)
    }
  };

  const handleAlterImeiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return
    if (value.length <= 15) {
      setAlterImeiCar(value)
    }
  };


  const handleIconCarInNetClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLImageElement;
    if (target.dataset.iconid) {
      const chooseIconUrl = iconsCars.find((obj) => obj.icon_id === String(target.dataset.iconid))
      setIconCar(chooseIconUrl?.url || '')
    }
    setModalOpen(false)
  }

  const clearState = () => {
    // Очистка формы
    setNameCar('');
    setIconCar('');
    setImeiCar('');
    setAlterImeiCar('');
  }
  const handleAddCarSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const getShortIconUrl = (url: string) => {
      const result = url.replace(/.*\/(pics\/car\d+\.png)$/, "$1");
      return result
    }

    const carData = {
      car_name: nameCar,
      icon: iconCar,
      // На сервер отправляем короткую ссылку
      // icon: getShortIconUrl(iconCar),
      imei: imeiCar,
      alter_imei: alterImeiCar
    }
    handleFormSubmit(carData)
    // clearState()
  }

  const handleCancelButton = () => {
    clearState()
    handleClose()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, nextFieldId: string) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nextField = document.getElementById(nextFieldId);
      if (nextField) {
        nextField.focus();
      }
    }
  };

  useEffect(() => {
    if (nameCar.length > 2 && iconCar && imeiCar.length === 15) {
      if (alterImeiCar.length === 0 || alterImeiCar.length === 15) {
        setButDisabled(false)
      } else {
        setButDisabled(true)
      }
    } else {
      setButDisabled(true)
    }
  }, [nameCar, iconCar, imeiCar, alterImeiCar])

  return (

    <Stack>
      <form onSubmit={handleAddCarSubmit}>
        <Grid container
          rowSpacing={1}
        >
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="carNameInput">Имя</label>
            </Stack>
          </Grid>
          {/* Name */}
          <Grid item xs={9}>
            <Stack display={'flex'}>

              <input
                onChange={(e) => setNameCar(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, "carImeiInput")}
                id="carNameInput"
                className="modal-input"
                placeholder="минимум 3 символа"
                value={nameCar}
                required
                autoComplete="off"
                type="text"
              />
            </Stack>
          </Grid>

          {/* Иконка авто */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="carIconInput">Иконка</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <AddModalWithIcons
              handleIconCarInNetClick={handleIconCarInNetClick}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            >

              <Stack className="modal-input--car-icon" sx={{ width: '100%' }}>
                {iconCar ? (
                  <img src={iconCar} className='icon-car--in-modal'></img>
                ) : <DirectionsCarIcon id={'carIconInput'} />
                }
              </Stack>
            </AddModalWithIcons>
          </Grid>

          {/* imei Avto */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="carImeiInput">Imei</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => handleImeiChange(e)}
                onKeyDown={(e) => handleKeyDown(e, "carAlterImeiInput")}
                id="carImeiInput"
                // readOnly={true}
                className="modal-input"
                placeholder="15 символов"
                value={imeiCar}
                required
                // type="number"
                type="text" inputMode="numeric" pattern="\d*"
                minLength={15}
                maxLength={15}
                autoComplete="off"
              />
            </Stack>
          </Grid>

          {/* imei-2 Avto */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="carAlterImeiInput">Imei-2</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => handleAlterImeiChange(e)}
                onKeyDown={(e) => handleKeyDown(e, "butSubmit")}

                id="carAlterImeiInput"
                className="modal-input"
                placeholder="15 или 0 символов"
                value={alterImeiCar}
                type="text" inputMode="numeric" pattern="\d*"
                minLength={15}
                maxLength={15}
                autoComplete="off"
              />
            </Stack>
          </Grid>
        </Grid>

        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'2rem'}
          sx={{ marginTop: '1rem' }}
        >
          <Button type="submit" disabled={butDisabled} id={'butSubmit'}>Добавить</Button>
          <Button onClick={handleCancelButton}>Отмена</Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default AddCarForm
