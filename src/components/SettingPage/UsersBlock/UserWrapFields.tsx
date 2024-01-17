import { FC, } from "react"

import { Grid, Stack } from "@mui/material"
import { TUsers } from "../types/carsSettingsTypes"

import UserField from "./UserField";

interface IUserWrapFieldsProps {
  usersData: TUsers[],
}

const UserWrapFields: FC<IUserWrapFieldsProps> = ({ usersData }) => {

  return (
    <>
      <Stack sx={{ flexGrow: 1, overflow: 'hidden' }}>

        {/* Header Cars */}
        <Stack
          sx={{ marginBottom: '0' }}
        >
          <Grid container
            rowSpacing={1}
            sx={{
              marginTop: '0.8rem',
              backgroundColor: '#078c75',
              color: 'white',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              paddingLeft: '.8rem'
            }}>

            <Grid item xs={6} sx={{ borderTopLeftRadius: '8px' }}>
              <Stack >Email</Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack display={'flex'} alignItems={'center'}>Полномочия</Stack>
            </Grid>
          </Grid>
          {usersData.length > 0 && usersData.map((oneUser) => (
            <UserField oneUser={oneUser} key={`userblock-${oneUser.user_id}`}
            />
          ))
          }

        </Stack>
      </Stack>
    </>
  )
}

export default UserWrapFields