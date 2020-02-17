import React, { useState, useEffect } from 'react';
import { Link, Switch, Redirect } from 'react-router-dom';
import './signup.scss';
import InputFild from '../iputFild/inputFild';
import Spiner from '../spinner/spinner';
import FormMessage from '../FormMessage/FormMessage';

export default function SignUp(props: any) {
  const { userSignUp, isWaitResponse, formMessage, isLogined } = props;

  const [login, setLogin] = useState({
    isValid: false,
    validValue: ''
  });
  const [password, setPassword] = useState({
    isValid: false,
    validValue: ''
  });
  const [email, setEmail] = useState({
    isValid: false,
    validValue: ''
  });
  const [phone, setPhone] = useState({
    isValid: false,
    validValue: ''
  });
  const [saveBtn, setSaveBtn] = useState(false);

  useEffect(() => {
    if (login.isValid && password.isValid && email.isValid && phone.isValid) {
      setSaveBtn(true);
    } else {
      setSaveBtn(false);
    }
  }, [login, password, email, phone]);

  return (
    <>
      <h2 className='welcome-text'>Sign Up</h2>
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
            isRequired: true,
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
        {isWaitResponse && <Spiner />}
        {formMessage.state && (
          <FormMessage
            messageType={formMessage.type}
            messageText={formMessage.msg}
          />
        )}
        <div className='form-bottom'>
          <Link to='/ligin' className='mui-btn mui-btn--flat'>
            Login
          </Link>
          <button
            onClick={e => {
              e.preventDefault();
              userSignUp({
                loginName: login.validValue,
                password: password.validValue,
                email: email.validValue,
                phone: phone.validValue
              });
            }}
            disabled={!saveBtn}
            className='mui-btn   mui-btn--raised mui-btn--primary'
          >
            SignUp
          </button>
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
}
