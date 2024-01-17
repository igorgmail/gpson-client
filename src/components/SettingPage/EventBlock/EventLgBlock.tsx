import { FC } from "react";

import { Stack, Grid } from "@mui/material";

import { TEventsData } from "../types/carsSettingsTypes";

import LgFieldEvent from "./LgFieldEvent";

interface IEventBlockProps {
  eventsData: TEventsData[]
  // setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}

const EventLgBlock: FC<IEventBlockProps> = ({ eventsData }) => {

  return (
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

          <Grid item sm={4} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >Автомобиль</Stack>
          </Grid>
          <Grid item sm={4}>
            <Stack display={'flex'} alignItems={'center'}>Точка</Stack>
          </Grid>
          <Grid item sm={2}>
            <Stack sx={{ paddingLeft: '8px' }} display={'flex'} alignItems={'center'}>Событие</Stack>
          </Grid>
          <Grid item sm={2}>
            <Stack sx={{ paddingLeft: '8px' }} display={'flex'} alignItems={'center'}>Ожидание</Stack>
          </Grid>
        </Grid>

        {eventsData.length > 0 && eventsData.map((oneEvent) => (
          <LgFieldEvent oneEvent={oneEvent} key={`eventkey-${oneEvent.event_id}`} />
        ))
        }

      </Stack>

    </Stack >

  )
}

export default EventLgBlock