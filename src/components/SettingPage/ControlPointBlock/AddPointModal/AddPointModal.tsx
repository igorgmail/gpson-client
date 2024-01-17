import { useState} from "react"

import { Stack } from "@mui/material"

import { useAppDispatch, carsSettingsActions } from "../../../../store";
import useApi from "../../hooks/useApi";
import useAlert from "../../hooks/useAlert";

import API_ENDPOINTS from "../../utils/apiEndpoints";

// Icons
import useBackDrop from "../../hooks/useBackdrop";
import ModalWrap from "../../components/ModalWrap";
import AddPointForm from "./AddPointForm";
import { IRequestOptions } from "../../types/carsSettingsTypes";

type TPointData = {

  point_name: string,
  address: string | undefined,
  lat: number | null,
  lng: number | null,
  radius: string

}

const AddPointModal = () => {

  const [open, setOpen] = useState(false);
  const { sendRequest } = useApi();

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch()

  const handleFormSubmit = (pointData: TPointData) => {

    startBackDrop()
    setOpen(false)

    fetchAddNewPoint(pointData)
      .then((data) => {
        if (data) {
          stopBackDrop()
          // const extractPointData = DataExtractor.getPointsFromServerData(data)
          dispatch(carsSettingsActions.setNewPoint(data))
          dispatch(carsSettingsActions.setMapCenter(null))
        } else {
          console.info("Не удалось создать точку,");
          console.info("С сервера не пришли данные, или пришли неверные данные");
        }
      })
      .catch((err) => console.log("ERROR При создании точки", err)
      )
      .finally(() => stopBackDrop())
  }


  const fetchAddNewPoint = async (data: TPointData) => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
      // body: JSON.stringify({ ...data }),
    };
    const url = `?point_name=${data.point_name}&address=${data.address}&lat=${data.lat}&lng=${data.lng}&radius=${data.radius}`
    const response = await sendRequest(API_ENDPOINTS.CREATE_POINT + url, requestOptions)

    if (response.data.status === 'error') {
      console.warn("Error in create new Point", response.data?.message);
      showAlert('Не удалось создать Точку', 'error')
      return null
    }
    if (response.data.status === 'Ok') {
      const pointsData = await response.data.point
      return pointsData
    }
  }

  return (
    <>

    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}
      sx={{ width: '80%' }}
    >

      <ModalWrap modalTitle={'Добавление Контрольной точки'} open={open} setOpen={setOpen}>
        {/* <Backdrop open={open}><CircularProgress color="inherit" /></Backdrop> */}
        <AddPointForm handleClose={handleClose} handleFormSubmit={handleFormSubmit} />

      </ModalWrap>

      </Stack >
      {BackDropComponent}
      {alertComponent}
    </>
  );

}
export default AddPointModal