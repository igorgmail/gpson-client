import { useState, useRef, FC } from 'react';
// import { useLocation } from 'react-router-dom';

import { MapContainer, TileLayer, LayersControl} from 'react-leaflet';
import 'leaflet-rotatedmarker';
import L from 'leaflet';
import { Box} from '@mui/material';

import PinMarker from './PinMarker';

import './style.css'


type TMapProps = {
  // setCoord: (coord: Tcoord) => void
  // handleSaveButton: (coord: Tcoord) => void
}
const Map: FC<TMapProps> = () => {

  const [tileId, setTileId] = useState('tileId-1')
  const mapRef = useRef<L.Map | null>(null)

  const tileCheckHandler = (id: string) => {
    setTileId(id)
  }


  return (
    <Box display="flex" width="100%" height={'100%'}>

      <MapContainer
        ref={mapRef}
        // whenReady={() => { console.log("MAP READY") }}
        zoomSnap={0.5}
        zoomDelta={0.5}
        // bounds={[[54.8936466, 28.795824667646446], [53.943055, 27.4350899]]}
        // boundsOptions={{ padding: [50, 50] }}
        // bounds={[[53.943055, 27.4350899], [54.8936466, 27.5305566], [54.2314030446825, 28.795824667646446], [54.786238, 32.006855]]}
        center={[53.895954, 27.554796]}
        zoom={12}
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <ZoomControl position="topleft" /> */}
        {/* <CustomZoom /> */}
        <LayersControl position="topright">
          <LayersControl.Overlay name="Osm map" checked={tileId === 'tileId-1'}>
            <TileLayer
              id={'tileId-1'}
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
              eventHandlers={{
                add: (e) => {
                  tileCheckHandler(e.target.options.id)
                },
                remove: (e) => {
                  // console.log("Removed layer:", e.target.id);
                }
              }}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Google map" checked={tileId === 'tileId-2'}>
            <TileLayer
              id={'tileId-2'}
              url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              eventHandlers={{
                add: (e) => {
                  tileCheckHandler(e.target.options.id)
                },
              }}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Спутник" checked={tileId === 'tileId-3'}>
            <TileLayer
              id={'tileId-3'}
              url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              eventHandlers={{
                add: (e) => {
                  tileCheckHandler(e.target.options.id)
                },
              }}
            />
          </LayersControl.Overlay>
        </LayersControl>

        <PinMarker></PinMarker>

      </MapContainer>

    </Box>
  )
}
export default Map