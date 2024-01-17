import { Divider, Grid, Stack } from "@mui/material"
import { ICarObject, TEventForDialog, TEventFromDialog, TSelectedFieldChanged } from "../types/carsSettingsTypes";
import { FC, useEffect, useState } from "react";

import RemoveDialog from "../components/RemoveDialog";
import ModalWithIconsCars from "./CarsIconMenu/AddModalWithIconsCars";

import { useAppDispatch, useAppSelector, carsSettingsActions, store } from "../../../store";

import useRemoveDialog from "../hooks/useRemoveDialog";
import useBackDrop from "../hooks/useBackdrop";
import useAlert from "../hooks/useAlert";
import useHandleInput from "../hooks/useHandleInputEvents";
import useStartUpdate from "../hooks/useStartUpdate";

interface ILgFieldCarsProps {
  car: ICarObject,
}


const LgFieldCars: FC<ILgFieldCarsProps> = ({ car }) => {

  const iconsCars = useAppSelector((store) => store.carsSettings.icons)
  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const [inputCarNameValue, setInputCarNameValue] = useState(car.name);
  const [inputCarImeiValue, setInputCarImeiValue] = useState(car.imei);
  const [inputCarAlterImeiValue, setInputCarAlterImeiValue] = useState(car.alter_imei);
  const [inputCarIconIdValue, setInputCarIconIdValue] = useState<string>(car.pic);
  const [modalOpen, setModalOpen] = useState(false);

  const { startUpdate } = useStartUpdate()
  const { handleInputClickLG, handleKeyDownLG } = useHandleInput()

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()
  const { sendRemove } = useRemoveDialog()
  const dispatch = useAppDispatch()

  const handleDialog = (eventData: TEventFromDialog) => {
    startBackDrop()
    sendRemove(eventData)
      .then((data) => {
        if (data?.data) {
          const id = data.data
          dispatch(carsSettingsActions.setRemoveCar(id))
          stopBackDrop()
        } else {
          console.info("При удалении Авто с сервера пришли некорректные данные");
          showAlert('Не удалось удалить точку', 'error')
        }
      }).catch((err) => {
        console.warn("ERROR, Ошибка при удалении Авто", err);
      }).finally(() => stopBackDrop())
  }

  const handleIconCarInNetClick = (e: React.MouseEvent) => {
    handleFieldChange(e)
    setModalOpen(false)
  }

  const makeEventData = (car: ICarObject) => {
    const eventData: TEventForDialog = {
      event: 'REMOVE_CAR',
      subjectid: car.car_id,
      msg: `Будет удален Автомобиль <br>${car.name}`
    }

    return eventData
  }

  const CAR_KEY = {
    name: `id${car.car_id}-carName`,
    imei: `id${car.car_id}-carImei`,
    altImei: `id${car.car_id}-altCarImei`,
    pic: `id${car.car_id}-carPic`,
    parentPic: `id${car.car_id}-parentIcon`
  }

  const carObject: TSelectedFieldChanged = {
    typeField: 'cars',
    selectBlockObject: {
      car_id: String(car.car_id),
      name: inputCarNameValue,
      pic: inputCarIconIdValue,
      imei: inputCarImeiValue,
      alter_imei: inputCarAlterImeiValue
    }
  }
  const handleFieldChange = (event: React.SyntheticEvent) => {

    if (event.target instanceof HTMLInputElement) {

      const itemName = (event.target as HTMLInputElement).getAttribute('name')
      if (itemName === 'car_name') {
        setInputCarNameValue(event.target.value)
        dispatch(carsSettingsActions.setCurrentSelectBlock({ ...carObject, selectBlockObject: { ...carObject.selectBlockObject, name: event.target.value } }))
      }
      if (itemName === 'car_imei') {
        if (!/^\d*$/.test(event.target.value)) return
        if (event.target.value.length <= 15) {
          setInputCarImeiValue(event.target.value)
          dispatch(carsSettingsActions.setCurrentSelectBlock({ ...carObject, selectBlockObject: { ...carObject.selectBlockObject, imei: event.target.value } }))
        }
      }
      if (itemName === 'car_alterimei') {
        if (!/^\d*$/.test(event.target.value)) return
        if (event.target.value.length <= 15) {
          setInputCarAlterImeiValue(event.target.value)
          dispatch(carsSettingsActions.setCurrentSelectBlock({ ...carObject, selectBlockObject: { ...carObject.selectBlockObject, alter_imei: event.target.value } }))
        }
      }
    }

    if (event.currentTarget.hasAttribute('data-iconid')) {
      const target = event.currentTarget as HTMLElement;
      const chooseIconUrl = iconsCars.find((obj) => obj.icon_id === String(target.dataset.iconid))
      setInputCarIconIdValue(chooseIconUrl?.url || '')
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...carObject, selectBlockObject: { ...carObject.selectBlockObject, pic: chooseIconUrl?.url || '' } }))
      startUpdate()
    }

  }

  useEffect(() => {
    setInputCarNameValue(car.name)
    setInputCarImeiValue(car.imei)
    setInputCarAlterImeiValue(car.alter_imei)
    setInputCarIconIdValue(car.pic)

  }, [car])

  return (
    <>
    <Grid container
      sx={{
        backgroundColor: 'white',
        paddingLeft: '.8rem'
      }}
      data-carid={car.car_id}
        // data-interactive
    >

      {/* Name */}
      <Grid item xs={3} md={3} display={'flex'} justifyContent={'flex-start'}>
        <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

          <RemoveDialog callback={handleDialog} eventData={makeEventData(car)} />

          <input
              name={'car_name'}

              onClick={handleInputClickLG}
              onChange={(e) => handleFieldChange(e)}
              onKeyDown={handleKeyDownLG} // Enter

            onMouseDown={() => { }}
            className={chooseInputFromStore === CAR_KEY.name ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `100%`,
              // width: `calc(${car.name.length}ch + 22px)`,
            }}
            readOnly={chooseInputFromStore !== CAR_KEY.name}
              // onChange={(e) => setInputCarNameValue(e.target.value)}
            value={inputCarNameValue}
            data-forstore={CAR_KEY.name}
            data-interactive
              autoComplete="off"
          />
        </Stack>
      </Grid>

      {/* Icon */}
      <Grid item xs={2} md={3} display={'flex'} justifyContent={'center'}>
        <Stack margin={'auto'} display={'flex'} alignItems={'center'}
        >
          {/* Popup Cars Icons */}
          <ModalWithIconsCars
            handleIconCarInNetClick={handleIconCarInNetClick}
            iconParentId={car.car_id}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          >
            <img
              src={inputCarIconIdValue}
              className="carblock-icon-cars"
              style={{
                transform: 'rotate(90deg)', width: '2rem',
                position: 'relative'
              }}
              alt="Иконка"
              data-forstore={CAR_KEY.parentPic}
              data-interactive
              data-interactive-image
            >
            </img>
          </ModalWithIconsCars>

        </Stack>
      </Grid>

      {/* Imei */}
      <Grid item xs={3} md={3} display={'flex'} alignItems={'center'}>
        <Stack>
          <input
              name={'car_imei'}

              onClick={handleInputClickLG}
              onChange={(e) => handleFieldChange(e)}
              onKeyDown={handleKeyDownLG} // Enter

            className={chooseInputFromStore === CAR_KEY.imei ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: '100%',
              // width: `calc(${car.imei.length}ch + 22px)`, fontSize: '0.8rem'
            }}
              // type="number"
              type="text" inputMode="numeric" pattern="\d*"
            readOnly={chooseInputFromStore !== CAR_KEY.imei}
            value={inputCarImeiValue}
            data-forstore={CAR_KEY.imei}
            data-interactive
              autoComplete="off"
          />
        </Stack>
      </Grid>

      {/* Imei-2 */}
      <Grid item xs={4} md={3} display={'flex'} alignItems={'center'}>
        <Stack >
          <input
              name={'car_alterimei'}

              onClick={handleInputClickLG}
              onChange={(e) => handleFieldChange(e)}
              onKeyDown={handleKeyDownLG} // Enter

            className={chooseInputFromStore === CAR_KEY.altImei ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: '100%',
              // width: `calc(${car.alter_imei?.length || 0}ch + 22px)`, fontSize: '0.8rem'
            }}
              // type="number"
              type="text" inputMode="numeric" pattern="\d*"
            readOnly={chooseInputFromStore !== CAR_KEY.altImei}
            value={inputCarAlterImeiValue || ''}
            data-forstore={CAR_KEY.altImei}
            data-interactive
              autoComplete="off"
          />
        </Stack>
      </Grid>
      <Divider />
    </Grid>
      {BackDropComponent}
      {alertComponent}
    </>
  )
}


export default LgFieldCars