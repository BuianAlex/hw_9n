import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = (state: any) => {
  return {
    isLogined: state.user.isLogined
  };
};

const MainPageContainer = connect(mapStateToProps, null)(App);

export default MainPageContainer;
