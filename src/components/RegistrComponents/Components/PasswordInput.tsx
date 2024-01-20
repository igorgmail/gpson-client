import { Visibility, VisibilityOff } from "@mui/icons-material"
import { FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput } from "@mui/material"
import { Dispatch, FC, SetStateAction, useState } from "react"

interface IPasswordInput {
  value: string
  passwordError: { error: boolean, msg: string }
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  setShowConfirmPassword?: Dispatch<SetStateAction<boolean>>
}

const PasswordInput: FC<IPasswordInput> = ({ value, passwordError, changeHandler, setShowConfirmPassword }) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => {
      if (setShowConfirmPassword) {
        setShowConfirmPassword(!show)
      }
      return !show
    })

  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const inputDefaultStyle = {
    backgroundColor: '#078c75',
    color: '#fff',
    fontSize: '1rem',

  }

  const inputError = {
    boxShadow: 'red 0px 0px 10px 0px',
  }

  return (
    <FormControl variant="outlined" error={passwordError.error}>
      <OutlinedInput
        onChange={changeHandler}
        value={value}
        // id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        inputProps={{
          style: { padding: '6px' },
        }}
        style={{
          ...inputDefaultStyle,
          ...(passwordError.error ? inputError : {})
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{passwordError.error ? passwordError.msg : 'пароль'}</FormHelperText>
    </FormControl>
  );
}

export default PasswordInput