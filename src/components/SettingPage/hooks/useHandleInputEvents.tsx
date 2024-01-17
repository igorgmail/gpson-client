import { carsSettingsActions, store, useAppDispatch, useAppSelector } from "../../../store"
import useStartUpdate from "./useStartUpdate"

function useHandleInput() {

  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const dispatch = useAppDispatch()
  const { startUpdate } = useStartUpdate()

  const handleInputClickLG = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    event.preventDefault()
    const touchNumber = event.detail

    if (touchNumber === 2) {
      const targ = event.currentTarget

      // targ.setAttribute('readonly', 'false')
      const dataValue = targ.dataset.forstore
      const inputType = event.currentTarget.type

      if (dataValue === chooseInputFromStore) return
      // targ.removeAttribute('readonly');
      targ.blur()
      // setTimeout(() => targ.focus())

      if (dataValue) dispatch(carsSettingsActions.setChooseInputName(dataValue))
      targ.focus()
      // Установка курсора в конец текста
      if (inputType === 'number') {
        targ.type = 'text'
        const textLength = targ.value.length;
        targ.setSelectionRange(textLength, textLength);
        targ.type = 'number'
      } else {
        const textLength = targ.value.length;
        targ.setSelectionRange(textLength, textLength);
      }
    }
  }

  const handleInputClickSM = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    event.preventDefault()
    const touchNumber = event.detail

    if (touchNumber === 1) {
      const targ = event.currentTarget

      // targ.setAttribute('readonly', 'false')
      const dataValue = targ.dataset.forstore
      const inputType = event.currentTarget.type

      if (dataValue === chooseInputFromStore) return
      targ.removeAttribute('readonly');
      targ.blur()

      if (dataValue) dispatch(carsSettingsActions.setChooseInputName(dataValue))
      // setTimeout(() => targ.focus())
      targ.focus()
      // Установка курсора в конец текста

      if (inputType === 'number') {
        targ.type = 'text'
        const textLength = targ.value.length;
        targ.setSelectionRange(textLength, textLength);
        targ.type = 'number'
      } else {
        const textLength = targ.value.length;
        targ.setSelectionRange(textLength, textLength);
      }
      // targ.focus()
    }
  }

  const handleKeyDownLG = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Проверяем, была ли нажата клавиша "Enter"
    // e.preventDefault()
    const key = e.key || e.keyCode || e.which;
    const target = e.target as HTMLInputElement

    if (e.key === 'Enter' || key === 13) {
      const isModifiedData = store.getState().carsSettings.config.currentSelectBlock
      if (isModifiedData) {
        dispatch(carsSettingsActions.setChooseInputName(null))
        startUpdate()
        target.blur()

      } else {
        dispatch(carsSettingsActions.setChooseInputName(null))
        target.blur()
      }
    }
  };

  const handleKeyUpSM = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Проверяем, была ли нажата клавиша "Enter"
    // e.preventDefault()
    const key = e.key || e.keyCode || e.which;
    const target = e.target as HTMLInputElement

    if (e.key === 'Enter' || key === 13) {
      const isModifiedData = store.getState().carsSettings.config.currentSelectBlock
      if (isModifiedData) {
        dispatch(carsSettingsActions.setChooseInputName(null))
        startUpdate()
        target.blur()

      } else {
        dispatch(carsSettingsActions.setChooseInputName(null))
        target.blur()
      }
    }
  };

  return { handleInputClickLG, handleInputClickSM, handleKeyDownLG, handleKeyUpSM }
}

export default useHandleInput