import { actions } from "../constants";

interface IResult {
  result?: string;
  title: string;
  error?: string;
}

const openModal = (payload: IResult) => ({
  type: actions.OPEN_MODAL,
  payload
});

const closeModal = () => ({
  type: actions.CLOSE_MODAL
});

export default {
  openModal,
  closeModal
};
