import { PayloadAction, createSlice } from '@reduxjs/toolkit';
const username = process.env.REACT_APP_API_USER_NAME;
const password = process.env.REACT_APP_API_USER_PASSWORD;

const default_token = 'Basic ' + btoa(username + ':' + password);
type Company = {
  company_id: string;
  name: string
}

type TUserFromServerData = {
  companies: Company[];
}

interface IInitProfileStore {
  companies: Company[] | null;
  company_page_id: string | null;
  user_token: string
}


const initialState: IInitProfileStore = {
  companies: null,
  company_page_id: '1',
  user_token: ''//default_token
}

export const profileSlice = createSlice({
  name: 'profileStore',
  initialState: initialState,
  reducers: {

    setUserToken: (state, action: PayloadAction<string>) => {
      console.log("▶ ⇛ Set Token", action.payload);
      state.user_token = action.payload
    },
    setUserDataFromServer: (state, action: PayloadAction<TUserFromServerData>) => {
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
