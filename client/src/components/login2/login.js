import React from 'react';
import './login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from './textFild';
import { userRegister, userLogIn } from '../../services/api.js';
import {fildValidate} from  '../../services/inputValidate';
import Spiner from '../spiner/spiner';
import {
  faReply,
  faEdit,
  faTrashAlt,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      formState: false, //False  log

      loginFild: ' ',
      errLoginFild: true,
      isUsedLoginFild: false,

      passwordFild: '',
      errPasswordFild: true,
      isUsedPasswordFild: false,

      cPasswordFild: '',
      errcPasswordFild: false,

      emailFild: '',
      errEmailFild: false,
      isUsedEmailFild: false,

      phoneFild: '+38',
      errPhoneFild: false,
      confirmBtn: false,
      formErrors: [],
      spiner: false
    };
    this.actionFormSubmit = this.actionFormSubmit.bind(this);
    this.fildValidate = fildValidate.bind(this);
  }
  actionCloseBtn = () => {
    this.props.close();
    this.setState({
      loginFild: ' ',
      errLoginFild: false,
      isUsedLoginFild: false,

      passwordFild: '',
      errPasswordFild: true,
      isUsedPasswordFild: false,

      cPasswordFild: true,
      errcPasswordFild: '',

      emailFild: '',
      errEmailFild: '',
      isUsedEmailFild: false,

      phoneFild: '+38',
      errPhoneFild: '',
      isUsedPhoneFild: false,

      confirmBtn: false,
      formErrors: [],
      spiner: false
    });
  };

  actionFormState = () => {
    this.setState({ formState: !this.state.formState });
  };

  handleTextFildBur = e =>{
    switch (e.target.name) {
      case 'login':
        this.setState({ isUsedLoginFild: true});
        break;

      case 'password':
        this.setState({ isUsedPasswordFild: true});
        break;
    
      case 'email':
        this.setState({ isUsedEmailFild: true});
        break;
    
      case 'phone':
        this.setState({ isUsedPhoneFild: true});
        break;
    
      default:
        break;
    }
    this.fildValidate(e.target, true); 
  }

  handleTextFildChange = e => {
    this.fildValidate(e.target); 
  }
  
  async actionFormSubmit() {
    if (this.state.confirmBtn) {
      this.setState({ spiner: true });
      if (this.state.formState) {
        const {
          loginFild: login,
          passwordFild: password,
          emailFild: email,
          phoneFild: phone
        } = this.state;
        let dataToSend = {
          login,
          password,
          email,
          phone
        };
        for (const key in dataToSend) {
          dataToSend[key] = dataToSend[key].trim();
        }
        const res = await userRegister(dataToSend);
        if (res.errors.length === 0) {
          this.actionCloseBtn();
        } else {
          this.setState({ 
            formErrors: res.errors,
            spiner: false
           });
        }
      } else {
        this.setState({ spiner: true });
        const { loginFild: login, passwordFild: password } = this.state;
        const trLogin = login.trim();
        const trPassword = password.trim();
        const res = await userLogIn({
          login: trLogin,
          password: trPassword
        });
        if (res.errors.length === 0) {
          this.actionCloseBtn();
        } else {
          this.setState({ 
            formErrors: res.errors,
            spiner: false
           });
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.formState !== this.state.formState) {
      this.setState({ passwordFild: '' });
      this.setState({ errPasswordFild: true });
      if (!this.state.formState) {
        this.setState({ errcPasswordFild: false });
      } else {
        this.setState({ errcPasswordFild: true });
      }
    }

    if (
      prevState.errLoginFild !== this.state.errLoginFild ||
      prevState.errPasswordFild !== this.state.errPasswordFild ||
      prevState.errcPasswordFild !== this.state.errcPasswordFild ||
      prevState.errEmailFild !== this.state.errEmailFild ||
      prevState.errPhoneFild !== this.state.errPhoneFild

    ) {
      if (
        !this.state.errLoginFild &&
        !this.state.errPasswordFild &&
        !this.state.errcPasswordFild &&
        !this.state.errEmailFild &&
        !this.state.errPhoneFild
      ) {
        this.setState({ confirmBtn: true });
      } else {
        this.setState({ confirmBtn: false });
      }
    }

  }

  render() {
    return (
      <div className="background">
        <div className="dialog">
          <div className="header">
            Welcome
            <button className="action-btn dialog-close">
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                onClick={this.actionCloseBtn}
              />
            </button>
          </div>
          <div className="content">
            <button
              className={`content-navBtn ${!this.state.formState &&
                ' content-navBtn__active'}`}
              onClick={this.actionFormState}
            >
              login
            </button>
            <button
              className={`content-navBtn ${this.state.formState &&
                ' content-navBtn__active'}`}
              onClick={this.actionFormState}
            >
              register
            </button>
            <TextField
              type="text"
              classes="fild"
              label="Login*"
              onChangeFild={this.handleTextFildChange}
              onBlur={this.handleTextFildBur}
              value={this.state.loginFild}
              name="login"
              error={this.state.errLoginFild}
            />
            <TextField
              type="password"
              classes="fild"
              label="Password*"
              onChangeFild={this.handleTextFildChange}
              onBlur={this.handleTextFildBur}
              value={this.state.passwordFild}
              name="password"
              error={this.state.errPasswordFild}
            />
            {this.state.formState && (
              <>
                <TextField
                  type="password"
                  classes="fild"
                  label="Confirm Password*"
                  onChangeFild={this.handleTextFildChange}
                  onBlur={this.handleTextFildBur}
                  value={this.state.cPasswordFild}
                  name="cPassword"
                  error={this.state.errcPasswordFild}
                />
                {/* TODO: ADD show pass */}
                <TextField
                  type="text "
                  classes="fild"
                  label="E-mail ss@ss.com"
                  onChangeFild={this.handleTextFildChange}
                  onBlur={this.handleTextFildBur}
                  value={this.state.emailFild}
                  name="email"
                  error={this.state.errEmailFild}
                />
                <TextField
                  type="text"
                  classes="fild"
                  label="Phone +380998887766"
                  onChangeFild={this.handleTextFildChange}
                  onBlur={this.handleTextFildBur}
                  value={this.state.phoneFild}
                  name="phone"
                  error={this.state.errPhoneFild}
                />
                {/* TODO: field for upload photo */}
              </>
            )}
            {this.state.spiner && (
              <div className="spiner-wrap">
                {' '}
                <Spiner></Spiner>
              </div>
            )}
            <button
              className={`confirmBtn ${!this.state.confirmBtn &&
                ' confirmBtn_disabled'}`}
              onClick={this.actionFormSubmit}
            >
              {this.state.formState ? 'register' : 'log in'}
            </button>

            {this.state.formErrors.length !== 0 &&
              this.state.formErrors.map((item, i) => {
                return (
                  <span key="i" className="formErr">
                    {item}
                  </span>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
