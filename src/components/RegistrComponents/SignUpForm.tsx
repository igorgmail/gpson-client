import { SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"

import useFormValidation from "./useFormValidation"
import { regConfig } from "./config/config"

import { Box, Button, Checkbox, FormControlLabel, Stack } from "@mui/material"

import PasswordInput from "./Components/PasswordInput"
import ConfirmPassword from "./Components/ConfirmPassword"
import GpsonImage from "./Components/GpsonImage"
import EmailInput from "./Components/EmailInput"
import RulesModal from "./RulesModal"
import { IRequestOptions } from "./types/profilePageTypes"
import API_ENDPOINTS from "./utils/apiEndpoints"
import useApi from "./hooks/useApi"
import useAlert from "./hooks/useAlert"
import { useAppDispatch, profileStoreActions } from "../../store"

const SignUpForm = () => {

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState({ error: false, msg: '' })

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState({ error: false, msg: '' })

  const [confirmPass, setConfirmPass] = useState('')
  const [confirmPassError, setConfirmPassError] = useState({ error: false, msg: '' })
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const [rulesOpen, setRulesOpen] = useState(false);
  const [checkRules, setCheckRules] = useState(false)
  const [checkRulesError, setCheckRulesError] = useState(false)

  const [checkGetMesg, setGetCheckMesg] = useState(false)
  const [checkGetMesgError, setGetCheckMesgError] = useState(false)


  const dispatch = useAppDispatch()
  const { validate } = useFormValidation()
  const navigate = useNavigate();
  const { sendRequest } = useApi()
  const { showAlert, alertComponent } = useAlert()

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    setEmail(target.value)
  }

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    setPassword(target.value)
  }

  const confirmPassChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    setConfirmPass(target.value)
  }

  // TODO Изменить логику авторизации
  const signUpFetch = async () => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
    };

    const url = API_ENDPOINTS.USER_REGISTRATION + `?email=${email}&pass=${password}`
    const response = await sendRequest(url, requestOptions)

    if (response.error) {
      showAlert('Не удалось получить данные с сервера', 'error');
    }
    if (response.data?.status === 'error') {
      console.warn("Registration error", response.data.message);
      showAlert('При регистрации произошла ошибка', 'error');
      return
    }
    if (response.data) {
      const { companies } = response.data;// companies - array
      const { id, name } = companies[0]

      // dispatch(profileStoreActions.addNewCompany({ company_id: id, name }))
      navigate('/companies');
    }
  }

  const checkValidation = () => {

    const isEmailValid = validate('email', email)
    const isPasswordValid = validate('password', password)
    const isConfirmPassValid = validate('confirm-password', confirmPass)

    setEmailError({ ...isEmailValid })
    setPasswordError({ ...isPasswordValid })
    setConfirmPassError({ ...isConfirmPassValid })

    if (password !== confirmPass) {
      setConfirmPassError({ error: true, msg: 'Пароли не совпадают' })
    }
    if (!isEmailValid.error && !isPasswordValid.error && password === confirmPass) {
      return true
    }

    return false
  }

  const checkCheckboxRules = () => {
    if (regConfig.isRulesAgreeRequired && regConfig.isGetMessageAgreeRequired) {
      !checkRules ? setCheckRulesError(true) : setCheckRulesError(false)
      if (!checkGetMesg) setGetCheckMesgError(true)
      return checkRules && checkGetMesg
    }
    if (regConfig.isRulesAgreeRequired) {
      !checkRules ? setCheckRulesError(true) : setCheckRulesError(false)
      return checkRules
    }
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkValidation() && checkCheckboxRules()) {
      signUpFetch()
    }
  }

  const rulesCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'rules-agree') {
      setCheckRules((curr) => {
        if (checkRulesError && !curr) setCheckRulesError(false)
        return !curr
      })
    }
    if (e.target.name === 'getmsg-agree') {
      setGetCheckMesg((curr) => {
        if (checkGetMesgError && !curr) setGetCheckMesgError(false)
        return !curr
      })
    }
  }


  // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const backHandler = () => {
    navigate('/');
  }

  const showRulesHandler = () => {
    setRulesOpen(true)
  }


  return (
    <>

    <Box position="relative" flexDirection="row" height="90svh" width="100%"
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
    >
      <form className='reg-default-form' id='login-form-id' onSubmit={submitHandler}>
        <Stack
          sx={{
            width: ['80%', '50%', '40%', '30%']
          }}
          display={'flex'} flexDirection={'column'} gap={'6px'}>

          <GpsonImage key={'su-gp-img-key'}></GpsonImage>

          <EmailInput
            value={email}
            emailError={emailError}
            changeHandler={emailChangeHandler}
            key={'su-email-inp-key'}
          ></EmailInput>

          <PasswordInput
            value={password}
            passwordError={passwordError}
            changeHandler={passwordChangeHandler}
            setShowConfirmPassword={setShowConfirmPass}
            key={'su-pass-inp-key'}
          ></PasswordInput>

          <ConfirmPassword
            value={confirmPass}
            confirmPassError={confirmPassError}
            changeHandler={confirmPassChangeHandler}
            showConfirmPass={showConfirmPass}
            key={'su-confpass-inp-key'}
          ></ConfirmPassword>



          <Stack display={'flex'} flexDirection={'row'} gap={'2rem'} >

            <Checkbox
              checked={checkRules} onChange={rulesCheckboxHandler} name="rules-agree"
              // {...label}
              sx={{
                padding: '0px',
                color: checkRulesError ? 'red' : '#078c75',
                '&.Mui-checked': {
                  color: '#078c75',
                },
              }}
            />
            <p
              onClick={() => showRulesHandler()}
              className={checkRulesError ? "checkbox-text--error cp" : "checkbox-text cp"}
            >Согласен с правилами сервиса</p>

          </Stack>

          <Stack display={'flex'} flexDirection={'row'} gap={'2rem'} >

            <Checkbox
              checked={checkGetMesg} onChange={rulesCheckboxHandler} name="getmsg-agree"
              // {...label}
              sx={{
                padding: '0px',
                color: checkGetMesgError ? 'red' : '#078c75',
                '&.Mui-checked': {
                  color: '#078c75',
                },
              }}
            />
            <p
              className={checkGetMesgError ? "checkbox-text--error" : "checkbox-text"}
            >Согласен с получением сообщений</p>

          </Stack>
          <Stack display={'flex'} flexDirection={'row'} gap={'2rem'} justifyContent={'stretch'}>
            <Button variant="contained" style={{ flexGrow: 1 }} className='reg-default-form--button '
              type='submit'
            >Регистрация</Button>
          </Stack>
          <p className="back-text" onClick={() => backHandler()}>назад</p>
        </Stack>
      </form>
      <RulesModal rulesOpen={rulesOpen} setRulesOpen={setRulesOpen}></RulesModal>
    </Box>
      {alertComponent}
    </>
  )

}
export default SignUpForm