import { FC } from "react"

import { Box } from "@mui/material"
import { TPointsData } from "../types/carsSettingsTypes";

import SmFieldPoints from "./SmFieldPoints";

interface IPointDataProps {
  pointData: TPointsData[]
}

const ControlBlockSmScreen: FC<IPointDataProps> = ({ pointData }) => {

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>

      {pointData.map((point) => (
        <SmFieldPoints onePoint={point} key={`point-${point.point_id}`} />
      ))
      }

    </Box >
  )
}

export default ControlBlockSmScreen