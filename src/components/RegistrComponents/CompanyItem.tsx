import { FC } from "react"
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material"

import useApi from "./hooks/useApi";
import useAlert from "./hooks/useAlert";
import useBackDrop from "./hooks/useBackdrop";
import API_ENDPOINTS from "./utils/apiEndpoints";
import { IRequestOptions } from "./types/profilePageTypes";

import RemoveDialog from "./Components/RemoveDialog";

import { useAppDispatch } from "../../store";
import { profileStoreActions } from "../../store/slices/profileSlice";

type TEventFromDialog = {
  event: 'REMOVE_COMPANY',
  subjectid: string,
}

type TCompanyItem = {
  company_id: string,
  name: string
}

interface ICompanyProps {
  companyData: TCompanyItem
}

const CompanyItem: FC<ICompanyProps> = ({ companyData }) => {

  const navigate = useNavigate();
  const { sendRequest } = useApi()
  const { showAlert, alertComponent } = useAlert()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop()
  const dispatch = useAppDispatch()


  const removeCompanyFetch = async (id: string) => {
    const requestOptions: IRequestOptions = {
      method: 'DELETE',
    };

    const url = API_ENDPOINTS.DELETE_COMPANY + `?company_id=${id}`
    const response = await sendRequest(url, requestOptions)

    if (response.error) {
      showAlert('Не удалось получить данные с сервера', 'error');
    }
    if (response.data?.status === 'error') {
      console.warn("Error in get delete company", response.data.message);
      showAlert('С сервера пришли неполные данные', 'error');
      return
    }
    if (response.data) {
      console.log("▶ ⇛ response.data:", response.data);

      dispatch(profileStoreActions.removeCompanyFromStore(id))
      // setUserData(response.data)
    }

  }

  const eventData = {
    event: 'REMOVE_COMPANY',
    subjectid: companyData.company_id,
    title: 'Удалить компанию ?',
    msg: companyData.name,
  }

  const removeCallBack = async (event: TEventFromDialog) => {
    startBackDrop()
    await removeCompanyFetch(event.subjectid)
    stopBackDrop()
  }

  const companyPageHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement
    const company_id = target.dataset.companyId
    company_id && dispatch(profileStoreActions.setCompanyPageId(company_id))
    company_id && navigate(`/settings`)
  // navigate('/reset_password');
  }

  return (
    <Stack display={'flex'} flexDirection={'row'} width={'100%'} gap={'1rem'}>

      <RemoveDialog callback={removeCallBack} eventData={eventData}></RemoveDialog>
      <Button
        onClick={(e) => companyPageHandler(e)}
        datatype="comp-name-button"
        data-company-id={companyData.company_id}
        variant="contained" className='company-name--button'
        type='submit'
      // onClick={ }
        sx={{ textTransform: 'none' }}
      >{companyData.name}</Button>
      {alertComponent}
      {BackDropComponent}
    </Stack>
  )
}

export default CompanyItem