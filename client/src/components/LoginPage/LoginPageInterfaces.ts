export interface IFormMessage {
  state: boolean;
  type?: number;
  msg?: string;
}

export interface IProps {
  userLogIn: (login: string, password: string) => void;
  isLogined: boolean;
  isWaitResponse: boolean;
  formMessage: IFormMessage;
}
export interface IFild {
  isValid: boolean;
  validValue: string;
}
