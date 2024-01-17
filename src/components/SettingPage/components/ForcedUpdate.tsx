import { FC, useEffect } from "react";
import useAlert from "../hooks/useAlert";
import useBackDrop from "../hooks/useBackdrop";
import { useAppSelector } from "../../../store";


interface IForcedUpdateProps {
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}

const ForcedUpdate: FC<IForcedUpdateProps> = ({ setUpdateForm }) => {

  const alertShowState = useAppSelector((store) => store.carsSettings.config.alertShow)
  const forcedUpdateState = useAppSelector((store) => store.carsSettings.config.forcedUpdateToogle)
  const backDropShowState = useAppSelector((store) => store.carsSettings.config.backDropShow)

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()

  useEffect(() => {
    if (alertShowState) showAlert('Ошибка при обновлении', 'error')
  }, [alertShowState])

  useEffect(() => {
    if (backDropShowState) {
      startBackDrop()
    } else {
      stopBackDrop()
    }
  }, [backDropShowState])

  useEffect(() => {
    setUpdateForm((cur) => !cur)
  }, [forcedUpdateState])

  return (
    <>
      {alertComponent}
      {BackDropComponent}
    </>
  )
}
export default ForcedUpdate