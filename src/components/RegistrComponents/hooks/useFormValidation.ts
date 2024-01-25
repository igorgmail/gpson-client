export default function useFormValidation() {

  type TFieldType = 'email' | 'password' | 'confirm-password' | 'pin' | 'comp-name'

  interface IValidate {
    (type: TFieldType, value: string): { error: boolean, msg: string };
  }

  const validate: IValidate = (type, value) => {

    const error: boolean = false;
    const msg: string = '';

    if (type === 'email') {
      if (value === 'test') return { error: false, msg: '' }
      if (value.length === 0) return { error: true, msg: 'email обязателен' }
      // if (!/\S+@\S+\.\S+/.test(value)) return { status: 'error', msg: 'email не валидный' }
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return { error: true, msg: 'email не валидный' }
      return { error: false, msg: '' }
    }

    if (type === 'password') {
      if (value.length === 0) return { error: true, msg: 'пароль обязателен' }
      if (value.length <= 2) return { error: true, msg: 'пароль должен быть длиннее 5 символов' }
      return { error: false, msg: '' }
    }

    if (type === 'confirm-password') {
      if (value.length === 0) return { error: true, msg: 'повторите пароль обязателен' }
      return { error: false, msg: '' }
    }
    if (type === 'pin') {
      if (value.length === 0 || value.length < 6) return { error: true, msg: 'введите код из письма' }
      return { error: false, msg: '' }
    }
    if (type === 'comp-name') {
      if (value.length === 0 || value.length < 3) return { error: true, msg: 'минимум три символа' }
      return { error: false, msg: '' }
    }

    return { error, msg }
  }

  return { validate };

}

