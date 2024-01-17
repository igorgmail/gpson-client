import { FC } from "react"

import { ICarObject } from "../types/carsSettingsTypes";
import { Stack, Grid } from "@mui/material"
import LgFieldCars from "./LgFieldCars";

interface ICarsBlockProps {
  carsData: ICarObject[],
}

const CarsLargeScreen: FC<ICarsBlockProps> = ({ carsData }) => {

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

          <Grid item xs={3} md={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >Имя</Stack>
          </Grid>
          <Grid item xs={2} md={3}>
            <Stack display={'flex'} alignItems={'center'}>Иконка</Stack>
          </Grid>
          <Grid item xs={3} md={3}>
            <Stack sx={{ paddingLeft: '8px' }}>Imei</Stack>
          </Grid>
          <Grid item xs={4} md={3}>
            <Stack sx={{ paddingLeft: '8px' }}>Imei-2</Stack>
          </Grid>
        </Grid>

        {carsData.length > 0 && carsData.map((car) => (<LgFieldCars car={car} key={`cars-block-` + car.car_id} />))
        }

      </Stack>

    </Stack >
  )
}

export default CarsLargeScreen