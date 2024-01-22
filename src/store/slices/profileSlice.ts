import { PayloadAction, createSlice } from '@reduxjs/toolkit';


type Company = {
  company_id: string;
  name: string
}

type TUserData = {
  companies: Company[] | null;
  user_id?: string
}

interface IInitProfileStore {
  companies: Company[] | null;
}


const initialState: IInitProfileStore = {
  companies: null,
}

export const profileSlice = createSlice({
  name: 'profileStore',
  initialState: initialState,
  reducers: {

    setUserDataFromServer: (state, action: PayloadAction<IInitProfileStore>) => {
      state.companies = action.payload.companies
    },
    removeCompanyFromStore: (state, action: PayloadAction<string>) => {
      state.companies = state.companies?.filter((el) => el.company_id !== action.payload) || null
    },


  },
}
)

export const { actions: profileStoreActions, reducer: profileStoreReducer } = profileSlice;
