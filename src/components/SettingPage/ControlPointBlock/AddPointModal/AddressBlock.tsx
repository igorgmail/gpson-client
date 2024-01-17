import { FC } from 'react';
import { Box, Input, Skeleton } from '@mui/material';

type TAddressBlockProps = {
  address: string | undefined,
  load: boolean
}
const AddressBlock: FC<TAddressBlockProps> = ({ address, load }) => {

  return (
    !load ? (
      <Input
        value={address}
        readOnly
        sx={{
          marginBottom: '1rem',
          width: '80%'
        }} />)
      :
      (
        <Box sx={{ width: '100%', height: '2rem' }}>

          <Skeleton animation="wave" sx={{ height: '100%' }} />
        </Box>)
  )
}

export default AddressBlock