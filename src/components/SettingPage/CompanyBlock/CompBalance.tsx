import { useState } from "react"

import { Box, Button, Stack } from "@mui/material"

import useApi from "../hooks/useApi";
import useAlert from "../hooks/useAlert";

import API_ENDPOINTS from "../utils/apiEndpoints";

import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";
import { IRequestOptions } from "../types/carsSettingsTypes";



const CompBalance = () => {

  const companyBalance = useAppSelector((store) => store.carsSettings.company.balance);
  const currencyStore = useAppSelector((store) => store.carsSettings.company.currency);

  const [compBalance, setCompBalance] = useState(companyBalance)
  const [currency, setCurrency] = useState(currencyStore)
  const { sendRequest } = useApi();
  const { showAlert, alertComponent } = useAlert();

  const dispatch = useAppDispatch()

  const handleUpdateBalance = async () => {

    const requestOptions: IRequestOptions = {
      method: 'GET',
    };

    const response = await sendRequest(API_ENDPOINTS.REFRESH_BALANCE, requestOptions)

    if (response.data.status === 'error') {
      console.warn("Error in refresh balance", response.error);
      showAlert(response.data.message, 'error');
      return
    }
    if (response.data.status === 'Ok') {
      const { balance } = response.data
      showAlert('Баланс компании обновлен', 'success');
      setCompBalance(balance)
      setCurrency(response.data.currency)
      dispatch(carsSettingsActions.setBalance(balance))
      return
    }
    showAlert(response.data.message, 'error');

  }

  return (
    <>
    <Stack display={'flex'} flexDirection={'column'}>

      <Stack display={'flex'} flexDirection={'row'} gap={'0.5rem'}>
        <input
          className="company-block--dis-input"
          style={{
            width: `calc(${compBalance.length}ch + 20px)`
          }}
          type="text"
            readOnly
            value={compBalance}>
        </input>
        <Stack display={'flex'} flexDirection={'row'} alignItems={'center'}>
            {currency}
        </Stack>
        <Stack>
          <Button
            onClick={() => handleUpdateBalance()}
            sx={{
              minWidth: '10px', width: '2rem',
              "& .MuiButton-startIcon": { margin: "auto" }
            }}
            variant="outlined"
            startIcon={<AutorenewIcon sx={{ margin: 'auto' }} />}></Button>
        </Stack>
      </Stack>

      <Stack>
        <Box>Баланс</Box>
      </Stack>
      </Stack>
      {alertComponent}
    </>
  )
}

export default CompBalance