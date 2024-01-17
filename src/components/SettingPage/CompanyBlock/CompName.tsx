import { useState, useEffect } from "react"

import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";

import { Box, Stack, useMediaQuery, useTheme } from "@mui/material"
// Icon

import { TSelectedFieldChanged } from "../types/carsSettingsTypes";
import React from "react";
import useHandleInput from "../hooks/useHandleInputEvents";


const CompName = () => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { handleInputClickLG, handleInputClickSM, handleKeyDownLG, handleKeyUpSM } = useHandleInput()


  const dispatch = useAppDispatch()

  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const companyName = useAppSelector((store) => store.carsSettings.company.name)

  const [compName, setCompName] = useState(companyName)

  const eventObject: TSelectedFieldChanged = {
    typeField: 'company-name',
    selectBlockObject: {
      company_name: compName,
    }
  }

  const handleCompNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setCompName(name)
    dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, company_name: name } }))
  }

  const inputField = !isSmallScreen ? (
    <input
      onChange={(e) => handleCompNameInputChange(e)}
      onClick={handleInputClickLG}
      onKeyDown={handleKeyDownLG}

      name={'company-name'}
      className={chooseInputFromStore !== `company-name-field` ? "company-block--dis-input company-name--dis" : 'company-block--name-active-input'}
      style={{
        width: `calc(${compName.length}ch + 32px)`
      }}
      type="text"
      readOnly={chooseInputFromStore !== `company-name-field`}
      value={compName}
      data-forstore={`company-name-field`}
      data-interactive>
    </input>
  ) : (
    <input
      onChange={(e) => handleCompNameInputChange(e)}
      onClick={handleInputClickSM}
      onKeyUp={handleKeyUpSM}

      name={'company-name'}
      className={chooseInputFromStore !== `company-name-field` ? "company-block--dis-input" : 'company-block--name-active-input'}
      style={{
        width: `calc(${compName.length}ch + 32px)`
      }}
      readOnly

        value={compName}
        data-forstore={`company-name-field`}
        data-interactive

        autoComplete="off"
        type="text"
        enterKeyHint="done"
      >

      </input>
    )

  useEffect(() => {
    setCompName(companyName)
  }, [companyName])

  return (
    <>

      <Stack display={'flex'}
        flexDirection={'column'}
      >
        <Stack display={'flex'} flexDirection={'row'} gap={'1rem'}>
          {inputField}
      </Stack>
      <Stack>
        <Box>Имя Компании</Box>
      </Stack>
      </Stack>
    </>

  )
}

export default CompName