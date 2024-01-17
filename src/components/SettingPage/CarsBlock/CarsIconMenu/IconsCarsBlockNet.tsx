import React from 'react';

import { Grid, Stack } from '@mui/material';

type TIconsNetProps = {
  iconObject: {
    icon_id: string,
    url: string,
  },
  handleIconCarInNetClick: (e: React.MouseEvent) => void
}

const IconsCarsBlockNet: React.FC<TIconsNetProps> = ({ iconObject, handleIconCarInNetClick }) => {
  return (

    <Grid item xs={4}>

      <Stack
        className='cars-popup--item'
        data-iconid={iconObject.icon_id}
          onClick={(e) => handleIconCarInNetClick(e)}>
        <img src={iconObject.url} className='cars-popup--image'></img>
      </Stack>

    </Grid>
  )
}
export default IconsCarsBlockNet