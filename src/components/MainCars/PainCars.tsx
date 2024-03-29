import { useState, useEffect, useMemo, FC } from 'react';
import { DateTime } from "luxon";

import { Pane, useMap } from 'react-leaflet';
import 'leaflet-rotatedmarker';
import L from 'leaflet';

import { useAppDispatch, useAppSelector, carsMapActions } from '../../store';
import getCarsFetch from './lib/fetchGetCars';
import isHasToushScreen from './lib/isMobile';
import carsPageconfig from './lib/config';
import zoomOutHandler from './lib/zoomOut';
import sanitizeCompanyFetch from './lib/sanitizeCompanyFetch';

import { ICarObject, ICompanyData, ICompanyName, TDataAboutCarForHistoryMenu } from '../../types/carsTypes';

import MarkerCar from './MarkerCar';
import CarsLayerControl from '../MenuCars/CarsLayerControl';
import { Spinner } from '../HistoryComponents/IconComponent/Spinner';

type IPainCars = L.LatLngBoundsExpression | [][] | any

const PainCars: FC<IPainCars> = ({ mapBounds, carsDataStart }) => {
  // mapBounds - массив массивов координат для определения расположения видимой карты
  // carsDataStart - массив объектов с данными cars для первого рендере

  const dispatch = useAppDispatch()
  const carsFilterObject = useAppSelector((state) => state.carsMap.carsFilter);

  const [companyData, setCompanyData] = useState<ICompanyData>(carsDataStart)
  const [markerDataLoad, setMarkerDataLoad] = useState<boolean>(false)
  const parc_id = useAppSelector((state) => state.carsMap.companyName?.company_id)

  const isMobile = useMemo(() => isHasToushScreen(), [])// mobile -> true ? PC -> false
  const map = useMap();

  // Формируем массив для передачи в Marker перед фильтром
  // Обновляется каждую секунду
  const dataCarsForMarrkers = [...companyData?.cars]
  // const dataCarsForMarrkers = setCompanyData((curr) => curr)?.cars// [...companyData?.cars]

  // Данные для меню - Названии коипании и Id
  // Стабильны обновляются только при обновлении карты
  const menuHeaderData: ICompanyName = useMemo(() => ({
    company_name: companyData.company_name,
    company_id: companyData.company_id
  }), [])

  // Формируем массив обьектов для передачи в MenuItem
  const getdataForMenuItem = (company: ICompanyData) => {

    const dataCarsForMenuItems = company.cars.map((car: ICarObject) => ({
      car_id: String(car.car_id),
      car_name: car.car_name,
      checked: true,
      disconnect: false,
    })
    )
    return dataCarsForMenuItems;
  };


  // Фильтр для передачи в Marker (принимает маасив объектов Cars и возвращает все где checked true)
  const filterForMarkers = dataCarsForMarrkers.filter((el: ICarObject) => {
    if (carsFilterObject && carsFilterObject[Number(el.car_id)] === true) return el
  })

  const makeFilterObject = (carsData: any) => {
    const dataObj: any = {}
    carsData.forEach((el: any) => {
      dataObj[el.car_id] = true

    })
    return dataObj
  }

  // Данные для меню 
  const dataForMenuItem = useMemo(() => getdataForMenuItem(companyData), [carsDataStart])

  // Данные авто для HistoryMenu
  // Создаем объект с данными об авто для передачи в HistoryMenu
  const getDataAboutCarForHistory = (carObject: ICarObject) => {
    const dataAboutCar: TDataAboutCarForHistoryMenu = {
      company_id: companyData.company_id,
      company_name: companyData.company_name || 'noname',
      car_id: carObject.car_id,
      car_name: carObject.car_name,
      // полночь по местному
      dataFromIso: DateTime.local().startOf('day').toISO()?.slice(0, 16) || '',
      // местное время
      dataToIso: DateTime.local().toISO()?.slice(0, 16) || '',
      // местное смещение часовогот пояса в минутах
      localOffset: carsPageconfig.defaultTimeLocaloffset,
    }

    return dataAboutCar
  }

  // Получение данных с сервера
  useEffect(() => {
    const abortController = new AbortController();

    const callback = markerDataLoad ? () => {
      getCarsFetch(parc_id || '1', abortController)
        .then(data => {
          const companyData = sanitizeCompanyFetch(data)
          setCompanyData(companyData)
        })
    } : () => { };

    const interval = setInterval(callback, carsPageconfig.updateDelay);

    return () => {
      clearInterval(interval)
      // abortController.abort();
    };
  }, [mapBounds, markerDataLoad]);

  useEffect(() => {
    dispatch(carsMapActions.setCompanyName(menuHeaderData))
    dispatch(carsMapActions.setCarsDataForMenu(dataForMenuItem))
    dispatch(carsMapActions.setCarsFilterMarkers(makeFilterObject(carsDataStart.cars)))
    setMarkerDataLoad(true)
  }, [carsDataStart, dispatch])


  // Смещение карты при первой загрузке на велечину тултипа
  useEffect(() => {
    map.whenReady(() => {
      // if (isMobile)
      // map.zoomOut()
      try {
        map.fitBounds(mapBounds)
        zoomOutHandler(map)
      } catch (error) {
        console.warn("Ошибка В PainCars map.fitBounds-->", error);

      }

      // const zoomOut: HTMLButtonElement | null = document.querySelector('.leaflet-control-zoom-out')
    })

    return () => {
      const menuElement = document.querySelector('[data-control="cars-menu"]')?.closest('.leaflet-control');
      menuElement?.remove()
    }
  }, []);

  return (
    <div>

      <CarsLayerControl key={menuHeaderData.company_id} />
      {!markerDataLoad && <Spinner />}
      <Pane name="carsMapPane" style={{ zIndex: 500, width: '100vh', }}>
        {companyData && filterForMarkers.map((el: any) => (<MarkerCar
            car={el}
          // setMarkerDataLoad={setMarkerDataLoad}
            dataForHistory={getDataAboutCarForHistory(el)}
            // key={`${el.car_id}-${el.last_track}`} />
            key={`${el.car_id}-${el.last_track}-${carsFilterObject?.[el.car_id]}`} />
        )
        )}
      </Pane>

      <Pane name="historyIconTooltipsPane" style={{ zIndex: 700, width: '100vh', }}>
      </Pane>
    </div>
  )
}

export default PainCars;