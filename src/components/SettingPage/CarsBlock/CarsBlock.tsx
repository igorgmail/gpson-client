import { FC, useEffect, useState } from "react"

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Stack } from "@mui/material"

import { useAppSelector, store } from "../../../store";

import BlockHeader from "../components/BlockHeader";
import CarsSmallScreen from "./CarsSmallScreen";
import CarsLargeScreen from "./CarsLargeScreen";
import AddCarModal from "./AddCarModal/AddCarModal";
import isHasToushScreen from "../utils/isMobile";

type TCarsBlockProps = {

}

const CarsBlock: FC<TCarsBlockProps> = () => {

  const dataFromStore = useAppSelector((store) => store.carsSettings.cars);
  const [carsData, setCarsData] = useState(dataFromStore);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setCarsData(store.getState().carsSettings.cars)
  }, [dataFromStore])

  return (
    <Stack sx={{ whidth: '100%' }}>

      <BlockHeader header={'Автомобили'} />

      {/* {!isHasToushScreen() ? ( */}
      {!isSmallScreen ? (

        <CarsLargeScreen carsData={carsData} />
      ) : (
          <CarsSmallScreen carsData={carsData} />

      )}

      <AddCarModal />
    </Stack>
  )
}

export default CarsBlock




