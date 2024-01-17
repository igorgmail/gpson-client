import { useAppSelector } from "../../../store";

function useSelectorEvents() {

  const cars = useAppSelector((store) => store.carsSettings.cars)
  const events = useAppSelector((store) => store.carsSettings.events)
  const points = useAppSelector((store) => store.carsSettings.points)

  const getCarById = (id: string) => {
    return cars.find((el) => el.car_id === id)
  };
  const getCarIdFromEventId = (id: string) => {
    return events.find((el) => el.event_id === id)?.car_id
  };
  const getPointIdFromEventId = (id: string) => {
    return points.find((el) => el.point_id === id)?.point_id
  };
  const getEventFromEventId = (id: string) => {
    return events.find((el) => el.event_id === id)?.event
  };

  return { getCarById, getCarIdFromEventId, getPointIdFromEventId, getEventFromEventId };
}

export default useSelectorEvents;
