import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ISettingsData, TCompanyData, ICarObject, TPointsData,
  TEventsData, TTypeEvents, TIcons, TUsers, TSelectedFieldChanged
} from '../../components/SettingPage/types/carsSettingsTypes';
import { LatLng } from 'leaflet';


interface IInitSettingStore extends ISettingsData {
  config: {
    requestWorks: boolean,
    chooseInputName: string | null,
    currentSelectBlock: TSelectedFieldChanged | null,
    mapMove: boolean | undefined,
    mapCenter: LatLng | null,
    alertShow: boolean,
    backDropShow: boolean,
    forcedUpdateToogle: boolean,
  }
}


const initialState: IInitSettingStore = {
  company: { company_id: '', name: '', short_link: '', balance: '', currency: "RUB" },
  cars: [],
  points: [],
  events: [],
  type_of_events: [],
  icons: [],
  users: [],
  config: {
    requestWorks: false,
    chooseInputName: null,
    currentSelectBlock: null,
    mapMove: undefined,
    mapCenter: null,
    alertShow: false,
    backDropShow: false,
    forcedUpdateToogle: false,
  }
}

export const carsSettingsSlice = createSlice({
  name: 'carsSettings',
  initialState: initialState,
  reducers: {

    setCompanyDataInSettings: (state, action: PayloadAction<TCompanyData>) => {
      state.company = { ...action.payload }
    },
    setCarsDataInSettings: (state, action: PayloadAction<ICarObject[]>) => {
      state.cars = [...action.payload]
    },
    setPointsDataInSettings: (state, action: PayloadAction<TPointsData[]>) => {
      state.points = [...action.payload]
    },
    setEventsDataInSettings: (state, action: PayloadAction<TEventsData[]>) => {
      state.events = [...action.payload]
    },
    setTypeEventsDataInSettings: (state, action: PayloadAction<TTypeEvents>) => {
      state.type_of_events = [...action.payload]
    },
    setIconsDataInSettings: (state, action: PayloadAction<TIcons[]>) => {
      state.icons = [...action.payload]
    },
    setInitialSettingsData: (state, action: PayloadAction<ISettingsData>) => {
      state.company = action.payload.company
      state.cars = action.payload.cars
      state.points = action.payload.points
      state.events = action.payload.events
      state.type_of_events = action.payload.type_of_events
      state.icons = action.payload.icons
      state.users = action.payload.users
    },


    // ? COMPANY BLOCK--------------------------
    // Обновить состояние компании
    setRefreshCompanyData: (state) => {
      state.company = { ...state.company }
    },
    // Имя компании установить
    setCompanyName: (state, action: PayloadAction<string>) => {
      state.company.name = action.payload
    },

    // Установить shortLink
    setShortLink: (state, action: PayloadAction<string>) => {
      state.company.short_link = action.payload
    },

    // Удалить shortLink
    setRemoveShortLink: (state) => {
      state.company.short_link = ''
    },

    // Установить balance
    setBalance: (state, action: PayloadAction<string>) => {
      state.company.balance = action.payload
    },
    // ? ALL BLOCK --------------------------
    //  предусмотрена для отображения загрузки и блокирования страницы
    setRequestWorks: (state, action: PayloadAction<boolean>) => {
      state.config.requestWorks = action.payload
    },

    // Установить имя выбранного интерактивного элемента(input)
    setChooseInputName: (state, action: PayloadAction<string | null>) => {
      state.config.chooseInputName = action.payload
    },

    // Установить текущее состояние выбора (какой инпут меняем, сюда ложим весь объект чье это поле
    // С указанием типа объекта - cars | points | events | users
    setCurrentSelectBlock: (state, action: PayloadAction<TSelectedFieldChanged | null>) => {
      state.config.currentSelectBlock = action.payload
    },
    // Показать Alert
    setAlertShow: (state) => {
      state.config.alertShow = true
    },
    // Скрыть Alert
    setAlertHide: (state) => {
      state.config.alertShow = false
    },
    // Переключатель Обновления данных(Перезагрузки SettingsForm)
    setForcedUpdateToogle: (state) => {
      state.config.forcedUpdateToogle = !state.config.forcedUpdateToogle
    },
    // Запустить BackDrop
    setBackDropShow: (state) => {
      state.config.backDropShow = true
    },
    // Остановить BackDrop
    setBackDropHide: (state) => {
      state.config.backDropShow = false
    },

    // ? CARS BLOCK --------------------------
    // Удалить Авто
    setRemoveCar: (state, action: PayloadAction<string>) => {
      state.cars = [...state.cars].filter((car) => car.car_id !== action.payload)
    },
    // Создать Авто
    setCreateCar: (state, action: PayloadAction<ICarObject>) => {
      state.cars = [...state.cars, action.payload]
    },

    // Обновить Авто
    setUpdateCar: (state, action: PayloadAction<ICarObject>) => {
      const index = state.cars.findIndex((car) => car.car_id === action.payload.car_id)
      if (index !== -1) {
        state.cars[index] = action.payload
      } else {
        state.cars = [...state.cars]
      }
    },
    // ? POINTS BLOCK --------------------------
    // Добавить Новую Точку
    setNewPoint: (state, action: PayloadAction<TPointsData>) => {
      state.points = [...state.points, action.payload]
    },
    // Удалиить Точку по ID
    setRemovePoint: (state, action: PayloadAction<string>) => {
      state.points = [...state.points].filter((point) => point.point_id !== action.payload)
    },
    // Обновить Точку
    setUpdatePoint: (state, action: PayloadAction<TPointsData>) => {
      const index = state.points.findIndex((point) => point.point_id === action.payload.point_id)
      if (index !== -1) {
        state.points[index] = action.payload
      } else {
        state.points = [...state.points]
      }
    },
    // ? EVENTS BLOCK --------------------------
    // Добавить Новое событие
    setCreateEvent: (state, action: PayloadAction<TEventsData>) => {
      state.events = [...state.events, action.payload]
    },
    // Удалить событие по ID
    setRemoveEvent: (state, action: PayloadAction<string>) => {
      state.events = [...state.events].filter((event) => event.event_id !== action.payload)
    },
    // Обновить Событие
    setUpdateEvent: (state, action: PayloadAction<Omit<TEventsData, 'company_id'>>) => {
      const index = state.events.findIndex((event) => event.event_id === action.payload.event_id)
      console.log("▶ ⇛ payload.event_id:", action.payload.event_id);
      if (index !== -1) {
        state.events[index] = action.payload
      } else {
        state.events = [...state.events]
      }
    },
    // ? USERS BLOCK --------------------------
    // Добавить Нового пользователя
    setCreateUser: (state, action: PayloadAction<TUsers>) => {
      state.users = [...state.users, action.payload]
    },
    // Удалить пользователя
    setRemoveUser: (state, action: PayloadAction<string>) => {
      state.users = [...state.users].filter((user) => user.user_id !== action.payload)
    },
    // Обновить Пользователя
    setUpdateUser: (state, action: PayloadAction<TUsers>) => {
      const index = state.users.findIndex((user) => user.user_id === action.payload.user_id)
      if (index !== -1) {
        state.users[index] = action.payload
      } else {
        state.users = [...state.users]
      }
    },
    // ? MODAL WITH MAP BLOCK --------------------------
    // Карта двигается в данный момент или нет (true | false)
    setMapMove: (state, action: PayloadAction<boolean>) => {
      state.config.mapMove = action.payload
    },
    // Установливаем центр карты пи каждом изменении карты
    setMapCenter: (state, action: PayloadAction<LatLng | null>) => {
      state.config.mapCenter = action.payload
    },

  },
}
)

export const { actions: carsSettingsActions, reducer: carsSettingsReducer } = carsSettingsSlice;
