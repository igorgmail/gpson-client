import React, { useState,  FC } from "react"

import {  Stack, Grid, Button } from "@mui/material"
import { LatLng } from "leaflet";

import MapModalMain from "../MapModal/MapModalMain";
import { carsSettingsActions, useAppDispatch } from "../../../../store";

type TPointData = {
  point_name: string,
  address: string | undefined,
  lat: number | null,
  lng: number | null,
  radius: string
}

type TAddPointForm = {
  handleClose: () => void,
  handleFormSubmit: (pointData: TPointData) => void
}


const AddPointForm: FC<TAddPointForm> = ({ handleClose, handleFormSubmit }) => {
  
  const dispatch = useAppDispatch()

  const [pointName, setPointName] = useState('')
  const [address, setAddress] = useState<string | undefined>('')
  const [lat, setLat] = useState<number | null>(null)
  const [lng, setLng] = useState<number | null>(null)
  const [radius, setRadius] = useState('');

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return
    if (Number(e.target.value) >= 0 && Number(e.target.value) <= 1000) {
      setRadius(value)
    }
  };

  const handleSaveModal = (coord: LatLng, addressValue: string | undefined) => {
    const { lat, lng } = coord
    setLat(Number(lat.toFixed(7)))
    setLng(Number(lng.toFixed(7)))
    setAddress(addressValue)
  }

  const clearState = () => {
    setPointName('')
    setAddress('')
    setLat(null)
    setLng(null)
    setRadius('')
  }
  const handleAddPointSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pointData = {
      point_name: pointName,
      address: address,
      lat: lat,
      lng: lng,
      radius: radius
    }
    handleFormSubmit(pointData)
  }

  const handleCancelButton = () => {
    clearState()
    if (lat || lng) dispatch(carsSettingsActions.setMapCenter(null))
    handleClose()
  }


  return (
    <Stack>

      <form onSubmit={handleAddPointSubmit} >
        <Grid container
          rowSpacing={1}
        >
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >
              <label htmlFor="pointNameInput">Имя</label>
            </Stack>
          </Grid>

          {/* Point Name */}
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => setPointName(e.target.value)}
                id="pointNameInput"
                placeholder="имя точки"
                className="modal-input"
                value={pointName}
                required
                autoComplete="off"
              />
            </Stack>
          </Grid>


          {/* Address*/}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >
              <label htmlFor="pointAddressInput">Адрес</label>
            </Stack>
          </Grid>

          <Grid item xs={9}>
            <Stack display={'flex'}>
              <MapModalMain handleSaveModal={handleSaveModal}></MapModalMain>
            </Stack>
          </Grid>

          {/* Point Lat */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >
              <label htmlFor="pointLatInput">Широта</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                id="pointLatInput"
                placeholder="--.--"
                className="modal-input"
                type="number"
                value={String(lat)}
                required
                disabled
                autoComplete="off"
              />
            </Stack>
          </Grid>

          {/* Point Lng */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >
              <label htmlFor="pointLngInput">Долгота</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                id="pointLngInput"
                placeholder="--.--"
                className="modal-input"
                type="number"
                value={String(lng)}
                required
                disabled
                autoComplete="off"
              />
            </Stack>
          </Grid>

          {/*Radius*/}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >
              <label htmlFor="pointRadiusInput">Радиус</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => handleRadiusChange(e)}
                id="pointRadiusInput"
                placeholder="радиус"
                className="modal-input"
                value={radius}
                required
                type="text" inputMode="numeric" pattern="\d*"
                min='0'
                max='1000'
                autoComplete="off"
              />
            </Stack>
          </Grid>

        </Grid>

        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'2rem'}
          sx={{ marginTop: '1rem' }}
        >
          <Button type="submit">Сохранить</Button>
          <Button onClick={handleCancelButton}>Отмена</Button>
        </Stack>
      </form>

    </Stack>
  );
}
export default AddPointForm