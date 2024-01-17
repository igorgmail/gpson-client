import { useAppDispatch, carsSettingsActions } from "../../../store";

import useUpdateData from "./useUpdateData";
import configAdminPage from "../config";

function useStartUpdate() {

  const { updateDataRequest } = useUpdateData()
  const dispatch = useAppDispatch()

  function startUpdate() {
    // Если backDrop
    if (configAdminPage.showBackDrop) {
      dispatch(carsSettingsActions.setBackDropShow())
    }

    updateDataRequest()
      .then((data) => {
      })
      .catch((err) => {
        console.warn("При обновлении произошла ошибка ", err);
      dispatch(carsSettingsActions.setAlertShow())
        dispatch(carsSettingsActions.setForcedUpdateToogle())
    })
      .finally(() => {
        if (configAdminPage) {
          dispatch(carsSettingsActions.setBackDropHide())
        }
      }
      )
  }

  return { startUpdate }
}

export default useStartUpdate;



