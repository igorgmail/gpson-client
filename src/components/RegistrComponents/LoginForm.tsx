import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';

import useFormValidation from './useFormValidation'

import EmailInput from './Components/EmailInput';
import PasswordInput from './Components/PasswordInput';
import GpsonImage from './Components/GpsonImage';

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState({ status: false, msg: '' })

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState({ status: false, msg: '' })

  const { validate } = useFormValidation()

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    setEmail(target.value)
  }

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    setPassword(target.value)
  }


  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    const isEmailValid = validate('email', email)
    const isPasswordValid = validate('password', password)

    // All Ok
    if (isEmailValid.status === 'ok' && isPasswordValid.status === 'ok') {
      console.log("Все поля валидны");
    }

    // email
    if (isEmailValid.status === 'ok') setEmailError({ status: false, msg: isEmailValid.msg })
    if (isEmailValid.status === 'error') {
      setEmailError({ status: true, msg: isEmailValid.msg })
    } else {
      setEmailError({ status: false, msg: '' })
    }

    // password
    if (isPasswordValid.status === 'ok') setPasswordError({ status: false, msg: isEmailValid.msg })
    if (isPasswordValid.status === 'error') {
      setPasswordError({ status: true, msg: isPasswordValid.msg })
    }

  }

  return (
    <Box position="relative" flexDirection="row" height="100vh" width="100%"
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
    >
      <form className='reg-default-form' id='login-form-id' onSubmit={submitHandler}>
        <Stack
          sx={{
            width: ['80%', '50%', '40%', '30%']
          }}
          display={'flex'} flexDirection={'column'} gap={'1rem'}>

          <GpsonImage></GpsonImage>

          <EmailInput value={email} error={emailError} changeHandler={emailChangeHandler}></EmailInput>

          <PasswordInput value={password} error={passwordError} changeHandler={passwordChangeHandler}></PasswordInput>

          <Stack display={'flex'} flexDirection={'row'} gap={'2rem'} justifyContent={'stretch'}>

            <Button variant="contained" style={{ flexGrow: 1 }} className='reg-default-form--button '

            >Регистрация</Button>

            <Button variant="contained" style={{ flexGrow: 1 }} className='reg-default-form--button '
              type='submit'
            >Вход</Button>
          </Stack>

        </Stack>
      </form>
    </Box>
  )
}

export default LoginForm