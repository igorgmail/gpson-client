import { useState, useEffect } from "react"

import { Stack } from "@mui/material"

import EventLgBlock from "./EventLgBlock";
import EventSmBlock from "./EventSmBlock";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlockHeader from "../components/BlockHeader";
import { useAppSelector, store } from "../../../store";
import AddEventModal from "./AddModal/AddEventModal";


const EventBlock = () => {

  const eventsFromStore = useAppSelector((store) => store.carsSettings.events)

  const [eventsData, setEventsData] = useState(eventsFromStore)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    setEventsData(store.getState().carsSettings.events)
  }, [eventsFromStore])

  return (
    <Stack sx={{ whidth: '100%' }}>
      <BlockHeader header={"События"} />
      {!isSmallScreen ? (
        <EventLgBlock eventsData={eventsData} />
      ) : (
          <EventSmBlock eventsData={eventsData} />
      )}
      <AddEventModal />
    </Stack>
  )
}

export default EventBlock