import { FC, useState } from "react";

import { Box, Button, Divider, Fab, Fade, Modal, Stack, TextField, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import useFormValidation from "./useFormValidation";

interface IAddCompanyModal {
  addCompanyHandler: (compName: string) => void
}

const AddCompanyModal: FC<IAddCompanyModal> = ({ addCompanyHandler }) => {

  const [open, setOpen] = useState(false)
  const [compName, setCompName] = useState('')
  const [compNameError, setCompNameError] = useState({ error: false, msg: '' })

  const { validate } = useFormValidation()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const nameChahgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompName(e.target.value)
  }

  const checkValidation = () => {
    const isCompNameValid = validate('comp-name', compName)
    setCompNameError({ ...isCompNameValid })
    if (!isCompNameValid.error) {
      return true
    }
    return false
  }

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkValidation()) {
      handleClose()
      setCompName('')
      setCompNameError({ error: false, msg: '' })
      addCompanyHandler(compName)
    }
  }

  const formResetHandler = (e: React.FormEvent) => {
    e.preventDefault()
    setCompName('')
    setCompNameError({ error: false, msg: '' })
    handleClose()
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  const inputDefaultStyle = {
    backgroundColor: '#078c75',
    color: '#fff',
    fontSize: '1rem',
    width: '100%'
  }

  const inputError = {
    boxShadow: 'red 0px 0px 10px 0px',
  }


  return (
    <>
      <Fab color="primary" aria-label="add-car" size="small"
        onClick={() => handleOpen()}
        sx={{
          backgroundColor: '#078c75', marginTop: '1rem', zIndex: 100,
          '&:hover': {
            bgcolor: 'rgb(7, 140, 117, 0.5)',
          }
        }}
      >
        <AddIcon />
      </Fab>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...style, width: ['80%', '50%', '40%'] }}>
            <form onSubmit={formSubmitHandler} onReset={formResetHandler}>
              <Stack>


                <Typography id="transition-modal-title" variant="subtitle2" component="h2" textAlign={'center'}>
                  Добавить компанию
                </Typography>
                <Divider sx={{ mt: '1rem', mb: '1rem' }} />

                <TextField
                  onChange={nameChahgeHandler}
                  value={compName}
                  // required
                  error={compNameError.error}
                  name="email"
                  // id="outlined-start-adornment"
                  helperText={compNameError.msg || 'имя компании'}
                  FormHelperTextProps={{
                    style: {
                      marginTop: '6px'
                    }
                  }}

                  // Применение стиля к input, а не ко всему TextField
                  inputProps={{
                    style: { padding: '6px', width: '100%' },
                    enterKeyHint: 'done'
                  }}
                  InputProps={{
                    style: {
                      ...inputDefaultStyle,
                      ...(compNameError.error ? inputError : {})
                    }
                  }}
                />
              </Stack>
              <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mt={'1rem'}>
                <Button variant="contained" type='reset' color="error" size="small"
                  sx={{ width: '30%', }}
                >Отмена
                </Button>
                <Button
                  // disabled={buttDisable}
                  variant="contained" type='submit' size="small"
                  sx={{ width: '30%', }}
                >Добавить
                </Button>
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
export default AddCompanyModal