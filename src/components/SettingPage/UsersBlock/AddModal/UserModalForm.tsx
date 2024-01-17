import React, { useState, FC } from "react"

import {  Stack, Grid, Button} from "@mui/material"


import {  TUserRole} from "../../types/carsSettingsTypes";
import SelectBlock from "../../components/SelectBlock";

type TAddEventForm = {
  handleClose: () => void,
  handleFormSubmit: (userData: TUserRole) => void
}

const UserModalForm: FC<TAddEventForm> = ({ handleClose, handleFormSubmit }) => {

  const [userEmail, setUserEmail] = useState<string>('')
  const [userRole, setUserRole] = useState('user')

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const objectIndex = e.target.value
    // console.log("Индекс объекта", objectIndex);

    const selectedIndex = e.target.options.selectedIndex;
    // console.log("Порядковый номер", selectedIndex);

    const selectedText = e.target.options[selectedIndex].text;
    // console.log("Техт объекта:", selectedText);

    const selectedOption = e.target.options[selectedIndex];
    const selectedData = selectedOption.dataset.optionName;

    if (selectedData === 'option-role') {
      setUserRole((curr) => objectIndex)
    }
  }

  const clearState = () => {
    // Очистка формы
    setUserEmail('')
    setUserRole('user')
  }

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const userData = {
      user_email: userEmail,
      user_role: userRole,
    }
    handleFormSubmit(userData)
    // clearState()
  }
  const handleCancelButton = () => {
    clearState()
    handleClose()
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setUserEmail((curr) => email)
  }
  return (
    <Stack>
      <form onSubmit={handleAddEventSubmit}>
        <Grid container
          rowSpacing={1}

        >
          {/* Email */}
          <Grid item xs={2} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="emailFieldId">Email</label>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            {/* empty */}
          </Grid>

          <Grid item xs={8}>
            <Stack display={'flex'} sx={{ paddingRight: '8px' }}>
              <input
                id='emailFieldId'
                onChange={handleEmailChange}
                // readOnly={true}
                className="modal-input"
                style={{ width: '100%' }}
                value={userEmail}
                type="email"
                required
              />
            </Stack>
          </Grid>

          {/* Роль */}
          <Grid item xs={2} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label>Роль</label>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            {/* empty */}
          </Grid>

          <Grid item xs={4}>
            <Stack display={'flex'}>
              <SelectBlock selectedItem={userRole} modifier={'ROLE'} selectChange={selectChange} />
            </Stack>
          </Grid>




        </Grid>

        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'2rem'}
          sx={{ marginTop: '1rem' }}
        >
          <Button type="submit">Добавить</Button>
          <Button onClick={handleCancelButton}>Отмена</Button>
        </Stack>
      </form>
    </Stack>
  )
}
export default UserModalForm
