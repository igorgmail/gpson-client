import { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CustomAlert from '../components/CustomAlert';

import { useAppDispatch, carsSettingsActions } from '../../../store';

type AlertProps = {
  message?: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

const useAlert = () => {
  const [alertProps, setAlertProps] = useState<AlertProps | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showAlert = useCallback((message: string, severity: 'error' | 'warning' | 'info' | 'success' = 'info') => {
    if (isMounted) {
      setAlertProps({ message, severity });
      setTimeout(() => {
        setAlertProps(null)
        dispatch(carsSettingsActions.setAlertHide())
      }, 1500);
    }
  }, [isMounted]);

  const root = document.getElementById('alert-portal')!;
  const alertComponent: JSX.Element | null = isMounted && alertProps ? ReactDOM.createPortal(
    <CustomAlert
      message={alertProps.message}
      severity={alertProps.severity}
    />
    , root!) : null;

  return { showAlert, alertComponent };
};

export default useAlert;