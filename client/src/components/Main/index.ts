import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import MainPage from "./MainPage";
import modal from "../../actions/modal";

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { openModal } = modal;
  return bindActionCreators({ openModal }, dispatch);
};

const MainPageContainer = connect(mapDispatchToProps)(MainPage);

export default MainPageContainer;
