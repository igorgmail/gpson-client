import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

type CustomAlertProps = {
  message?: string;
  severity: 'error' | 'warning' | 'info' | 'success';
};

enum EAlertColor {
  'error' = '#F72585',
  'warning' = '#FCA311',
  'success' = '#078c75',
  'info' = '#4361EE',
}
const CustomAlert: React.FC<CustomAlertProps> = ({ message, severity }) => (
  <Alert
    severity={severity}
    variant="filled"
    icon={<CheckIcon />}
    sx={{ backgroundColor: EAlertColor[severity] }}
  >
    {message}
  </Alert>
);

export default CustomAlert;