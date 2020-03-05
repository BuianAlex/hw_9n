export interface IUserData {
  userId: string;
  usergroup: string;
  photo: { storePath: string; fileName: string }[];
  loginName: string;
  email: string;
  phone: string;
  registrated: string;
  lastVisit: string;
}

export interface IProps {
  userData: IUserData;
  mainUser: { usergroup: string };
  isWaitResponse: boolean;
  isWaitPhotoUpload: boolean;
  isSaveRequestError: { state: boolean; msg: string; type: number };
  isUploadError: { state: boolean; msg: string; type: number };
  actionCloseCard: () => {};
  actionEditUser: (id: string, data: object) => {};
  actionSaveUser: (data: object) => {};
  actionUploadPhoto: (file: any) => {};
  cardType: string;
  userPhoto: { storePath: string; fileName: string };
}

export interface IReqData {
  loginName: string;
  email: string;
  phone: string;
  usergroup: string;
  photo: string;
  password?: string;
}
