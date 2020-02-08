import React, { useState, useEffect } from 'react'
import { Link, Switch, Redirect, Route } from 'react-router-dom'
import './LoginPage.scss'
import InputFild from '../iputFild/inputFild'
import Spiner from '../spinner/spinner'
import FormMessage from '../FormMessage/FormMessage'

// type ILoginRequest = (login: string, password: string) => any

interface IProps {
  loginRequest: (login: string, password: string) => void
  isLogined: boolean
  isFormMessage: boolean
  messageType: number
  messsageText: string
  isWaitResponse: boolean
}

interface IFild {
  isValid: boolean
  validValue: string
}

const LoginPage: React.FC<IProps> = props => {
  const {
    loginRequest,
    isLogined,
    isFormMessage,
    messageType,
    messsageText,
    isWaitResponse
  } = props

  const [login, setLogin] = useState<IFild>({
    isValid: false,
    validValue: ''
  })
  const [password, setPassword] = useState<IFild>({
    isValid: false,
    validValue: ''
  })
  const [spinnerState, setSpinerState] = useState(false)
  const [saveBtn, setSaveBtn] = useState(false)

  useEffect(() => {
    if (login.isValid && password.isValid) {
      setSaveBtn(true)
    } else {
      setSaveBtn(false)
    }
  }, [login, password])

  return (
    <>
      <h2 className='welcome-text'>Welcome</h2>
      <form className='mui-panel login-form'>
        <InputFild
          options={{
            type: 'text',
            id: 'login',
            label: 'Login:',
            isRequired: true,
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
            isRequired: true,
            value: '',
            disabled: false
          }}
          onValid={setPassword}
        />
        {isWaitResponse && <Spiner />}
        {isFormMessage && (
          <FormMessage messageType={messageType} messsageText={messsageText} />
        )}
        <div className='form-bottom'>
          <button
            onClick={e => {
              e.preventDefault()
              loginRequest(login.validValue, password.validValue)
            }}
            disabled={!saveBtn}
            className='mui-btn   mui-btn--raised mui-btn--primary'
          >
            Login
          </button>
          <Link to='/signup' className='mui-btn mui-btn--flat'>
            SignUp
          </Link>
        </div>
      </form>
      <Switch>
        {isLogined && (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        )}
      </Switch>
    </>
  )
}

export default LoginPage
