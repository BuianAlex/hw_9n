import React, { useState, useEffect, Dispatch } from 'react';
import Validator from './../../utils/validator';
import './inputFild.scss';

interface IOptions {
  type: string;
  id: string;
  isRequired?: boolean;
  value: string;
  disabled: boolean;
  label: string;
}

interface IFild {
  isValid: boolean;
  validValue: string;
}

interface IProps {
  options: IOptions;
  onValid: Dispatch<IFild>;
}

interface IErrorMsg {
  hasError: boolean;
  msgError: string;
}

const InputFild: React.FC<IProps> = ({ options, onValid }) => {
  const startIsValid = options.isRequired ? true : false;
  const [fildValue, setfildValue] = useState<string>(options.value);
  const [errorMessage, setErrorMessage] = useState<IErrorMsg>({
    hasError: startIsValid,
    msgError: ''
  });
  const [isBlur, setIsBlur] = useState<boolean>(false);

  const fildChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue: string = e.target.value.trim();
    const testValue = new Validator(inputValue);
    const isSpecial: boolean = testValue.noSpeсialChar();
    //if get special char show err
    if (isSpecial) {
      setIsBlur(true);

      setErrorMessage({
        hasError: true,
        msgError: `Not allowed special characters ( -/^$*?()|[]{})`
      });
    } else {
      switch (e.target.id) {
        case 'login':
          if (!testValue.maxLength(50)) {
            setErrorMessage({
              hasError: true,
              msgError: 'Login is too long!'
            });
          } else if (!testValue.minLength(3)) {
            setErrorMessage({
              hasError: true,
              msgError: 'Login is too short!'
            });
          } else {
            setErrorMessage({
              hasError: false,
              msgError: ''
            });
          }
          break;

        case 'password':
          switch (testValue.testPassword()) {
            case 0:
              setErrorMessage({
                hasError: true,
                msgError:
                  'Password must have at least 6 characters and include numbers and letters'
              });
              break;
            default:
              setErrorMessage({
                hasError: false,
                msgError: ''
              });
              break;
          }
          break;

        case 'email':
          if (!testValue.isEmail() && inputValue.length > 0) {
            setErrorMessage({
              hasError: true,
              msgError: 'Email Address not valid'
            });
          } else {
            setErrorMessage({
              hasError: false,
              msgError: ''
            });
          }
          break;

        case 'phone':
          if (!testValue.isPhoneNumber()) {
            if (inputValue.length < 4) {
              inputValue = '+38';
              setErrorMessage({
                hasError: false,
                msgError: ''
              });
            } else if (
              !/(^\+38\d+$)/.test(inputValue) &&
              inputValue.length > 3
            ) {
              inputValue = fildValue;
              setErrorMessage({
                hasError: true,
                msgError: 'Phone number is not valid'
              });
            } else if (inputValue.length < 13) {
              setErrorMessage({
                hasError: true,
                msgError: 'Phone number is not valid'
              });
            } else {
              inputValue = fildValue;
            }
          } else {
            setErrorMessage({
              hasError: false,
              msgError: ''
            });
          }
          break;
        default:
          break;
      }
      setfildValue(inputValue);
    }
  };

  useEffect(() => {
    onValid({ isValid: !errorMessage.hasError, validValue: fildValue });
  }, [errorMessage, fildValue, onValid]);

  return (
    <div className='mui-textfield'>
      <input
        type={options.type}
        id={options.id}
        value={fildValue}
        onChange={fildChange}
        onBlur={e => {
          setIsBlur(true);
        }}
        disabled={options.disabled}
      />
      <label htmlFor={options.id}>{options.label}</label>
      <span className='errors'>{isBlur && errorMessage.msgError}</span>
    </div>
  );
};
export default InputFild;
