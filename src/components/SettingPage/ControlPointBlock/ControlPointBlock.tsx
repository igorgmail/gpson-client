import { useState, useEffect, FC } from "react"

import { Stack } from "@mui/material"

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ControlBlockSmScreen from "./ControlBlockSmScreen";
import ControlBlockLgScreen from "./ControlBlockLgScreen";
import AddPointModal from "./AddPointModal/AddPointModal";

import BlockHeader from "../components/BlockHeader";
import { store, useAppSelector } from "../../../store";


interface IPointDataProps {
  // pointData: TPointsData[]
}
const ControlPointBlock: FC<IPointDataProps> = () => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const pointDataFromStore = useAppSelector((store) => store.carsSettings.points)

  const [pointsData, setPointsData] = useState(pointDataFromStore);

  useEffect(() => {
    setPointsData(store.getState().carsSettings.points)
  }, [pointDataFromStore])

  return (
    <Stack sx={{ whidth: '100%' }}>
      <BlockHeader header={"Контрольные точки"} />
      {!isSmallScreen ? (
        <ControlBlockLgScreen pointData={pointsData} />
      ) : (
          <ControlBlockSmScreen pointData={pointsData} />
      )}
      <AddPointModal />
    </Stack>
  )
}
export default ControlPointBlock