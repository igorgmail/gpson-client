import { useEffect } from 'react';
import { useAppDispatch, carsSettingsActions, useAppSelector, store } from '../../store';
import useStartUpdate from './hooks/useStartUpdate';


const OutsideClickListener = () => {

  const dispatch = useAppDispatch()
  const chooseInput = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const { startUpdate } = useStartUpdate()

  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      const targ = event.target as HTMLElement
      const posibleDataAttr = targ.dataset?.forstore

      if (chooseInput === null) return
      // если клик на томже input
      if (chooseInput === posibleDataAttr) return
      if (chooseInput) dispatch(carsSettingsActions.setChooseInputName(null))
      if (store.getState().carsSettings.config.currentSelectBlock) {
        startUpdate()
      }
      return
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chooseInput, dispatch]);

  return (
    <>
    </>
  )
}

export default OutsideClickListener 