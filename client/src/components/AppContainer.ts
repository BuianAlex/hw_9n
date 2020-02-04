import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { user } from '../actions';
import App from './App';

const mapStateToProps = (state: any) => {
  return {
    isLogined: state.user.isLogined
  };
};

const MainPageContainer = connect(mapStateToProps, null)(App);

export default MainPageContainer;
