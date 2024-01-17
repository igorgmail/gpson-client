import { FC } from 'react'

import '../styles/style_select.css'
import { useAppSelector } from '../../../store'

type TSelectBlock = {
  eventId?: string,
  modifier: 'CARS' | 'POINTS' | 'EVENTS' | 'MIN' | 'ROLE',
  selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  selectedItem?: string
}

const SelectBlock: FC<TSelectBlock> = ({ selectedItem, modifier, selectChange }) => {

  const allCars = useAppSelector((store) => store.carsSettings.cars)
  const allPoints = useAppSelector((store) => store.carsSettings.points)
  const allTypeEvents = useAppSelector((store) => store.carsSettings.type_of_events)

  const CarsOptions = () => {

    return (
      <>
        <option value="" disabled={selectedItem !== ''} hidden={selectedItem !== ''}>Выберите автомобиль</option>
        {allCars.map((car) => (
          <option
            key={car.car_id}
            value={`${car.car_id}`}
            data-option-name={'event-car'}
          >{car.name}</option>
        ))}
      </>
    );
  }

  const PointsOptions = () => {

    return (
      <>
        <option value="" disabled={selectedItem !== ''} hidden={selectedItem !== ''}>Выберите точку</option>
        {allPoints.map((point) => (
          <option
            key={point.point_id}
            value={`${point.point_id}`}
            // selected={selectedItem === point.point_id}
            data-option-name={'event-point'}
          >{point.name}</option>
        ))}
      </>
    );
  }

  const TypeEventsOptions = () => {

    return (
      <>
        <option value="" disabled={selectedItem !== ''} hidden={selectedItem !== ''}>Выберите событие</option>
        {allTypeEvents.map((typeEv, ind) => (
          <option
            key={ind}
            value={`${typeEv}`}
          // value={selectedItem}
          // selected={selectedItem === typeEv}
            data-option-name={'event-type'}
          >{typeEv}</option>
        ))}
      </>
    );
  }

  const MinSecOptions = () => {

    return (
      <>
        <option key={0}
          value={`sec`}
        // selected
          data-option-name={'option-min'}
        >сек</option>

        <option key={1}
          value={`мин`}
          data-option-name={'option-min'}
        >мин</option>
      </>
    );
  }

  const RoleOptions = () => {

    return (
      <>
        <option key={0}
          value={`user`}
        // selected={selectedItem === 'user'}
          data-option-name={'option-role'}
        >user</option>

        <option key={1}
          value={`admin`}
        // selected={selectedItem === 'admin'}
          data-option-name={'option-role'}
        >admin</option>

      </>
    );
  }


  return (
    <>
      <label className="select all-white-input-style"
      // htmlFor="slct" 
      >
        <select
          onChange={selectChange}
          // id="slct"
          required
          value={selectedItem}
        >
          {/* <option value="" disabled selected>Select option</option> */}
          {modifier === 'CARS' && <CarsOptions></CarsOptions>}
          {modifier === 'POINTS' && <PointsOptions></PointsOptions>}
          {modifier === 'EVENTS' && <TypeEventsOptions></TypeEventsOptions>}
          {modifier === 'MIN' && <MinSecOptions></MinSecOptions>}
          {modifier === 'ROLE' && <RoleOptions></RoleOptions>}
        </select>
        <svg>
          <use xlinkHref="#select-arrow-down"></use>
        </svg>
      </label>

      {/* <!-- SVG Sprites --> */}
      <svg className="sprites">
        <symbol
          id="select-arrow-down"
          viewBox="0 0 10 6">
          <polyline points="1 1 5 5 9 1"></polyline>
        </symbol>
      </svg>
    </>
  )
}

export default SelectBlock