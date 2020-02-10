import React, { useState, useEffect } from 'react';
import './UserCard.scss';
import InputFild from '../iputFild/inputFild';
import SelectFild from '../selectFild/selectFild';
import Spiner from '../spinner/spinner';
import FormMessage from '../FormMessage/FormMessage';
import { createUser, updateUser, uploadUserPhoto } from '../../services/api';
import { userRole } from '../../constants';
import * as moment from 'moment';

export default function Card({ userData, onClose, updateTable, mainUser }) {
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
  const [formMessage, setFormMessage] = useState({ state: false });
  const [usergroup, setUsergroup] = useState(userData.usergroup || 'user');
  const [saveBtn, setSaveBtn] = useState(false);
  const [spinnerState, setSpinerState] = useState(false);
  const [userPhoto, setUserPoto] = useState(
    userData.photo !== undefined && userData.photo.length > 0
      ? userData.photo[0].fileName
      : ''
  );
  const [imgPath, setImgPath] = useState(
    userData.photo !== undefined && userData.photo.length > 0
      ? userData.photo[0].storePath
      : false
  );
  const [uploadMsg, setUploadMsg] = useState(false);

  useEffect(() => {
    if (
      login.isValid &&
      password.isValid &&
      email.isValid &&
      phone.isValid &&
      mainUser.usergroup === userRole.USER_ADMIN
    ) {
      if (
        userData.loginName !== login.validValue ||
        userData.email !== email.validValue ||
        userData.phone !== phone.validValue ||
        userData.usergroup !== usergroup ||
        userData.photo !== userPhoto
      ) {
        setSaveBtn(true);
      }
    } else {
      setSaveBtn(false);
    }
  }, [login, password, email, phone, usergroup, userPhoto]);

  const cardClose = e => {
    e.preventDefault();
    onClose();
  };

  const uploadPhoto = async e => {
    e.preventDefault();
    const apiRes = await uploadUserPhoto(e.target.files);

    if (apiRes.fileName) {
      setUserPoto(apiRes.fileName);
      setImgPath(`/uploads/`);
    }
    if (apiRes.error) {
      setUploadMsg({ msg: apiRes.error, type: 2 });
    } else {
      setUploadMsg(false);
    }
  };

  const cardSave = async e => {
    e.preventDefault();
    setFormMessage(false);
    setSpinerState(true);
    if (userData.userId) {
      const apiRes = await updateUser(userData.userId, {
        loginName: login.validValue,
        email: email.validValue,
        phone: phone.validValue,
        usergroup: usergroup,
        photo: userPhoto
      });
      setSpinerState(false);
      if (apiRes.result) {
        setFormMessage({
          state: true,
          messageText: 'User successfully updated',
          messageType: 0
        });
        updateTable();
      } else {
        setFormMessage({
          state: true,
          messageText: apiRes.error,
          messageType: 2
        });
      }
    } else {
      const apiRes = await createUser({
        loginName: login.validValue,
        password: password.validValue,
        email: email.validValue,
        phone: phone.validValue,
        usergroup: usergroup,
        photo: userPhoto
      });
      setSpinerState(false);
      if (apiRes.result) {
        setFormMessage({
          state: true,
          messageText: 'New user was created successfully',
          messageType: 0
        });
        updateTable();
      } else {
        setFormMessage({
          state: true,
          messageText: apiRes.error,
          messageType: 2
        });
      }
    }
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
              src={userPhoto ? imgPath + userPhoto : '/img/user.svg'}
              alt='user-photo'
              className='user-photo'
            />
            <div className='upload-btn-wrapper'>
              <button className='mui-btn mui-btn--raised'>Upload photo</button>
              <input type='file' name='myfile' onChange={uploadPhoto} />
            </div>
            {uploadMsg && (
              <FormMessage messange={uploadMsg.msg} type={uploadMsg.type} />
            )}
          </div>
          <div className='text-filds'>
            <InputFild
              options={{
                type: 'text',
                id: 'login',
                label: 'Login:',
                value: userData.loginName,
                disabled: mainUser.usergroup !== userRole.USER_ADMIN
              }}
              onValid={setLogin}
            />
            {!userData.userId && (
              <InputFild
                options={{
                  type: 'password',
                  id: 'password',
                  label: 'Password:',
                  value: '',
                  disabled: mainUser.usergroup !== userRole.USER_ADMIN
                }}
                onValid={setPassword}
              />
            )}
            <InputFild
              options={{
                type: 'text',
                id: 'email',
                label: 'E-mail:',
                value: userData.email,
                disabled: mainUser.usergroup !== userRole.USER_ADMIN
              }}
              onValid={setEmail}
            />
            <InputFild
              options={{
                type: 'text',
                id: 'phone',
                label: 'Phone:',
                // value: userData.phone || '+38',
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
          </div>
        </form>
        <div className='form-footer'>
          {spinnerState && <Spiner />}
          {formMessage.state && (
            <FormMessage
              messageText={formMessage.messageText}
              messageType={formMessage.messageType}
            />
          )}
          {saveBtn && (
            <button
              onClick={cardSave}
              className='mui-btn  mui-btn--raised mui-btn--primary'
            >
              Save
            </button>
          )}
          <button onClick={cardClose} className='mui-btn mui-btn--raised'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
