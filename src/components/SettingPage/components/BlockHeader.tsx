import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

type TBlockHeaderProps = {
  header: string
}

const BlockHeader: FC<TBlockHeaderProps> = ({ header }) => {

  return (
    <Stack
      display={'flex'} justifyContent={'center'}
      sx={{
        backgroundColor: '#078c75',
        color: 'white',
        borderRadius: '10px',
        // borderTopLeftRadius: '10px',
        // borderTopRightRadius: '10px',
        padding: '.8rem',
        marginBottom: '0',
        marginTop: '2rem',
        position: 'sticky',
        top: '0',
        zIndex: '500'
      }}>
      <Typography variant="h6" align="left" gutterBottom sx={{ marginBottom: '0' }}>
        {header}
      </Typography>
    </Stack>
  )
}

export default BlockHeader