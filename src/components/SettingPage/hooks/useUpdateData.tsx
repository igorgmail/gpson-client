import { useAppDispatch, carsSettingsActions, store } from "../../../store";
import useApi from "./useApi";

import API_ENDPOINTS from "../utils/apiEndpoints";
import DataExtractor from "../utils/dataExtractor";
import { ICarObject, TEventsDataForServer, TPointsData, TUsers, TCompName } from "../types/carsSettingsTypes";

type Tmethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequestOptions {
  method: Tmethod;
  body?: BodyInit | null;
}

function useUpdateData() {

  const { sendRequest } = useApi()
  const dispatch = useAppDispatch()
  // const selectBlock = useAppSelector((store) => store.carsSettings.config.currentSelectBlock)

  const updateDataRequest = async () => {
    const selectBlock = store.getState().carsSettings.config.currentSelectBlock

    let url;
    let options: IRequestOptions;
    let param;

    if (selectBlock?.typeField === 'cars') {
      const car = selectBlock.selectBlockObject as ICarObject
      param = `?car_id=${car.car_id}&car_name=${car.name}&icon=${car.pic}&imei=${car.imei}&alter_imei=${car.alter_imei}`
      url = API_ENDPOINTS.SAVE_CAR + param
      options = {
        method: 'POST',
        // body: JSON.stringify(selectBlock?.selectBlockObject),
      }
      const response = await sendRequest(url, options)

      if (response.data.status === 'Ok') {
        const carData = await response.data.car

        const newData = DataExtractor.createCarDataFromServer(carData[0])

        dispatch(carsSettingsActions.setUpdateCar(newData))
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))

        return carData
      } else {
        console.warn("Error in update new car", response.data.message);
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))
        throw new Error(response.data.message);
      }
    };

    if (selectBlock?.typeField === 'points') {

      const point = selectBlock.selectBlockObject as TPointsData
      param = `?point_id=${point.point_id}&point_name=${point.name}&address=${point.address}&lat=${point.lat}&lng=${point.lng}&radius=${point.radius}`
      url = API_ENDPOINTS.SAVE_POINT + param
      options = {
        method: 'POST',
        // body: JSON.stringify(selectBlock?.selectBlockObject),
      }
      const response = await sendRequest(url, options)

      if (response.data.status === 'Ok') {
        const pointData = await response.data.point
        dispatch(carsSettingsActions.setUpdatePoint(pointData))
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))
        return pointData
      } else {
        console.warn("Error in update new car", response.data.message);
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))
        throw new Error(response.data.message);
      }
    };

    if (selectBlock?.typeField === 'events') {

      const event = selectBlock.selectBlockObject as TEventsDataForServer
      // ?event_id=1&car_id=1&point_id=1&event=IN&time_response_sec=5
      param = `?event_id=${event.event_id}&car_id=${event.car_id}&point_id=${event.point_id}&event=${event.event}&time_response_sec=${event.time_response_sec}`
      url = API_ENDPOINTS.SAVE_EVENT + param
      options = {
        method: 'POST',
        // body: JSON.stringify(selectBlock?.selectBlockObject),
      }
      const response = await sendRequest(url, options)

      if (response.data.status === 'Ok') {
        const eventData = await response.data.event
        dispatch(carsSettingsActions.setUpdateEvent(eventData))
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))
        return eventData
      } else {
        console.warn("Error in update new car", response.data.message);
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))
        throw new Error(response.data.message);
      }
    };

    if (selectBlock?.typeField === 'users') {

      const user = selectBlock.selectBlockObject as TUsers
      // ?event_id=1&car_id=1&point_id=1&event=IN&time_response_sec=5
      param = `?user_id=${user.user_id}&user_email=${user.user_email}&user_role=${user.user_role}`
      url = API_ENDPOINTS.SAVE_USER + param
      options = {
        method: 'POST',
        // body: JSON.stringify(selectBlock?.selectBlockObject),
      }
      const response = await sendRequest(url, options)

      if (response.data.status === 'Ok') {
        const userData = await response.data.user
        dispatch(carsSettingsActions.setUpdateUser(userData))
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))
        return userData
      } else {
        console.warn("Error in update new car", response.data.message);
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))
        throw new Error(response.data.message);
      }
    };


    if (selectBlock?.typeField === 'company-name') {
      const { company_name } = selectBlock.selectBlockObject as TCompName
      param = `?company_name=${company_name}`
      url = API_ENDPOINTS.SAVE_COMPANY_NAME + param
      options = {
        method: 'GET',
      }
      const response = await sendRequest(url, options)

      if (response.data.status === 'Ok') {
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))
        return company_name
      } else {
        console.warn("Error in update new car", response.data.message);
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))
        throw new Error(response.data.message);
      }
    };
  }

  return { updateDataRequest }
}

export default useUpdateData;
