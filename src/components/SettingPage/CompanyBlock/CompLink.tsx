import { useState, useEffect, useRef } from "react"

import { Box, Button, Stack } from "@mui/material"

import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";
import useApi from "../hooks/useApi";
import useAlert from "../hooks/useAlert";

import API_ENDPOINTS from "../utils/apiEndpoints";
// Icons
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import LaunchIcon from '@mui/icons-material/Launch';

import { IRequestOptions } from "../types/carsSettingsTypes";



const CompLink = () => {

  const { sendRequest } = useApi();
  // const compLink = null
  const inStoreShortLink = useAppSelector((store) => store.carsSettings.company.short_link)
  const companyId = useAppSelector((store) => store.carsSettings.company.company_id)

  const [shortLink, setShortLink] = useState(inStoreShortLink)
  const inputRef = useRef<HTMLInputElement>(null);

  const { showAlert, alertComponent } = useAlert();

  const dispatch = useAppDispatch()

  const handleCreateLink = () => {
    createShortLink()
  }


  const handleUpdateLink = () => {
    updateShortLink()
  }

  const handleCopyLink = async () => {
    const input = inputRef.current;
    if (input) {
      input.select();
      try {
        await navigator.clipboard.writeText(input.value);
        showAlert('Ссылка скопирована', 'success');
      } catch (err) {
        console.error('Ошибка при копировании: ', err);
        showAlert('Не удалось скопировать ссылку', 'warning');

      }
    }
  }

  const handleRemoveLink = () => {
    deleteLink()
  }

  const handleLaunchLink = () => {
    if (shortLink) {
      window.open(shortLink, '_blank');
    }
  }

  const createShortLink = async () => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
      body: JSON.stringify({
        company_id: companyId
      }),
    };

    const response = await sendRequest(API_ENDPOINTS.CREATE_SHORT_LINK, requestOptions)

    if (response.data.status === 'error') {
      console.warn("Error in create short link", response.error);
      showAlert('Неудалось создать короткую ссылку', 'error');
      dispatch(carsSettingsActions.setRefreshCompanyData())
      // setShortLink('')
      return
    }
    if (response.data.status === 'Ok') {
      const { short_link } = response.data

      // showAlert('Имя компании изменено успешно', 'success');
      dispatch(carsSettingsActions.setShortLink(short_link))
      setShortLink(short_link)
    }
  };

  const updateShortLink = async () => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
      body: JSON.stringify({
        company_id: companyId
      }),
    };

    const response = await sendRequest(API_ENDPOINTS.REFRESH_SHORT_LINK, requestOptions)

    if (response.data.status === 'error') {
      console.warn("Error in refresh short link", response.error);
      showAlert('Не удалось обновить', 'error');
      dispatch(carsSettingsActions.setRefreshCompanyData())
      setShortLink(inStoreShortLink)
      return
    }
    if (response.data.status === 'Ok') {
      const { short_link } = response.data
      showAlert('Короткая ссылка обновлена', 'success');
      setShortLink(short_link)
      dispatch(carsSettingsActions.setShortLink(short_link))
    }
  };

  const deleteLink = async () => {
    const requestOptions: IRequestOptions = {
      method: 'DELETE',
      // body: JSON.stringify({
      //   company_id: companyId
      // }),
    };

    const response = await sendRequest(API_ENDPOINTS.DELETE_SHORT_LINK, requestOptions)

    if (response.data.status === 'error') {
      console.warn("Error in delete short link", response.error);
      showAlert('Ошибка при удалении короткой ссылки', 'error');
      dispatch(carsSettingsActions.setRefreshCompanyData())
      setShortLink(inStoreShortLink)
      return
    }
    if (response.data.status === 'Ok') {
      showAlert('Короткая ссылка удалена', 'success');
      setShortLink('')
      dispatch(carsSettingsActions.setRemoveShortLink())
      return
    }
    dispatch(carsSettingsActions.setRefreshCompanyData())
    setShortLink(inStoreShortLink)
  };

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      // Установка курсора в конец текста
      input.scrollLeft = input.scrollWidth;
      // input.value = shotLink;
      // input.focus();
      // input.blur();
    }
  }, [shortLink]);


  return (
    <>
    <Stack display={'flex'} flexDirection={'column'} >

      <Stack display={'flex'} flexDirection={'row'} gap={'0.5rem'}>

        <Stack>
        <input
            style={{ width: '80%' }}
            ref={inputRef}
              className="company-block--dis-input"
          type="text"
              readOnly
            value={shortLink} />
        </Stack>

        {!shortLink ? (
          <Stack>
            {/* Создать */}
          <Button
              onClick={handleCreateLink}
              sx={{
                minWidth: '10px', width: '2rem',
                "& .MuiButton-startIcon": { margin: "auto" }
              }}
              variant="outlined"
              startIcon={<AutoFixHighIcon sx={{ margin: 'auto' }} />}></Button>
          </Stack>
        ) : (
          <>
            <Stack>
              {/* Удалить */}
              <Button
                onClick={handleRemoveLink}
                  sx={{
                    minWidth: '10px', width: '2rem',
                    "& .MuiButton-startIcon": { margin: "auto" }
                  }}
                  variant="outlined"
                  startIcon={<ClearIcon sx={{ margin: 'auto' }} />}></Button>
              </Stack>

              <Stack>
                {/* Обновить */}
                <Button
                  onClick={handleUpdateLink}
                  sx={{
                    minWidth: '10px', width: '2rem',
                    "& .MuiButton-startIcon": { margin: "auto" }
                  }}
                  variant="outlined"
                  startIcon={<AutorenewIcon sx={{ margin: 'auto' }} />}></Button>
              </Stack>

              <Stack>
                {/* Копировать */}
                <Button
                  onClick={handleCopyLink}
                  sx={{
                    minWidth: '10px', width: '2rem',
                    "& .MuiButton-startIcon": { margin: "auto" }
                  }}
                  variant="outlined"
                  startIcon={<ContentCopyIcon sx={{ margin: 'auto' }} />}></Button>
              </Stack>

              <Stack>
                {/* Перейти */}
                <Button
                  onClick={handleLaunchLink}
                  sx={{
                    minWidth: '10px', width: '2rem',
                    "& .MuiButton-startIcon": { margin: "auto" }
                  }}
                  variant="outlined"
                  startIcon={<LaunchIcon sx={{ margin: 'auto' }} />}></Button>
              </Stack>
          </>
        )}

      </Stack>

      <Stack>
        <Box>Короткая ссылка</Box>
      </Stack>
      </Stack>
      {alertComponent}
    </>

  )
}

export default CompLink

