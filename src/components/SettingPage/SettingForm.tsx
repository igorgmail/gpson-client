import { useState, useEffect } from "react"

import { Backdrop, Stack } from "@mui/material"
import CarsBlock from "./CarsBlock/CarsBlock"
import ControlPointBlock from "./ControlPointBlock/ControlPointBlock"
import EventBlock from "./EventBlock/EventBlock"
import CompanyBlock from "./CompanyBlock/CompanyBlock"
import UserBlock from "./UsersBlock/UserBlock"
import { useAppDispatch, carsSettingsActions, useAppSelector } from '../../store';

import Loader from "./components/Loader/Loader"
import PreloadImages from "./components/PreloadImage"

import { IRequestOptions, ISettingsData } from "./types/carsSettingsTypes"
import API_ENDPOINTS from "./utils/apiEndpoints"
import useApi from './hooks/useApi'
import useAlert from "./hooks/useAlert"
import isHasToushScreen from "./utils/isMobile"

import OutsideClickListener from "./OutsideClickListener "
import DataExtractor from "./utils/dataExtractor"
import ForcedUpdate from "./components/ForcedUpdate"

const SettingForm = () => {

  const [settingsData, setSettingsData] = useState<ISettingsData>()
  const [updateForm, setUpdateForm] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const companyId = useAppSelector((store) => store.profileStore.company_page_id)

  const { sendRequest } = useApi()
  const { showAlert, alertComponent } = useAlert()

  const getDataFromServer = async () => {
    const requestOptions: IRequestOptions = {
      method: 'GET',
    };
    const url = API_ENDPOINTS.GET_SETTINGS + `?company_id=${companyId}`
    const response = await sendRequest(url, requestOptions)
    if (response.data?.status === 'error') {
      console.warn("Error in get settings", response.error);
      showAlert('Не удалось получить данные с сервера', 'error');
      return
    }
    if (response.data) {
      const settingsData = DataExtractor.createDataWithPicHref(response.data)
      dispatch(carsSettingsActions.setInitialSettingsData(settingsData))
      setSettingsData(settingsData)
    }
  };

  useEffect(() => {
    getDataFromServer()
  }, [updateForm])

  return (
    settingsData ?
    <Stack display={'flex'} margin={'auto'} mt={'2rem'} mb={'2rem'}
      sx={{ width: { sm: "90%", md: "70%" }, }}
      >
        <OutsideClickListener />
        {process.env.NODE_ENV === 'development' &&
          <>
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
        <small>Your device has a touchscreen <b>{String(isHasToushScreen())}</b></small>
          </>
        }

        <CompanyBlock key={'company'}></CompanyBlock>
        <CarsBlock key={'cars'}></CarsBlock>
        <ControlPointBlock key={'control'}></ControlPointBlock>
        <EventBlock key={'events'}></EventBlock>
        <UserBlock key={'users'} ></UserBlock>
        <PreloadImages key={'preloadImages'} iconsUrls={settingsData.icons} />
        <ForcedUpdate setUpdateForm={setUpdateForm} />

      {alertComponent}
    </Stack>

      :
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <Loader />
      </Backdrop>

  )
}
export default SettingForm
