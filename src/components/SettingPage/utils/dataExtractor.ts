import { ICarObject, ICarObjectTwo, TPointDataFromServer, ISettingsData } from "../types/carsSettingsTypes"

class DataExtractor {

  // Заменяем point_name на name
  static getPointsFromServerData(data: TPointDataFromServer) {
    const { address, point_id, lat, lng, radius, point_name: name } = { ...data }
    return { address, point_id, lat, lng, radius, name };
  }

  static createCarDataForServer(data: Omit<ICarObject, 'car_id'>) {
    const { pic, imei, alter_imei, name: car_name } = { ...data }
    return { pic, imei, alter_imei, car_name };
  }

  static createCarDataFromServer(data: ICarObjectTwo) {
    const { car_id, pic, imei, alter_imei, name } = { ...data }

    return { car_id, pic: this.createiconPath(pic), imei, alter_imei, name }
  }

  static createDataWithPicHref(data: ISettingsData) {

    const newCarData = data.cars.map((car: any) => {
      if (car["CONCAT('https://gpson.ru/',pic)"]) {
        // Преобразование значения поля "CONCAT('https://gpson.ru/',pic)"
        const concatenatedValue = car["CONCAT('https://gpson.ru/',pic)"];
        const url = concatenatedValue.replace(/^CONCAT\('([^']*)',pic\)$/, '$1');
        // Замена значения поля на преобразованную ссылку
        car.pic = url;
        // Удаление оригинального поля
        delete car["CONCAT('https://gpson.ru/',pic)"];
        return car
      }
      return car
    })
    return { ...data, cars: newCarData }
  }

  static createiconPath(href: string) {
    return `https://gpson.ru/${href}`
  }

}

export default DataExtractor;