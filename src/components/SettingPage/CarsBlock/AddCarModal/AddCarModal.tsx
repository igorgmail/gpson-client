import { useState } from "react"

import { Stack } from "@mui/material"

import ModalWrap from "../../components/ModalWrap";
import AddCarForm from "./AddCarForm";

import { ICarObjectThree, IRequestOptions } from "../../types/carsSettingsTypes";
import { carsSettingsActions, useAppDispatch } from "../../../../store";

import useBackDrop from "../../hooks/useBackdrop";
import useApi from "../../hooks/useApi";
import useAlert from '../../hooks/useAlert'

import API_ENDPOINTS from "../../utils/apiEndpoints";
import DataExtractor from "../../utils/dataExtractor";

const AddCarModal = () => {

  const [open, setOpen] = useState(false);
  const { sendRequest } = useApi();
  const dispatch = useAppDispatch()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()

  const handleClose = () => setOpen(false);

  const handleFormSubmit = (carData: Omit<ICarObjectThree, 'car_id'>) => {
    startBackDrop()
    setOpen(false)
    // const cardataForServer = DataExtractor.createCarDataForServer(carData)
    fetchAddNewCar(carData)
      .then((data) => {
        if (data) {
          stopBackDrop()
          const newIconPath = DataExtractor.createiconPath(data.pic)
          dispatch(carsSettingsActions.setCreateCar({ ...data, pic: newIconPath }))
        } else {
          console.info("Не удалось создать Авто,");
          console.info("С сервера не пришли данные, или пришли неверные данные");
          stopBackDrop()
          showAlert('Не удалось создать Авто', 'error')
        }
      })
      .catch((err) => console.log("ERROR При создании Авто", err)
      )
      .finally(() => stopBackDrop())
  }

  const fetchAddNewCar = async (data: Omit<ICarObjectThree, 'car_id'>) => {
    const requestOptions: IRequestOptions = {
      method: 'GET',
      // body: JSON.stringify({ ...data }),
    };
    const param = `car_name=${data.car_name}&icon=${data.icon}&imei=${data.imei}&alter_imei=${data.alter_imei}`
    const response = await sendRequest(API_ENDPOINTS.CREATE_CAR + `?` + param, requestOptions)

    if (response.data.status === 'error') {
      console.warn("Error in create new car", response.data.message)
      return null
    }
    if (response.data.status === 'Ok') {
      const carData = await response.data.car
      return carData
    }
  }

  return (
    <>
    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}
      sx={{ width: '80%'}}
    >

      <ModalWrap modalTitle={'Добавление Автомобиля'} open={open} setOpen={setOpen}>

        <AddCarForm handleClose={handleClose} handleFormSubmit={handleFormSubmit} />

      </ModalWrap>

      </Stack >
      {BackDropComponent}
      {alertComponent}
    </>

  );
}

export default AddCarModal;