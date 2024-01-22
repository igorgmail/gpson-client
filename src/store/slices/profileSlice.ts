import { PayloadAction, createSlice } from '@reduxjs/toolkit';


type Company = {
  company_id: string;
  name: string
}

// type TUserData = {
//   companies: Company[] | null;
//   user_id?: string,
//   company_page_id : string,
// }

interface IInitProfileStore {
  companies: Company[] | null;
  company_page_id: string | null
}


const initialState: IInitProfileStore = {
  companies: null,
  company_page_id: '1'
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
    addNewCompany: (state, action: PayloadAction<Company>) => {
      state.companies = state.companies ? [...state.companies, action.payload] : [action.payload];
    },
    setCompanyPageId: (state, action: PayloadAction<string>) => {
      state.company_page_id = action.payload
    },
  },
}
)

export const { actions: profileStoreActions, reducer: profileStoreReducer } = profileSlice;
