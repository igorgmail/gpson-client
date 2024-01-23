import { TextField } from "@mui/material"
import { FC } from "react"

interface IEmailInput {
  value: string
  emailError: { error: boolean, msg: string }
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EmailInput: FC<IEmailInput> = ({ value, emailError, changeHandler }) => {

  const inputDefaultStyle = {
    backgroundColor: '#078c75',
    color: '#fff',
    fontSize: '1rem',
  }

  const inputError = {
    boxShadow: 'red 0px 0px 10px 0px',
  }

  return (
    <TextField
      onChange={changeHandler}
      value={value}
      // required
      error={emailError.error}
      name="email"
      // id="outlined-start-adornment"
      helperText={emailError.msg || 'e-mail'}
      FormHelperTextProps={{
        style: {
          marginTop: '6px'
        }
      }}

      // Применение стиля к input, а не ко всему TextField
      inputProps={{
        style: { padding: '6px' },
        enterKeyHint: 'done'
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