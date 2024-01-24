import { Stack, TextField } from "@mui/material"
import { FC } from "react"

interface IEmailInput {
  value: string
  emailError: { error: boolean, msg: string }
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlurHandler?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const EmailInput: FC<IEmailInput> = ({ value, emailError, changeHandler, onBlurHandler }) => {

  const inputDefaultStyle = {
    backgroundColor: '#078c75',
    color: '#fff',
    fontSize: '1rem',
  }

  const inputError = {
    boxShadow: 'red 0px 0px 10px 0px',
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, nextFieldId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextField = document.getElementById(nextFieldId);
      if (nextField) {
        nextField.focus();
      }
    }
  };

  return (
    // <Stack display={'flex'} flexDirection={'column'} width={'100%'}>

    //   <input
    //   onChange={changeHandler}
    //   value={value}
    //     enterKeyHint='done'
    //   // required
    //     // error={emailError.error}
    //   name="email"
    //     type="text"
    //     className={emailError.error ? `input-default input-error` : `input-default`}
    //   // id="outlined-start-adornment"
    //     // helperText={emailError.msg || 'e-mail'}
    //     // FormHelperTextProps={{
    //     //   style: {
    //     //     marginTop: '6px'
    //     //   }
    //     // }}

    //     // // Применение стиля к input, а не ко всему TextField
    //     // inputProps={{
    //     //   style: { padding: '6px' },
    //     //   enterKeyHint: 'done'
    //     // }}
    //     // InputProps={{
    //     //   style: {
    //     //     ...inputDefaultStyle,
    //     //     ...(emailError.error ? inputError : {})
    //     //   },
    //     // }}
    // />
    //   <p className={emailError.error ? "helper-text--default helper-text--error" : `helper-text--default`}>{emailError.msg || 'e-mail'}</p>
    // </Stack>

    <TextField
      onChange={changeHandler}
      // onBlur={onBlurHandler}
      onKeyDown={(e) => handleKeyDown(e, "password-input")}
      value={value}
      // required
      error={emailError.error}
      name="email"
      id="email_input"
      helperText={emailError.msg || 'e-mail'}
      FormHelperTextProps={{
        style: {
          marginTop: '6px'
        }
      }}

      // Применение стиля к input, а не ко всему TextField
      inputProps={{
        style: { padding: '6px' },
        enterKeyHint: 'enter'
      }}
      InputProps={{
        style: {
          ...inputDefaultStyle,
          ...(emailError.error ? inputError : {})
        },
      }}
    />
  )
}

export default EmailInput