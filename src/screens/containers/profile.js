import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import Icon from '../../sections/components/icon';

class Profile extends Component {
  static navigationOptions = () => {
      return {
        title: 'Perfil',
        tabBarIcon: <Icon icon="😎" />
      }
  }

  handleLogout = () => {
    this.props.dispatch({
      type: 'REMOVE_USER'
    })

    this.props.navigation.navigate('Loading')
  }

  componentDidMount() {
    this.focus = this.props.navigation.addListener('didFocus', () => {
        console.log('Did focus')
        StatusBar.setBarStyle('dark-content'); 
        StatusBar.setBackgroundColor('white'); 
    })
   }

   componentWillUnmount() {
      this.focus.remove();
   }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{this.props.user.username}</Text>
        <Button
          title="Cerrar sesión"
          color="#67a52e"
          onPress={this.handleLogout}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile);