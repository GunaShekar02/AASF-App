/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import SplashScreen from 'react-native-splash-screen';

import Main from './components/MainComponent';

const {persistor, store} = ConfigureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isLoading: false,
    });
    SplashScreen.hide();
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{alignSelf: 'center', color: 'white'}}>LOADING...</Text>
      </View>
    ) : (
      <Provider store={store}>
        <PersistGate loading={<Text>LOADING...</Text>} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'black',
  },
});

export default App;
