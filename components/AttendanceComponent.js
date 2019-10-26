/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import SecureStorage from 'react-native-secure-storage';
import {RNCamera} from 'react-native-camera';

const markAttendance = roll => {
  const params = {sdata: roll + 'o1'};
  const url = ATTENDANCE_URL;
  return fetch(url, {
    method: 'GET',
  })
    .then(() => {
      ToastAndroid.show('Your attendance has been marked', ToastAndroid.LONG);
      globalScreen.setState({scanned: false, maskColor: 'transparent'});
      globalScreen.props.navigation.navigate('Home');
    })
    .catch(() => {
      ToastAndroid.show(
        'Attendance not marked! Please check your internet connection and try again!',
        ToastAndroid.LONG,
      );
      globalScreen.setState({scanned: false, maskColor: 'transparent'});
      globalScreen.props.navigation.navigate('Home');
    });
};

var globalScreen;

class Attendance extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line consistent-this
    globalScreen = this;
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      roll: '',
      gotInfo: false,
      maskColor: 'transparent',
    };
  }

  componentWillMount() {
    SecureStorage.getItem('aasflogininfo').then(userdata => {
      let aasflogininfo = JSON.parse(userdata);
      if (aasflogininfo) {
        this.setState({roll: aasflogininfo.roll});
      }
      this.setState({gotInfo: true});
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', () =>
      this.setState({focusedScreen: true}),
    );
    navigation.addListener('willBlur', () =>
      this.setState({focusedScreen: false}),
    );
  }

  handleBarCodeScanned = ({data}) => {
    console.log(data);
    if (
      data ===
      new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0]
    ) {
      this.setState({scanned: true, maskColor: 'rgba(1,1,1,0.9)'});
      markAttendance(this.state.roll);
    } else {
      ToastAndroid.show('Invalid QR Code', ToastAndroid.SHORT);
      this.setState({scanned: false, maskColor: 'transparent'});
    }
  };

  static navigationOptions = {
    title: 'Attendance',
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      textAlign: 'left',
      fontFamily: 'Montserrat-Medium',
      fontSize: 15,
    },
  };

  render() {
    return this.state.gotInfo ? (
      this.state.focusedScreen ? (
        <RNCamera
          style={{
            flex: 1,
            width: '100%',
          }}
          onBarCodeRead={
            this.state.scanned ? undefined : this.handleBarCodeScanned
          }>
          <View style={styles.maskOutter}>
            <View style={[{height: '25%'}, styles.maskRow, styles.maskFrame]} />
            <View style={[{height: '50%'}, styles.maskCenter]}>
              <View style={[{width: '10%'}, styles.maskFrame]} />
              <View
                style={[
                  styles.maskInner,
                  {backgroundColor: this.state.maskColor},
                ]}
              />
              <View style={[{width: '10%'}, styles.maskFrame]} />
            </View>
            <View style={[{height: '25%'}, styles.maskRow, styles.maskFrame]} />
          </View>
        </RNCamera>
      ) : null
    ) : null;
  }
}

const styles = StyleSheet.create({
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: '80%',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {flexDirection: 'row'},
});

export default Attendance;
