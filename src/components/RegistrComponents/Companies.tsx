import { useEffect, useState } from "react";
import { Box, Button, Divider, Fab, Fade, Modal, Stack, TextField, Typography } from "@mui/material"

import Backdrop from '@mui/material/Backdrop';
import AddIcon from '@mui/icons-material/Add';

import useApi from "./hooks/useApi";
import API_ENDPOINTS from "./utils/apiEndpoints"

import { IRequestOptions } from "./types/profilePageTypes";

import useFormValidation from "./useFormValidation";
import useAlert from "./hooks/useAlert";
import useBackDrop from "./hooks/useBackdrop";
import { useAppDispatch, useAppSelector, store } from "../../store";

import { profileStoreActions } from "../../store/slices/profileSlice";
import Loader from "./Components/Loader/Loader";
import GpsonImage from "./Components/GpsonImage"
import CompanyItem from "./TCompanyItem";

const Companies = () => {
  console.log('--Render Companies');

  type TCompanyItems = {
    company_id: string,
    name: string
  }

  interface ICompany {
    companies: TCompanyItems[]
  }

  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState<null | ICompany>(null)

  const [compName, setCompName] = useState('')
  const [compNameError, setCompNameError] = useState({ error: false, msg: '' })

  const companyStoreData = useAppSelector((store) => store.profileStore.companies)
  console.log("▶ ⇛ companyStoreData:", companyStoreData);

  const dispatch = useAppDispatch()
  const { validate } = useFormValidation()
  const { sendRequest } = useApi()
  const { showAlert, alertComponent } = useAlert()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop()


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  const inputDefaultStyle = {
    backgroundColor: '#078c75',
    color: '#fff',
    fontSize: '1rem',
    width: '100%'
  }

  const inputError = {
    boxShadow: 'red 0px 0px 10px 0px',
  }

  const nameChahgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompName(e.target.value)
  }

  const checkValidation = () => {

    const isCompNameValid = validate('comp-name', compName)
    setCompNameError({ ...isCompNameValid })
    if (isCompNameValid) {
      return true
    }

    return false
  }

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    checkValidation()
  }
  const formResetHandler = (e: React.FormEvent) => {
    e.preventDefault()
    setCompName('')
    setCompNameError({ error: false, msg: '' })
    handleClose()
  }

  const getDataFromServer = async () => {
    const requestOptions: IRequestOptions = {
      method: 'GET',
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
      console.log("▶ ⇛ response.data:", response.data);

      dispatch(profileStoreActions.setUserDataFromServer(response.data))
      // setUserData(response.data)
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

            </Stack>

            <Fab color="primary" aria-label="add-car" size="small"
              onClick={() => handleOpen()}
              sx={{
                backgroundColor: '#078c75', marginTop: '1rem', zIndex: 100,
                '&:hover': {
                  bgcolor: 'rgb(7, 140, 117, 0.5)',
                }
              }}
            >
              <AddIcon />
            </Fab>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={{ ...style, width: ['80%', '50%', '40%'] }}>
                  <form onSubmit={formSubmitHandler} onReset={formResetHandler}>
                    <Stack>


                      <Typography id="transition-modal-title" variant="subtitle2" component="h2" textAlign={'center'}>
                        Добавить компанию
                      </Typography>
                      <Divider sx={{ mt: '1rem', mb: '1rem' }} />

                      <TextField
                        onChange={nameChahgeHandler}
                        value={compName}
                        // required
                        error={compNameError.error}
                        name="email"
                        // id="outlined-start-adornment"
                        helperText={compNameError.msg || 'имя компании'}
                        FormHelperTextProps={{
                          style: {
                            marginTop: '6px'
                          }
                        }}

                        // Применение стиля к input, а не ко всему TextField
                        inputProps={{
                          style: { padding: '6px', width: '100%' },
                        }}
                        InputProps={{
                          style: {
                            ...inputDefaultStyle,
                            ...(compNameError.error ? inputError : {})
                          }
                        }}
                      />
                    </Stack>
                    <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mt={'1rem'}>
                      <Button variant="contained" type='reset' color="error" size="small"
                        sx={{ width: '30%', }}
                      >Отмена
                      </Button>
                      <Button variant="contained" type='submit' size="small"
                        sx={{ width: '30%', }}
                      >Добавить
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Fade>
            </Modal>


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
    </>
  )
}
export default Companies