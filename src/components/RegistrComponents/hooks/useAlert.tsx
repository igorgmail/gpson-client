import { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import CustomAlert from '../Components/CustomAlert';

type AlertProps = {
  message?: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

const useAlert = () => {
  const [alertProps, setAlertProps] = useState<AlertProps | null>(null);

  const showAlert = useCallback((message: string, severity: 'error' | 'warning' | 'info' | 'success' = 'info') => {

    setAlertProps({ message, severity });

    setTimeout(() => {
      setAlertProps(null)

    }, 1500);
    // }
  }, []);

  const root = document.getElementById('alert-portal')!;
  const alertComponent: JSX.Element | null = alertProps ? ReactDOM.createPortal(
    <CustomAlert
      message={alertProps.message}
      severity={alertProps.severity}
    />
    , root!) : null;

  return { showAlert, alertComponent };
};

export default useAlert;