import { ICarObject } from "../../types/carsSettingsTypes"

const makeEventData = (carObject: ICarObject) => {

  type TEventData = {
    event: 'REMOVE_CAR' | 'REMOVE_POINT' | 'REMOVE_EVENT' | 'REMOVE_USER',
    subjectid: string,
    msg: string
  }
  const eventData: TEventData = {
    event: 'REMOVE_CAR',
    subjectid: carObject.car_id,
    msg: `Будет удален автомобиль <br>${carObject.name}`
  }

  return eventData
}

export { makeEventData }