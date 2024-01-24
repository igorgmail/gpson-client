import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';

import useFormValidation from './useFormValidation'
import { useNavigate } from 'react-router-dom';
import createBasicAuthToken from './utils/createBasicAuth';

import { IRequestOptions } from "./types/profilePageTypes";
import API_ENDPOINTS from "./utils/apiEndpoints"

import FormWrap from './FormWrap';
import EmailInput from './Components/EmailInput';
import PasswordInput from './Components/PasswordInput';
import GpsonImage from './Components/GpsonImage';
import { useAppDispatch, profileStoreActions } from '../../store';
import useApi from './hooks/useApi';
import useAlert from './hooks/useAlert';

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState({ error: false, msg: '' })

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState({ error: false, msg: '' })

  const dispatch = useAppDispatch()
  const { validate } = useFormValidation()
  const navigate = useNavigate();
  const { sendRequest } = useApi()
  const { showAlert, alertComponent } = useAlert()

  // TODO Изменить логику авторизации
  const loginFetch = async () => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
    };

    const url = API_ENDPOINTS.GET_USER_DATA
    const response = await sendRequest(url, requestOptions)

    if (response.error) {
      showAlert('Не удалось получить данные с сервера', 'error');
    }
    if (response.data?.status === 'error') {
      console.warn("Authentication error", response.data.message);
      showAlert('Нет такого пользователя или пароля', 'error');
      return
    }
    if (response.data) {
      const { companies } = response.data;// companies - array
      const { id, name } = companies[0]

      dispatch(profileStoreActions.addNewCompany({ company_id: id, name }))
      navigate('/companies');
    }
  }

  const checkAllFieldToValid = () => {
    return !emailError.error && !passwordError.error
  }

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    setEmail(target.value)
  }

  const emailBlulHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const isEmailValid = validate('email', email)
    setEmailError({ ...isEmailValid })
  }

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    setPassword(target.value)
  }

  const passwordBlulHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const isPasswordValid = validate('password', password)
    setPasswordError({ ...isPasswordValid })

  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    const isEmailValid = validate('email', email)
    const isPasswordValid = validate('password', password)

    setEmailError({ ...isEmailValid })
    setPasswordError({ ...isPasswordValid })


    // All Ok
    if (!isEmailValid.error && !isPasswordValid.error) {
      console.log("Все поля валидны");
      const token = createBasicAuthToken(email, password)
      dispatch(profileStoreActions.setUserToken(token))
      loginFetch()
      // 
    }


  }

  const redirectToRegistration = () => {
    navigate('/registration'); // Переход на маршрут регистрации
  };

  const resetHandler = () => {
    navigate('/reset_password');
  }
  return (<>
    <FormWrap>
      <form className='reg-default-form' id='login-form-id' onSubmit={submitHandler}>
          <EmailInput
            value={email}
            emailError={emailError}
            changeHandler={emailChangeHandler}
          // onBlurHandler={emailBlulHandler}
            key={'email-input-key'}
        ></EmailInput>

          <PasswordInput
            value={password}
            passwordError={passwordError}
            changeHandler={passwordChangeHandler}
            key={'password-input-key'}
          ></PasswordInput>

          <Stack display={'flex'} flexDirection={'row'} gap={'2rem'} justifyContent={'stretch'}>

            <Button variant="contained" style={{ flexGrow: 1 }} className='reg-default-form--button '
              onClick={redirectToRegistration}
            >Регистрация</Button>

            <Button variant="contained" style={{ flexGrow: 1 }} className='reg-default-form--button '
              type='submit'
              // onClick={submitHandler}
            >Вход</Button>
          </Stack>

        <p className="back-text" onClick={() => resetHandler()}>зыбыли пароль</p>
      </form>
    </FormWrap>
    {alertComponent}
  </>

  )
}

export default LoginForm