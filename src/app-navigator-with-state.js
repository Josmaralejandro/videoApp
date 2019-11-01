import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppNavigator from './app-navigator';
import {
  createReduxBoundAddListener,
  initializeListeners,
  createDidUpdateCallback
} from 'react-navigation-redux-helpers';
import { BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';

const addListener = createReduxBoundAddListener('root');

const didUpdate = createDidUpdateCallback('root');

class AppNavigatorWithState extends Component {
  componentDidUpdate() {
    return didUpdate();
  }
  componentDidMount() {
    initializeListeners('root', this.props.navigation);
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    this.props.dispatch(
      NavigationActions.back({
        key: null
      })
    )
    return true
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  render() {
    const navigation = {
      dispatch: this.props.dispatch,
      state: this.props.navigation,
      addListener
    }
    return (
      <AppNavigator
        navigation={navigation}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation
  }
}

export default connect(mapStateToProps)(AppNavigatorWithState)
