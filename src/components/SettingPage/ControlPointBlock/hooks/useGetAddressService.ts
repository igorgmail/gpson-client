import { LatLng } from 'leaflet';

function useGetAddressService() {

  const getAddress = async (coordinates: LatLng | null) => {
    const abortController = new AbortController();
    const url = 'https://nominatim.openstreetmap.org/reverse?'
    const lang = 'ru'

    const lat = coordinates?.lat
    const lon = coordinates?.lng


    try {
      const response = await fetch(
        `${url}lat=${lat}&lon=${lon}&format=jsonv2&accept-language=${lang}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'same-origin',
        signal: abortController?.signal
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      let responseData = await response.json();
      // const { display_name } = responseData
      if (responseData) {
        return responseData
      } else {
        return 'Не удалось получить Адрес'
      }
    } catch (err: any) {
      console.log('Произошла неизвестная ошибка', err);
      return 'Произошла неизвестная ошибка'
    };
  }

  return { getAddress }
}

export default useGetAddressService