import { useState } from "react"
import { useNavigate } from "react-router-dom"

import useFormValidation from "./useFormValidation"
import { regConfig } from "./config/config"

import { Box, Button, Checkbox, FormControlLabel, Stack } from "@mui/material"

import PasswordInput from "./Components/PasswordInput"
import ConfirmPassword from "./Components/ConfirmPassword"
import GpsonImage from "./Components/GpsonImage"
import EmailInput from "./Components/EmailInput"
import RulesModal from "./RulesModal"

const SignUpForm = () => {

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState({ status: false, msg: '' })

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState({ status: false, msg: '' })

  const [confirmPass, setConfirmPass] = useState('')
  const [confirmPassError, setConfirmPassError] = useState({ status: false, msg: '' })
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const [rulesOpen, setRulesOpen] = useState(false);
  const [checkRules, setCheckRules] = useState(false)
  const [checkGetMesg, setGetCheckMesg] = useState(false)

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

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    const isEmailValid = validate('email', email)
    const isPasswordValid = validate('password', password)
    const isConfirmPassValid = validate('confirm-password', confirmPass)

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
    // confirm password
    if (isConfirmPassValid.status === 'ok') setConfirmPassError({ status: false, msg: isEmailValid.msg })
    if (isConfirmPassValid.status === 'error') {
      setConfirmPassError({ status: true, msg: isConfirmPassValid.msg })
    }

    if (password !== confirmPass) {
      setConfirmPassError({ status: true, msg: 'Пароли не совпадают' })
    }



  }

  const isAllValidAndFull = () => {
    // All Ok
    if (isEmailValid.status === 'ok'
      && isPasswordValid.status === 'ok'
      && isConfirmPassValid.status === 'ok'
      && password === confirmPass
    ) {
      // checkboxes
      if (regConfig.isRulesAgreeRequired && regConfig.isGetMessageAgreeRequired)
        console.log("Все поля валидны");
    }
  }

  const rulesCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'rules-agree') {
      setCheckRules((curr) => !curr)
    }
    if (e.target.name === 'getmsg-agree') {
      setGetCheckMesg((curr) => !curr)
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
            error={emailError}
            changeHandler={emailChangeHandler}
            key={'su-email-inp-key'}
          ></EmailInput>

          <PasswordInput
            value={password}
            error={passwordError}
            changeHandler={passwordChangeHandler}
            setShowConfirmPassword={setShowConfirmPass}
            key={'su-pass-inp-key'}
          ></PasswordInput>

          <ConfirmPassword
            value={confirmPass}
            error={confirmPassError}
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
                color: '#078c75',
                '&.Mui-checked': {
                  color: '#078c75',
                },
              }}
            />
            <p
              onClick={() => showRulesHandler()}
              className="checkbox-text cp"
            >Согласен с правилами сервиса</p>

          </Stack>

          <Stack display={'flex'} flexDirection={'row'} gap={'2rem'} >

            <Checkbox
              checked={checkGetMesg} onChange={rulesCheckboxHandler} name="getmsg-agree"
              // {...label}
              sx={{
                padding: '0px',
                color: '#078c75',
                '&.Mui-checked': {
                  color: '#078c75',
                },
              }}
            />
            <p className="checkbox-text">Согласен с получением сообщений</p>

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
  )

}
export default SignUpForm