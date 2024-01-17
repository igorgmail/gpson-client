import React, { useState } from "react"

import { Stack } from "@mui/material"


import ModalWrap from "../../components/ModalWrap";

import useBackDrop from "../../hooks/useBackdrop";
import useApi from "../../hooks/useApi";
import { IRequestOptions, TUserRole} from "../../types/carsSettingsTypes";
import API_ENDPOINTS from "../../utils/apiEndpoints";
import { carsSettingsActions, useAppDispatch } from "../../../../store";
import UserModalForm from "./UserModalForm";
import useAlert from "../../hooks/useAlert";


const AddUserModal = () => {

  const [open, setOpen] = useState(false);

  const { sendRequest } = useApi();
  const dispatch = useAppDispatch()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()

  const handleClose = () => setOpen(false);

  const handleFormSubmit = (userData: TUserRole) => {
    startBackDrop()
    setOpen(false)
    // const cardataForServer = DataExtractor.(eventData)
    fetchAddNewUser(userData)

      .then((data) => {
        if (data) {
          stopBackDrop()
          dispatch(carsSettingsActions.setCreateUser(data))
        } else {
          console.info("Не удалось создать Пользователя");
          console.info("С сервера не пришли данные, или пришли неверные данные");
        }
      })
      .catch((err) => console.log("ERROR", err)
      )
      .finally(() => stopBackDrop())
  }

  const fetchAddNewUser = async (data: TUserRole) => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
      // body: JSON.stringify({ ...data }),
    };

    const url = `?user_email=${data.user_email}&user_role=${data.user_role}`

    const response = await sendRequest(API_ENDPOINTS.CREATE_USER + url, requestOptions)

    if (response.data.status === 'error') {
      console.warn("Error in create new User-->", response.data?.message);
      showAlert('Не удалось создать Пользователя', 'error')
      return null
    // throw new Error(response.data?.message);
    }
    if (response.data.status === 'Ok') {
      const userData = await response.data.user
      console.info("▶FROMSERVER ⇛ Создан новый пользователь");


      return userData[0]
    }
  }

  return (
    <>

    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}
      sx={{ width: '80%' }}
      >
        <ModalWrap modalTitle={'Добавление Пользователя'} open={open} setOpen={setOpen}>
          <UserModalForm handleClose={handleClose} handleFormSubmit={handleFormSubmit} />
      </ModalWrap>
      </Stack >
      {BackDropComponent}
      {alertComponent}
    </>
  )
}
export default AddUserModal
