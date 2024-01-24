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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, nextFieldId: string) => {
    const key = e.key || e.keyCode || e.which;
    // const target = e.target as HTMLInputElement

    if (e.key === 'Enter' || key === 13) {
      e.preventDefault();
      const nextField = document.getElementById(nextFieldId);
      const button = document.getElementById('button-submit-id');
      if (nextField) {
        nextField.focus();
      } else {
        button?.focus()
      }
    }
  };

  return (
    <FormControl variant="outlined" error={confirmPassError.error}>
      <OutlinedInput
        onChange={changeHandler}
        value={value}
        id="confirm-password-input"
        type={showConfirmPass ? 'text' : 'password'}
        inputProps={{
          onKeyDown: (e) => handleKeyDown(e, "checkbox-rule-id"),
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