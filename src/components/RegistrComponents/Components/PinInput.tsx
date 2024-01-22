import { Box } from '@mui/material';
import { FC } from 'react';
import PinInput from 'react-pin-input';


interface ICustomPinInput {
  pinError: { error: boolean, msg: string },
  changeHandler: (value: string, index: number) => void
}
const CustomPinInput: FC<ICustomPinInput> = ({ pinError, changeHandler }) => {


  const inputDefaultStyle = {
    backgroundColor: '#078c75',
    color: '#fff',
    fontSize: '1rem',
    borderRadius: '4px',
    width: '12%',
    boxShadow: pinError.error ? 'red 0px 0px 10px 0px' : 'none'
  }

  return (
    <Box>

      <PinInput
        length={6}
        initialValue=""
        // secret
        // secretDelay={100}
        onChange={(value, index) => changeHandler(value, index)}
        type="numeric"
        inputMode="number"
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        // style={{ padding: '10px' }}
        inputStyle={inputDefaultStyle}
        inputFocusStyle={{}}
        onComplete={(value, index) => { }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      {!pinError.error ?
        <p className="text_helper-imitate">код из письма</p>
        :
        <p className="text_helper-imitate text-err">{pinError.msg}</p>
      }
    </Box>

  )
}
export default CustomPinInput