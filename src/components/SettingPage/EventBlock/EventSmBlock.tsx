import { FC } from "react"

import { Box } from "@mui/material"


import { TEventsData } from "../types/carsSettingsTypes";

import SmFieldEvent from "./SmFieldEvent";


interface IEventBlockProps {
  eventsData: TEventsData[],
}

const EventSmBlock: FC<IEventBlockProps> = ({ eventsData }) => {

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>

      {eventsData.map((oneEvent) => (

        <SmFieldEvent oneEvent={oneEvent} key={`eventblock-${oneEvent.event_id}`} />
      ))
      }

    </Box >
  )
}

export default EventSmBlock