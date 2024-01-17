import React, { FC, useEffect, useState } from "react";

import { Stack, Grid, Typography } from "@mui/material";

import { TEventForDialog, TEventFromDialog, TEventsData, TSelectedFieldChanged } from "../types/carsSettingsTypes";

import SelectBlock from "../components/SelectBlock";

import { useAppSelector, useAppDispatch, carsSettingsActions } from "../../../store";
import RemoveDialog from "../components/RemoveDialog";
import useBackDrop from "../hooks/useBackdrop";
import useRemoveDialog from "../hooks/useRemoveDialog";

import useStartUpdate from "../hooks/useStartUpdate";
import useHandleInput from "../hooks/useHandleInputEvents";




interface IEventBlockProps {
  oneEvent: TEventsData,
}

const SmFieldEvent: FC<IEventBlockProps> = ({ oneEvent }) => {

  const [eventId, setEventId] = useState<string>(oneEvent.event_id)
  const [eventCarId, setEventCarId] = useState(oneEvent.car_id)
  const [eventPointId, setEventPointId] = useState(oneEvent.point_id)
  const [eventType, setEventType] = useState(oneEvent.event) // <'IN' | 'OUT'>
  const [eventTimeSec, setEventTimeSec] = useState(oneEvent.time_response_sec)
  const [timeVariant, setTimeVariant] = useState('сек')

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { startUpdate } = useStartUpdate()
  const { handleInputClickSM, handleKeyUpSM } = useHandleInput()
  const { sendRemove } = useRemoveDialog()

  const dispatch = useAppDispatch()

  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const handleDialog = (eventData: TEventFromDialog) => {
    startBackDrop()
    sendRemove(eventData)
      .then((data) => {
        if (data?.data) {
          const id = data.data
          dispatch(carsSettingsActions.setRemoveEvent(id))
          stopBackDrop()
        } else {
          console.info("При удалении События с сервера пришли некорректные данные");

        }
      }).catch((err) => {
        console.warn("ERROR, Ошибка при удалении События", err);
      }).finally(() => stopBackDrop())
  }

  const makeEventData = (event: TEventsData) => {
    const eventData: TEventForDialog = {
      event: 'REMOVE_EVENT',
      subjectid: event.event_id,
      msg: `Будет удалено событие <br> Id события - ${event.event_id}`
    }

    return eventData
  }

  const eventObject: TSelectedFieldChanged = {
    typeField: 'events',
    selectBlockObject: {
      event_id: eventId,
      car_id: eventCarId,
      point_id: eventPointId,
      event: eventType,
      time_response_sec: eventTimeSec

    }
  }


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const target = e.target as HTMLSelectElement

    const objectIndex = target.value
    // console.log("Индекс объекта", objectIndex);

    const selectedIndex = target.options.selectedIndex;
    // console.log("Порядковый номер", selectedIndex);

    // const selectedText = target.options[selectedIndex].text;
    // console.log("Техт объекта:", selectedText);

    const selectedOption = target.options[selectedIndex];
    const selectedData = selectedOption.dataset.optionName;

    if (selectedData === 'event-car') {
      setEventCarId(String(objectIndex))
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, car_id: objectIndex } }))
      startUpdate()
    }
    if (selectedData === 'event-point') {
      setEventPointId(objectIndex)
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, point_id: objectIndex } }))
      startUpdate()
    }
    if (selectedData === 'event-type') {
      setEventType(objectIndex)
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, event: objectIndex } }))
      startUpdate()
    }
  }

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^\d*$/.test(e.target.value)) return
    const time = e.target.value
    if (time.length < 6) {
      setEventTimeSec(time)
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, time_response_sec: time } }))
    }
  }

  useEffect(() => {
    setEventId(oneEvent.event_id)
    setEventCarId(oneEvent.car_id)
    setEventPointId(oneEvent.point_id)
    setEventType(oneEvent.event)
    setEventTimeSec(oneEvent.time_response_sec)
  }, [oneEvent])

  return (
    <>
      <form>
      <Grid
        key={`events-block-` + oneEvent.event_id}
        container alignItems="center" justifyContent="center"
        sx={{
          backgroundColor: 'white',
          marginTop: '2rem',
          borderRadius: '10px'
        }}>

        {/* Block - 1 */}
        <Grid item xs={6}>
          <Stack sx={{ backgroundColor: '#078c75', color: 'white', borderTopLeftRadius: '10px', }}>
            <Typography align="center">Автомобиль</Typography>
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack sx={{ backgroundColor: '#078c75', color: 'white', borderTopRightRadius: '10px', }}>
            <Typography align="center">Точка</Typography>
          </Stack>
        </Grid>

        {/* Avto */}
        <Grid item xs={6}>
          <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>
            <RemoveDialog callback={handleDialog}
              eventData={makeEventData(oneEvent)} />
            <SelectBlock selectedItem={eventCarId} eventId={oneEvent.event_id} modifier={'CARS'} selectChange={handleSelectChange} />
          </Stack>
        </Grid>

        {/* Point */}
        <Grid item xs={6}>
          <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <SelectBlock selectedItem={eventPointId} eventId={oneEvent.event_id} modifier={'POINTS'} selectChange={handleSelectChange} />
          </Stack>
        </Grid>

        {/* Block - 2 */}
        <Grid item xs={6}>
          <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
            <Typography align="center">Событие</Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
            <Typography align="center">Ожидание</Typography>
          </Stack>
        </Grid>

        {/* Event */}
        <Grid item xs={6}>
          <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}
          // sx={{ padding: '8px' }}
          >
            <SelectBlock selectedItem={eventType} eventId={oneEvent.event_id} modifier={'EVENTS'} selectChange={handleSelectChange} />
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack margin={'auto'} display={'flex'} alignItems={'center'}>
            <input
              data-option-name={'event-time'}

              onClick={handleInputClickSM}
              onChange={handleTimeInputChange}
              onKeyUp={handleKeyUpSM}
              onTouchStart={(e) => e.currentTarget.removeAttribute('readonly')}

              className={chooseInputFromStore === `id${oneEvent.event_id}-event` ? "all-white-input--choose-style" : "all-white-input-style"}
              style={{
                width: '100%',
                textAlign: 'right',
              }}
              readOnly
              // readOnly={chooseInputFromStore !== `id${oneEvent.event_id}-event`}
              value={`${eventTimeSec}`}
              data-forstore={`id${oneEvent.event_id}-event`}
              data-interactive
              autoComplete="off"
                type="text"
                inputMode="numeric" pattern="\d*"
                enterKeyHint="done"
            />
          </Stack>
        </Grid>
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Stack margin={'auto'} display={'flex'} alignItems={'end'}>
            <input
              className={"all-white-input--second"}
              style={{
                width: '100%',
                textAlign: 'center',
              }}
              type="text"
              disabled
              value={timeVariant}
            />
          </Stack>
        </Grid>

        {/* End Block */}
        <Grid item xs={12}>
          <Stack sx={{
            backgroundColor: '#bfbfbf',
            color: 'white',
            borderBottomRightRadius: '10px',
            borderBottomLeftRadius: '10px',
            height: '1.5rem',

          }}>
          </Stack>

        </Grid>
      </Grid>
      </form>
      {BackDropComponent}
    </>
  )
}
export default SmFieldEvent