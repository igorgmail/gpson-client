import { useState, useEffect } from "react"

import { Stack } from "@mui/material"

import BlockHeader from "../components/BlockHeader";
import UserWrapFields from "./UserWrapFields";
import AddUserModal from "./AddModal/AddUserModal";
import { useAppSelector, store } from "../../../store";


const UserBlock = () => {

  const usersFromStore = useAppSelector((store) => store.carsSettings.users)

  const [userData, setUserData] = useState(usersFromStore)

  useEffect(() => {
    setUserData(store.getState().carsSettings.users)
  }, [usersFromStore])


  return (
    <Stack sx={{ whidth: '100%' }}>
      <BlockHeader header={"Пользователи"} />

      <UserWrapFields usersData={userData}></UserWrapFields>

      <AddUserModal />
    </Stack>
  )
}

export default UserBlock
