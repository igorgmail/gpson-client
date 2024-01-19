export default function useFormValidation() {

  const validate = (type: string, value: string) => {
    const status: string = '';
    const msg: string = '';
    if (type === 'email') {
      if (value.length === 0) return { status: 'error', msg: 'email обязателен' }
      // if (!/\S+@\S+\.\S+/.test(value)) return { status: 'error', msg: 'email не валидный' }
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return { status: 'error', msg: 'email не валидный' }

      return { status: 'ok', msg: '' }
    }

    if (type === 'password') {
      console.log("▶ ⇛ value:", value);
      if (value.length === 0) return { status: 'error', msg: 'password обязателен' }
      if (value.length <= 5) return { status: 'error', msg: 'password должен быть длиннее 5 символов' }

      return { status: 'ok', msg: '' }
    }

    return { status, msg }
  }

  return { validate };


}

