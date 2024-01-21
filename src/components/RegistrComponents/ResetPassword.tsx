import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';

import useFormValidation from './useFormValidation'
import { useNavigate } from 'react-router-dom';

import EmailInput from './Components/EmailInput';
import PasswordInput from './Components/PasswordInput';
import GpsonImage from './Components/GpsonImage';
import ConfirmPassword from './Components/ConfirmPassword';
import CustomPinInput from './Components/PinInput';

const ResetPassword = () => {

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState({ error: false, msg: '' })

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState({ error: false, msg: '' })

  const [confirmPass, setConfirmPass] = useState('')
  const [confirmPassError, setConfirmPassError] = useState({ error: false, msg: '' })
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const [pinValue, setPinValue] = useState('')
  const [pinError, setPinError] = useState({ error: false, msg: '' })


  const { validate } = useFormValidation()
  const navigate = useNavigate();

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

  const pinInputChangeHandler = (value: string, index: number) => {
    setPinValue(value)
  }
  const backHandler = () => {
    navigate('/');
  }

  const checkValidation = () => {

    const isEmailValid = validate('email', email)
    const isPasswordValid = validate('password', password)
    const isConfirmPassValid = validate('confirm-password', confirmPass)
    const isPinValid = validate('pin', pinValue)


    setEmailError({ ...isEmailValid })
    setPasswordError({ ...isPasswordValid })
    setConfirmPassError({ ...isConfirmPassValid })
    setPinError({ ...isPinValid })

    if (password !== confirmPass) {
      setConfirmPassError({ error: true, msg: 'Пароли не совпадают' })
    }
    if (!isEmailValid.error && !isPasswordValid.error && password === confirmPass && !isPinValid.error) {
      return true
    }

    return false
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkValidation()) {
      console.log("Все поля валидны");
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
          display={'flex'} flexDirection={'column'} gap={'6px'}>

          <GpsonImage key={'gpson-image-key'}></GpsonImage>

          <EmailInput
            value={email}
            emailError={emailError}
            changeHandler={emailChangeHandler}
            key={'email-input-key'}
          ></EmailInput>

          {/* <CodeInput length={6}></CodeInput> */}
          <CustomPinInput pinError={pinError} changeHandler={pinInputChangeHandler}></CustomPinInput>
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

          <Stack display={'flex'} flexDirection={'row'} gap={'2rem'} justifyContent={'stretch'}>

            <Button variant="contained" style={{ flexGrow: 1 }} className='reg-default-form--button '
              type='submit'
            >Запомнить пароль</Button>
          </Stack>

          <p className="back-text" onClick={() => backHandler()}>назад</p>
        </Stack>
      </form>
    </Box>
  )
}
export default ResetPassword