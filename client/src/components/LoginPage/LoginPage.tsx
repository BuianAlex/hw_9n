import React, { useState, useEffect } from 'react';
import { Link, Switch, Redirect } from 'react-router-dom';
import './LoginPage.scss';
import { IProps, IFild } from './LoginPageInterfaces';
import InputFild from '../iputFild/inputFild';
import Spiner from '../spinner/spinner';
import FormMessage from '../FormMessage/FormMessage';

const LoginPage: React.FC<IProps> = props => {
  const { userLogIn, isLogined, isWaitResponse, formMessage } = props;

  const [login, setLogin] = useState<IFild>({
    isValid: false,
    validValue: ''
  });
  const [password, setPassword] = useState<IFild>({
    isValid: false,
    validValue: ''
  });

  const [saveBtn, setSaveBtn] = useState(false);

  useEffect(() => {
    if (login.isValid && password.isValid) {
      setSaveBtn(true);
    } else {
      setSaveBtn(false);
    }
  }, [login, password]);

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
        {formMessage.state && (
          <FormMessage
            messageType={formMessage.type}
            messageText={formMessage.msg}
          />
        )}
        <div className='form-bottom'>
          <button
            onClick={e => {
              e.preventDefault();
              userLogIn(login.validValue, password.validValue);
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
  );
};

export default LoginPage;
