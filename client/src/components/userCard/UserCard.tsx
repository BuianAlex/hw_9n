/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './UserCard.scss';
import InputFild from '../IputFild/InputFild';
import SelectFild from '../SelectFild/SelectFild';
import Spiner from '../Spinner/Spinner';
import FormMessage from '../FormMessage/FormMessage';
import { userRole, userCardType } from '../../constants';
import { IProps, IReqData } from './UserCardInterfaces';

const Card: React.FC<IProps> = ({
  userData,
  mainUser,
  isWaitResponse,
  isWaitPhotoUpload,
  isSaveRequestError,
  isUploadError,
  actionCloseCard,
  actionEditUser,
  actionSaveUser,
  actionUploadPhoto,
  cardType,
  userPhoto
}) => {
  const [login, setLogin] = useState({
    isValid: false,
    validValue: ''
  });
  const [password, setPassword] = useState({
    isValid: userData.userId ? true : false,
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

  const [usergroup, setUsergroup] = useState(userData.usergroup || 'user');
  const [saveBtn, setSaveBtn] = useState(false);

  const [photo, setPhoto] = useState(userPhoto.fileName);
  const [dataToSend, setDataToSend] = useState();

  useEffect(() => {
    if (login.isValid && password.isValid && email.isValid && phone.isValid) {
      if (
        userData.loginName !== login.validValue ||
        userData.email !== email.validValue ||
        userData.phone !== phone.validValue ||
        userData.usergroup !== usergroup ||
        photo !== userPhoto.fileName
      ) {
        const reqData: IReqData = {
          loginName: login.validValue,
          email: email.validValue,
          phone: phone.validValue,
          usergroup: usergroup,
          photo: userPhoto.fileName !== 'user.svg' ? userPhoto.fileName : ''
        };
        if (userCardType.CARD_CREATE === cardType) {
          reqData.password = password.validValue;
        }
        setDataToSend(reqData);
        setSaveBtn(true);
      }
    } else {
      setSaveBtn(false);
    }
  }, [login, password, email, phone, usergroup, userPhoto]);

  const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    actionUploadPhoto(e.target.files);
  };

  return (
    <div className='card-backGround'>
      <div className='card'>
        <div className='card-header'>
          <h2>{userData.userId ? `UserID: ${userData.userId}` : 'New User'}</h2>
        </div>
        <form className='mui-form card-body'>
          <div className='user-photo-wr '>
            <img
              src={userPhoto.storePath + userPhoto.fileName}
              alt='user'
              className='user-photo'
            />
            {isWaitPhotoUpload && <Spiner />}
            <div className='upload-btn-wrapper'>
              <button className='mui-btn mui-btn--raised'>Upload photo</button>
              <input type='file' name='myfile' onChange={uploadPhoto} />
            </div>
            {isUploadError.state && (
              <FormMessage
                messageText={isUploadError.msg}
                messageType={isUploadError.type}
              />
            )}
          </div>
          <div className='text-filds'>
            <InputFild
              options={{
                type: 'text',
                id: 'login',
                label: 'Login:*',
                value: userData.loginName || '',
                isRequired: true,
                disabled: mainUser.usergroup !== userRole.USER_ADMIN
              }}
              onValid={setLogin}
            />
            {cardType === userCardType.CARD_CREATE && (
              <InputFild
                options={{
                  type: 'password',
                  id: 'password',
                  label: 'Password:*',
                  value: '',
                  isRequired: true,
                  disabled: mainUser.usergroup !== userRole.USER_ADMIN
                }}
                onValid={setPassword}
              />
            )}
            <InputFild
              options={{
                type: 'text',
                id: 'email',
                label: 'E-mail:*',
                value: userData.email || '',
                isRequired: true,
                disabled: mainUser.usergroup !== userRole.USER_ADMIN
              }}
              onValid={setEmail}
            />
            <InputFild
              options={{
                type: 'text',
                id: 'phone',
                label: 'Phone:',
                value: userData.phone || '+38',
                disabled: mainUser.usergroup !== userRole.USER_ADMIN
              }}
              onValid={setPhone}
            />
            <SelectFild
              options={{
                id: 'usergroup',
                value: usergroup,
                label: 'Usergroup:',
                disabled: mainUser.usergroup !== userRole.USER_ADMIN,
                selectors: [
                  { val: 'user', name: 'User' },
                  { val: 'editor', name: 'Editor' },
                  { val: 'admin', name: 'Admin' },
                  { val: 'superAdmin', name: 'SuperAdmin' }
                ]
              }}
              onChange={setUsergroup}
            />
            {userData.registrated && (
              <p>
                Registrated:{' '}
                {moment(userData.registrated).format('MMM DD hh:mm:ss')}
              </p>
            )}
            {userData.registrated && (
              <p>
                Last Visit:{' '}
                {moment(userData.lastVisit).format('MMM DD hh:mm:ss')}
              </p>
            )}
            <i>* required field</i>
          </div>
        </form>
        <div className='form-footer'>
          {isWaitResponse && <Spiner />}
          {isSaveRequestError.state && (
            <FormMessage
              messageText={isSaveRequestError.msg}
              messageType={isSaveRequestError.type}
            />
          )}
          {saveBtn && mainUser.usergroup === userRole.USER_ADMIN && (
            <button
              onClick={e => {
                e.preventDefault();
                switch (cardType) {
                  case userCardType.CARD_EDIT:
                    actionEditUser(userData.userId, dataToSend);
                    break;
                  case userCardType.CARD_CREATE:
                    actionSaveUser(dataToSend);
                    break;

                  default:
                    break;
                }
              }}
              className='mui-btn  mui-btn--raised mui-btn--primary'
            >
              Save
            </button>
          )}
          <button
            onClick={() => {
              actionCloseCard();
            }}
            className='mui-btn mui-btn--raised'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
