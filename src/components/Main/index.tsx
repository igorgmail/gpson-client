import { ComponentType } from 'react';
import { Box } from '@mui/material';
import { default as RegMain } from '../RegistrComponents/index';

export const Main: ComponentType = () => {

  return (
    <Box display="flex" position="relative" flexDirection="row" height="100vh" width="100%">
      <RegMain />
    </Box>
  );
};
