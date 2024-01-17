import { FC, useEffect, useState } from "react"

import { Divider, Grid, Stack, useMediaQuery, useTheme } from "@mui/material"

import { TEventForDialog, TEventFromDialog, TSelectedFieldChanged, TUsers } from "../types/carsSettingsTypes"
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";

import useBackDrop from "../hooks/useBackdrop";
import useRemoveDialog from "../hooks/useRemoveDialog";
import useAlert from "../hooks/useAlert";
import useStartUpdate from "../hooks/useStartUpdate";

import RemoveDialog from "../components/RemoveDialog"
import SelectBlock from "../components/SelectBlock";
import useHandleInput from "../hooks/useHandleInputEvents";

interface IUserFieldProps {
  oneUser: TUsers,
}

const UserField: FC<IUserFieldProps> = ({ oneUser }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const [userId, setUserId] = useState(oneUser.user_id)
  const [userEmail, setUserEmail] = useState(oneUser.user_email)
  const [userRole, setUserRole] = useState(oneUser.user_role)

  const dispatch = useAppDispatch()

  const { startUpdate } = useStartUpdate()
  const { handleInputClickLG, handleInputClickSM, handleKeyDownLG, handleKeyUpSM } = useHandleInput()

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()
  const { sendRemove } = useRemoveDialog()

  const handleDialog = (eventData: TEventFromDialog) => {
    startBackDrop()
    sendRemove(eventData)
      .then((data) => {

        if (data?.data) {
          const id = data.data
          dispatch(carsSettingsActions.setRemoveUser(id))
          stopBackDrop()
        } else {
          console.info(data?.error);
          console.info("Или при удалении Пользователя с сервера пришли некорректные данные");
          showAlert('Не удалось удалить Пользователя', 'error')

        }
      }).catch((err) => {
        console.warn("ERROR, Ошибка при удалении Пользователя", err);
      }).finally(() => stopBackDrop())
  }

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const objectIndex = e.target.value
    // console.log("Индекс объекта", objectIndex);
    const selectedIndex = e.target.options.selectedIndex;
    // console.log("Порядковый номер", selectedIndex);
    const selectedOption = e.target.options[selectedIndex];
    const selectedData = selectedOption.dataset.optionName;

    if (selectedData === 'option-role') {
      setUserRole(objectIndex)
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, user_role: objectIndex } }))
      startUpdate()
    }
  }

  const eventObject: TSelectedFieldChanged = {
    typeField: 'users',
    selectBlockObject: {
      user_id: userId,
      user_email: userEmail,
      user_role: userRole,
    }
  }

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setUserEmail(email)
    dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, user_email: email } }))
  }

  const makeEventData = (eventObject: any) => {

    const eventData: TEventForDialog = {
      event: 'REMOVE_USER',
      subjectid: eventObject.user_id,
      msg: `Будет удален пользователь <br>${eventObject.user_email}`
    }

    return eventData
  }

  const inputField =
    !isSmallScreen ? (
      <input
        onClick={handleInputClickLG}
        onChange={handleEmailInputChange}
        onKeyDown={handleKeyDownLG}

        readOnly={chooseInputFromStore !== `id${oneUser.user_id}-email`}
        className={chooseInputFromStore === `id${oneUser.user_id}-email` ? "all-white-input--choose-style" : "all-white-input-style"}
        style={{
          width: `100%`,
          textAlign: 'left',
          // width: `calc(${oneUser.user_email.length}ch + 30px)`,
        }}
        value={userEmail}
        data-forstore={`id${oneUser.user_id}-email`}
        data-interactive
      />
    ) : (
        <input
        onChange={handleEmailInputChange}
          onClick={handleInputClickSM}
        onKeyUp={handleKeyUpSM}
        onTouchStart={(e) => e.currentTarget.removeAttribute('readonly')}

        readOnly
        // readOnly={chooseInputFromStore !== `id${oneUser.user_id}-email`}
        className={chooseInputFromStore === `id${oneUser.user_id}-email` ? "all-white-input--choose-style" : "all-white-input-style"}
        style={{
          width: `100%`,
          textAlign: 'left',
          // width: `calc(${oneUser.user_email.length}ch + 30px)`,
          // margin: 'auto'
        }}
        value={userEmail}
        data-forstore={`id${oneUser.user_id}-email`}
        data-interactive
          autoComplete="off"
          type="text"
          enterKeyHint="done"
      />
    )

  useEffect(() => {
    setUserId(oneUser.user_id)
    setUserEmail(oneUser.user_email)
    setUserRole(oneUser.user_role)
  }, [oneUser])

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
      <Grid
        key={`user-block-` + oneUser.user_id}
        container
        sx={{
          backgroundColor: 'white',
          paddingLeft: '.8rem'
        }}
      >
        {/* Email */}
        <Grid item xs={6} display={'flex'} justifyContent={'flex-start'}>
          <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

            {/* Remove Button */}
            <RemoveDialog
              callback={handleDialog}
              eventData={makeEventData(oneUser)}
            />
            {inputField}

          </Stack>
        </Grid>

        {/* Role */}
        <Grid item xs={6} display={'flex'} justifyContent={'center'}>
          <SelectBlock selectedItem={userRole} modifier={'ROLE'} selectChange={selectChange} />
        </Grid>

        <Divider />
      </Grid>
      </form>
      {BackDropComponent}
      {alertComponent}
    </>
  )
}

export default UserField