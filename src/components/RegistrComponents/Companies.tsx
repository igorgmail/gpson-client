import { useEffect } from "react";
import { Box, Stack, Backdrop } from "@mui/material";

// Хуки, утилиты, типы
import useApi from "./hooks/useApi";
import useAlert from "./hooks/useAlert";
import useBackDrop from "./hooks/useBackdrop";
import API_ENDPOINTS from "./utils/apiEndpoints";
import { IRequestOptions } from "./types/profilePageTypes";
import { useAppDispatch, useAppSelector } from "../../store";

// Компоненты
import Loader from "./Components/Loader/Loader";
import GpsonImage from "./Components/GpsonImage";
import CompanyItem from "./CompanyItem";
import AddCompanyModal from "./AddCompanyModal";

// Действия и редьюсеры Redux
import { profileStoreActions } from "../../store/slices/profileSlice";

const Companies = () => {

  const companyStoreData = useAppSelector((store) => store.profileStore.companies)
  const dispatch = useAppDispatch()

  const { sendRequest } = useApi()
  const { showAlert, alertComponent } = useAlert()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop()

  const addCompanyFetch = async (compName: string) => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
    };

    const url = API_ENDPOINTS.CREATE_COMPANY + `?company_name=${compName}`
    const response = await sendRequest(url, requestOptions)

    if (response.error) {
      showAlert('Не удалось получить данные с сервера', 'error');
    }
    if (response.data?.status === 'error') {
      console.warn("Error in add new company", response.error);
      showAlert('С сервера пришли неполные данные', 'error');
      return
    }
    if (response.data) {

      const { companies } = response.data;// companies - array
      const { id, name } = companies[0]

      dispatch(profileStoreActions.addNewCompany({ company_id: id, name }))
      // setUserData(response.data)
    }
  }

  const addCompanyHandler = async (compName: string) => {
    startBackDrop()
    await addCompanyFetch(compName)
    stopBackDrop()
  }


  const getDataFromServer = async () => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
    };
    const response = await sendRequest(API_ENDPOINTS.GET_USER_DATA, requestOptions)

    if (response.error) {
      showAlert('Не удалось получить данные с сервера', 'error');
    }
    if (response.data?.status === 'error') {
      console.warn("Error in get user data", response.error);
      showAlert('С сервера пришли неполные данные', 'error');
      return
    }
    if (response.data) {
      dispatch(profileStoreActions.setUserDataFromServer(response.data))
    }
  };

  useEffect(() => {
    getDataFromServer()
  }, [])

  return (
    <>

      {companyStoreData ?
        <Box position="relative" flexDirection="row" height="100%" width="100%"
          display="flex"
          justifyContent={'center'}
          alignItems={'center'}
          marginTop={'2rem'}
          marginBottom={'4rem'}
        >

          <Stack
            sx={{
              width: ['80%', '50%', '40%', '30%']
            }}
            display={'flex'} flexDirection={'column'} gap={'6px'}>

            <GpsonImage key={'su-gp-img-key'}></GpsonImage>

            <Stack display={'flex'} flexDirection={'column'} gap={'1rem'} justifyContent={'stretch'}>

              {companyStoreData && companyStoreData.map((el) => (
                <CompanyItem companyData={el} key={'cname-' + el.company_id} />
              ))}

              <AddCompanyModal addCompanyHandler={addCompanyHandler}></AddCompanyModal>

            </Stack>


          </Stack>
        </Box>
        :
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <Loader />
        </Backdrop>
      }
      {alertComponent}
      {BackDropComponent}
    </>
  )
}

export default Companies