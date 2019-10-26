/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import SecureStorage from 'react-native-secure-storage';

const changePassword = details => {
  return fetch(CHANGE_PASSWORD_URL, {
    method: 'POST',
    body: JSON.stringify(details),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors',
  })
    .then(response => {
      if (response.ok) {
        Alert.alert(
          'Success',
          'Your password has been successfully changed',
          [
            {
              text: 'OK',
              onPress: () => {
                globalScreen.setState({loading: false});
              },
            },
          ],
          {cancelable: false},
        );
        globalScreen.setState({
          current: '',
          new: '',
          confirmNew: '',
        });
      } else {
        Alert.alert(
          'Request Failed',
          'Your password could not be changed. Please check details and try again',
          [
            {
              text: 'OK',
              onPress: () => {
                globalScreen.setState({loading: false});
              },
            },
          ],
          {cancelable: false},
        );
        globalScreen.setState({
          current: '',
          new: '',
          confirmNew: '',
        });
      }
    })
    .catch(() => {
      Alert.alert(
        'Request Failed',
        'Your password could not be changed. Please check details and try again',
        [
          {
            text: 'OK',
            onPress: () => {
              globalScreen.setState({loading: false});
            },
          },
        ],
        {cancelable: false},
      );
      globalScreen.setState({
        current: '',
        new: '',
        confirmNew: '',
      });
    });
};

var globalScreen;

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      new: '',
      confirmNew: '',
      roll: '',
      loading: false,
    };
    // eslint-disable-next-line consistent-this
    globalScreen = this;
  }

  static navigationOptions = {
    title: 'Change Password',
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      textAlign: 'left',
      fontFamily: 'Montserrat-Medium',
      fontSize: 15,
    },
  };

  componentDidMount() {
    SecureStorage.getItem('aasflogininfo').then(userdata => {
      let aasflogininfo = JSON.parse(userdata);
      if (aasflogininfo) {
        this.setState({roll: aasflogininfo.roll});
      }
    });
  }

  handlePasswordChange() {
    this.setState({loading: true});
    if (this.state.new !== this.state.confirmNew) {
      Alert.alert(
        'Request Failed',
        'New passwords do not match. Please check details and try again',
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
      this.setState({
        current: '',
        new: '',
        confirmNew: '',
      });
    } else {
      var details = {
        user: this.state.roll,
        pass: this.state.current,
        newpass: this.state.new,
      };
      changePassword(details);
    }
    this.setState({loading: false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Current Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={password => this.setState({current: password})}
          value={this.state.current}
          containerStyle={styles.formInput}
          inputStyle={{
            color: 'white',
            fontFamily: 'Andika-Regular',
            fontSize: 20,
          }}
        />
        <Input
          placeholder="New Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={password => this.setState({new: password})}
          value={this.state.new}
          containerStyle={styles.formInput}
          inputStyle={{
            color: 'white',
            fontFamily: 'Andika-Regular',
            fontSize: 20,
          }}
        />
        <Input
          placeholder="Confirm New Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={password => this.setState({confirmNew: password})}
          value={this.state.confirmNew}
          containerStyle={styles.formInput}
          inputStyle={{
            color: 'white',
            fontFamily: 'Andika-Regular',
            fontSize: 20,
          }}
        />
        <Button
          onPress={() => this.handlePasswordChange()}
          title="CONFIRM"
          buttonStyle={{
            marginTop: 20,
            width: 200,
            alignSelf: 'center',
            borderColor: 'white',
            borderRadius: 0,
          }}
          titleStyle={{
            color: 'white',
            fontFamily: 'Montserrat-Medium',
            fontSize: 15,
          }}
          type="outline"
          loading={this.state.loading}
          loadingProps={{color: 'white'}}
          disabled={this.state.loading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  formInput: {
    marginHorizontal: 40,
    marginBottom: 20,
    width: 250,
  },
});

export default ChangePassword;
