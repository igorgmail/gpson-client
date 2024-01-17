import { FC } from "react"

import { Stack, Grid } from "@mui/material"
import { TPointsData } from "../types/carsSettingsTypes";

import LgFieldPoints from "./LgFieldPoints";

interface IPointDataProps {
  pointData: TPointsData[]
}

const ControlBlockLgScreen: FC<IPointDataProps> = ({ pointData }) => {

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

          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >Имя</Stack>
          </Grid>
          <Grid item xs={7}>
            <Stack display={'flex'} alignItems={'center'}>Адрес</Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack display={'flex'} alignItems={'center'}>Радиус</Stack>
          </Grid>
        </Grid>

        {pointData.length > 0 && pointData.map((point) => (
          <LgFieldPoints onePoint={point} key={`point-${point.point_id}`} />
        ))
        }

      </Stack>

    </Stack >
  )
}

export default ControlBlockLgScreen