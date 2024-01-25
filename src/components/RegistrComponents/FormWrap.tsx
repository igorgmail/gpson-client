import { FC, ReactNode } from "react"
import { Box, Stack } from "@mui/material"

import GpsonImage from "./Components/GpsonImage"

interface IFormWrapProps {
  children: ReactNode
}

const FormWrap: FC<IFormWrapProps> = ({ children }) => {

  return (
    <Box position="relative" flexDirection="row" height="100svh" width="100%"
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Stack
        sx={{
          width: ['80%', '50%', '40%', '30%']
        }}
        display={'flex'} flexDirection={'column'} gap={'6px'}>
        <GpsonImage key={'gpson-image-key'}></GpsonImage>
        {children}
      </Stack>
    </Box>
  )
}

export default FormWrap