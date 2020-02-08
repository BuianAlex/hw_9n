import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './signup.scss'
import InputFild from '../iputFild/inputFild'
import Spiner from '../spinner/spinner'
import FormMessage from '../FormMessage/FormMessage'
import { createUser } from '../../services/api'

export default function Login() {
  const [login, setLogin] = useState(false)
  const [password, setPassword] = useState(false)
  const [email, setEmail] = useState(true)
  const [phone, setPhone] = useState(true)
  const [formMessage, setFormMessage] = useState(false)
  const [saveBtn, setSaveBtn] = useState(false)
  const [spinnerState, setSpinerState] = useState(false)

  const signBtn = useRef()

  useEffect(() => {
    if (login && password && email !== false && phone !== false) {
      setSaveBtn(true)
    } else {
      setSaveBtn(false)
    }
  }, [login, password, email, phone])

  const actionSignup = async e => {
    setSpinerState(true)
    e.preventDefault()
    const user = {
      loginName: login,
      password: password,
      email: email,
      phone: phone
    }
    const servRes = await createUser(user)
    setSpinerState(false)
    if (!servRes.error) {
      //TODO: loader and message if OK
      setFormMessage({ msg: 'registration successful', type: 0 })
      setTimeout(() => {
        document.location.href = '/'
      }, 2000)
    } else {
      setFormMessage({ msg: servRes.error, type: 2 })
    }
  }

  return (
    <>
      <h2 className='welcome-text'>Sign Up</h2>
      <form className='mui-panel login-form'>
        <InputFild
          options={{
            type: 'text',
            id: 'login',
            label: 'Login:',
            value: '',
            disabled: false
          }}
          onValid={setLogin}
        />
        <InputFild
          options={{
            type: 'password',
            id: 'password',
            label: 'Password:',
            value: ''
          }}
          onValid={setPassword}
        />
        <InputFild
          options={{
            type: 'text',
            id: 'email',
            label: 'E-mail:',
            value: ''
          }}
          onValid={setEmail}
        />
        <InputFild
          options={{
            type: 'text',
            id: 'phone',
            label: 'Phone:',
            value: '+38'
          }}
          onValid={setPhone}
        />
        {spinnerState && <Spiner />}
        {formMessage && (
          <FormMessage messange={formMessage.msg} type={formMessage.type} />
        )}
        <div className='form-bottom'>
          <Link to='/ligin' className='mui-btn mui-btn--flat'>
            Login
          </Link>
          <button
            ref={signBtn}
            onClick={actionSignup}
            disabled={!saveBtn}
            className='mui-btn   mui-btn--raised mui-btn--primary'
          >
            SignUp
          </button>
        </div>
      </form>
    </>
  )
}
