import React, { useState, FC } from "react"

import { Stack, Grid, Button } from "@mui/material"
import SelectBlock from "../../components/SelectBlock";

import { useAppSelector } from "../../../../store";

import { TEventsData } from "../../types/carsSettingsTypes";


type TAddEventForm = {
  handleClose: () => void,
  handleFormSubmit: (eventData: Omit<TEventsData, 'event_id'>) => void
}

const EventModalForm: FC<TAddEventForm> = ({ handleClose, handleFormSubmit }) => {

  const [eventCarId, setEventCarId] = useState<string>('')
  const [eventPointId, setEventPointId] = useState('')
  const [eventType, setEventType] = useState('')
  const [eventWait, setEventWait] = useState('')
  const [eventWaitType, setEventWaitType] = useState<'сек' | 'мин'>('сек');

  const companyId = useAppSelector((store) => store.carsSettings.company.company_id)

  const handlerEventWait = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value
    if (!/^\d*$/.test(num)) return
    if (num.length <= 4 && num.length >= 0) {
      setEventWait(num)
    }
  }

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const objectIndex = e.target.value
    // console.log("Индекс объекта", objectIndex);
    const selectedIndex = e.target.options.selectedIndex;
    // console.log("Порядковый номер", selectedIndex);
    const selectedText = e.target.options[selectedIndex].text;
    // console.log("Техт объекта:", selectedText);
    const selectedOption = e.target.options[selectedIndex];
    const selectedData = selectedOption.dataset.optionName;

    if (selectedData === 'event-car') {
      setEventCarId(String(objectIndex))
    }
    if (selectedData === 'event-point') {
      setEventPointId(objectIndex)
    }
    if (selectedData === 'event-type') {
      setEventType(selectedText)
    }
    if (selectedData === 'option-min') {
      if (objectIndex === 'сек' || objectIndex === 'мин') {
        setEventWaitType(objectIndex)
      }
    }
  }

  const clearState = () => {
    // Очистка формы
    setEventCarId('')
    setEventPointId('')
    setEventType('')
    setEventWait('')
    setEventWaitType('сек')
  }

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const countTimeWait = (time: string) => {
      if (eventWaitType === 'мин') {
        return String(Number(time) * 60)
      }
      return time
    }

    const eventData = {
      company_id: companyId,
      car_id: eventCarId,
      point_id: eventPointId,
      event: eventType,
      time_response_sec: countTimeWait(eventWait)
    }

    handleFormSubmit(eventData)
    clearState()
  }

  const handleCancelButton = () => {
    clearState()
    handleClose()
  }

  return (
    <Stack>
      <form onSubmit={handleAddEventSubmit}>
        <Grid container
          rowSpacing={1}

        >
          {/* Автомобиль */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label>Автомобиль</label>
            </Stack>
          </Grid>

          <Grid item xs={9}>
            <Stack display={'flex'}>
              <SelectBlock selectedItem={eventCarId} modifier={'CARS'} selectChange={selectChange} />
            </Stack>
          </Grid>

          {/* Точка */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label>Точка</label>
            </Stack>
          </Grid>

          <Grid item xs={9}>
            <Stack display={'flex'}>
              <SelectBlock selectedItem={eventPointId} modifier={'POINTS'} selectChange={selectChange} />
            </Stack>
          </Grid>

          {/* Событие */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label>Событие</label>
            </Stack>
          </Grid>

          <Grid item xs={9}>
            <Stack display={'flex'}>
              <SelectBlock selectedItem={eventType} modifier={'EVENTS'} selectChange={selectChange} />
            </Stack>
          </Grid>

          {/* Ожидание */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label>Ожидание</label>
            </Stack>
          </Grid>

          <Grid item xs={3} display={'flex'} alignItems={'center'}>
            <Stack display={'flex'} sx={{ pl: '8px' }}>
              <input
                onChange={(e) => handlerEventWait(e)}
                // readOnly={true}
                className="modal-input"
                style={{ width: '100%' }}
                value={eventWait || ''}
                type="text" inputMode="numeric" pattern="\d*"
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={2}>
            {/* empty */}
          </Grid>

          {/* MIN SEC */}
          <Grid item xs={4}>
            <Stack display={'flex'} sx={{ pl: '8px' }}>
              <SelectBlock modifier={'MIN'} selectedItem={eventWaitType} selectChange={selectChange} />
            </Stack>
          </Grid>
        </Grid>

        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'2rem'}
          sx={{ marginTop: '1rem' }}
        >
          <Button type="submit">Добавить</Button>
          <Button onClick={handleCancelButton}>Отмена</Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default EventModalForm