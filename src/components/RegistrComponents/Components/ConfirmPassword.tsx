import { FormControl, FormHelperText, OutlinedInput } from "@mui/material"
import { FC } from "react"

interface IConfirmPassword {
  value: string
  confirmPassError: { error: boolean, msg: string }
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  showConfirmPass?: boolean
}

const ConfirmPassword: FC<IConfirmPassword> = ({ value, confirmPassError, changeHandler, showConfirmPass }) => {

  const inputDefaultStyle = {
    backgroundColor: '#078c75',
    color: '#fff',
    fontSize: '1rem',

  }

  const inputError = {
    boxShadow: 'red 0px 0px 10px 0px',
  }

  return (
    <FormControl variant="outlined" error={confirmPassError.error}>
      <OutlinedInput
        onChange={changeHandler}
        value={value}
        id="confirm-password-input"
        type={showConfirmPass ? 'text' : 'password'}
        inputProps={{
          style: { padding: '6px' },
          enterKeyHint: 'done'
        }}
        style={{
          ...inputDefaultStyle,
          ...(confirmPassError.error ? inputError : {})
        }}

      />
      <FormHelperText>{confirmPassError.error ? confirmPassError.msg : 'повторите пароль'}</FormHelperText>
    </FormControl>
  );
}

export default ConfirmPassword