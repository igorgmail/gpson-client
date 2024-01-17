const API_ENDPOINTS = {
  GET_SETTINGS: "/get_settings",
  SAVE_COMPANY_NAME: "/save_company_name", //"Сохранить имя компании"
  REFRESH_BALANCE: "/refresh_balance",// "Обновить баланс компании"
  DELETE_SHORT_LINK: "/delete_short_link", // "Удалить короткую ссылку"
  REFRESH_SHORT_LINK: "/refresh_short_link", // "Обновить короткую ссылку"
  CREATE_SHORT_LINK: "/create_short_link", // "Создать короткую ссылку"
  DELETE_CAR: "/delete_car", // "Удалить запись об автомобиле"
  CREATE_CAR: "/create_car", // "Создать запись об автомобиле"
  SAVE_CAR: "/save_car", // "Обновить запись об автомобиле"
  DELETE_POINT: "/delete_point", // "Удалить запись о контрольной точке"
  CREATE_POINT: "/create_point", // "Создать запись о контрольной точке"
  GET_ADDRESS_FROM_NOMI: "https://nominatim.openstreetmap.org/reverse", // Получаем адрес с API nominatim
  SAVE_POINT: "/save_point", // "Обновить запись о контрольной точке"
  DELETE_EVENT: "/delete_event", // "Удалить запись о контрольном событии"
  CREATE_EVENT: "/create_event", // "Создать запись о событии"
  SAVE_EVENT: "/save_event", // "Обновить запись о событии"
  DELETE_USER: "/delete_user", // "Удалить запись о пользователе"
  CREATE_USER: "/create_user", // "Создать запись о пользователе"
  SAVE_USER: "/save_user", // "Обновить запись о пользователе"


  // Добавьте другие конечные точки здесь
};

export default API_ENDPOINTS;