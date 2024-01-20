import { FormControl, FormHelperText, OutlinedInput } from "@mui/material"
import { FC } from "react"

interface IConfirmPassword {
  value: string
  error: { status: boolean, msg: string }
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  showConfirmPass?: boolean
}

const ConfirmPassword: FC<IConfirmPassword> = ({ value, error, changeHandler, showConfirmPass }) => {

  const inputDefaultStyle = {
    backgroundColor: '#078c75',
    color: '#fff',
    fontSize: '1rem',

  }

  const inputError = {
    boxShadow: 'red 0px 0px 10px 0px',
  }

  return (
    <FormControl variant="outlined" error={error.status}>
      <OutlinedInput
        onChange={changeHandler}
        value={value}
        // id="outlined-adornment-password"
        type={showConfirmPass ? 'text' : 'password'}
        inputProps={{
          style: { padding: '6px' },
        }}
        style={{
          ...inputDefaultStyle,
          ...(error.status ? inputError : {})
        }}

      />
      <FormHelperText>{error.status ? error.msg : 'повторите пароль'}</FormHelperText>
    </FormControl>
  );
}

export default ConfirmPassword