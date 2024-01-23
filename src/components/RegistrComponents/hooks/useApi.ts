import { useAppSelector, store } from "../../../store";

const apiEndpoint = process.env.REACT_APP_API_USER;
type Tmethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequestOptions {
  method: Tmethod;
  body?: BodyInit | null;
}
const username = process.env.REACT_APP_API_USER_NAME;
const password = process.env.REACT_APP_API_USER_PASSWORD;

function useApi() {

  const user_token = useAppSelector((store) => store.profileStore.user_token)

  const sendRequest = async (url: string, options: IRequestOptions) => {

    const actual_user_token = store.getState().profileStore.user_token
    let responseData;
    const abortController = new AbortController();
    try {
      const response = await fetch(`${apiEndpoint}${url}`, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': actual_user_token
        },
        credentials: 'same-origin',
        body: options.body,
        signal: abortController?.signal
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      responseData = await response.json();
      return { data: responseData, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Произошла неизвестная ошибка' };

    }
  };



  return { sendRequest, abortController: AbortController };
}

export default useApi;