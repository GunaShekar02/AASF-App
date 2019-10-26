/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Icon, Button, Input} from 'react-native-elements';
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';
import SecureStorage from 'react-native-secure-storage';
import {connect} from 'react-redux';
import {
  fetchStats,
  fetchLeaderboard,
  fetchEvents,
} from '../redux/ActionCreators';

import Home from './HomeComponent';
import Attendance from './AttendanceComponent';
import Statistics from './StatisticsComponent';
import Leaderboard from './LeaderboardComponent';
import ExpandableCalendarScreen from './CalendarComponent';
import ChangePassword from './ChangePasswordComponent';

const mapDispatchToProps = dispatch => ({
  fetchStats: roll => dispatch(fetchStats(roll)),
  fetchEvents: () => dispatch(fetchEvents()),
  fetchLeaderboard: () => dispatch(fetchLeaderboard()),
});

const HomeNavigator = createStackNavigator(
  {
    Home: {screen: Home},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
      headerLeft: (
        <Icon
          name="bars"
          type="font-awesome"
          size={24}
          color="white"
          containerStyle={{margin: 20}}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  },
);

const AttendanceNavigator = createStackNavigator(
  {
    Attendance: {screen: Attendance},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
      headerLeft: (
        <Icon
          name="bars"
          type="font-awesome"
          size={24}
          color="white"
          containerStyle={{margin: 20}}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  },
);

const StatisticsNavigator = createStackNavigator(
  {
    Statistics: {screen: Statistics},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
      headerLeft: (
        <Icon
          name="bars"
          type="font-awesome"
          size={24}
          color="white"
          containerStyle={{margin: 20}}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  },
);

const LeaderboardNavigator = createStackNavigator(
  {
    Leaderboard: {screen: Leaderboard},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
      headerLeft: (
        <Icon
          name="bars"
          type="font-awesome"
          size={24}
          color="white"
          containerStyle={{margin: 20}}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  },
);

const CalendarNavigator = createStackNavigator(
  {
    ExpandableCalendarScreen: {screen: ExpandableCalendarScreen},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
      headerLeft: (
        <Icon
          name="bars"
          type="font-awesome"
          size={24}
          color="white"
          containerStyle={{margin: 20}}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  },
);

const ChangePasswordNavigator = createStackNavigator(
  {
    ChangePassword: {screen: ChangePassword},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
      headerLeft: (
        <Icon
          name="bars"
          type="font-awesome"
          size={24}
          color="white"
          containerStyle={{margin: 20}}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  },
);

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.drawerContainer}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <View style={styles.drawerHeader}>
        <View>
          <Image source={require('../logo.png')} style={styles.drawerImage} />
        </View>
      </View>
      <DrawerItems
        {...props}
        labelStyle={{fontFamily: 'Montserrat-Medium', fontSize: 15}}
      />
      <View
        style={{
          borderBottomColor: 'rgba(0, 0, 0, .62)',
          borderBottomWidth: 1,
          margin: 16,
        }}
      />
      <TouchableOpacity
        style={{flexDirection: 'row', margin: 16, color: 'rgba(0, 0, 0, .87)'}}
        onPress={() => {
          globalScreen.handleLogout();
        }}>
        <Icon
          name="sign-out"
          type="font-awesome"
          size={24}
          color="rgba(0, 0, 0, .62)"
          style={{marginHorizontal: 16}}
        />
        <Text
          style={{
            fontWeight: 'bold',
            marginHorizontal: 32,
            color: 'rgba(0, 0, 0, .87)',
            fontFamily: 'Montserrat-Medium',
            fontSize: 15,
          }}>
          {' '}
          Logout{' '}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({tintColor}) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Attendance: {
      screen: AttendanceNavigator,
      navigationOptions: {
        title: 'Attendance',
        drawerLabel: 'Attendance',
        drawerIcon: ({tintColor}) => {
          return (
            <Icon name="list" type="font-awesome" size={24} color={tintColor} />
          );
        },
      },
    },
    Statistics: {
      screen: StatisticsNavigator,
      navigationOptions: {
        title: 'Statistics',
        drawerLabel: 'Statistics',
        drawerIcon: ({tintColor}) => (
          <Icon
            name="pie-chart"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Leaderboard: {
      screen: LeaderboardNavigator,
      navigationOptions: {
        title: 'Leaderboard',
        drawerLabel: 'Leaderboard',
        drawerIcon: ({tintColor}) => (
          <Icon name="signal" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Calendar: {
      screen: CalendarNavigator,
      navigationOptions: {
        title: 'Calendar',
        drawerLabel: 'Calendar',
        drawerIcon: ({tintColor}) => (
          <Icon
            name="calendar"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    ChangePassword: {
      screen: ChangePasswordNavigator,
      navigationOptions: {
        title: 'Change Password',
        drawerLabel: 'Change Password',
        drawerIcon: ({tintColor, focused}) => (
          <Icon name="key" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    drawerBackgroundColor: 'white',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: 'black',
    },
  },
);

const loginUser = creds => {
  return fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  })
    .then(response => response.json())
    .then(response => {
      if (response.id) {
        SecureStorage.setItem(
          'aasflogininfo',
          JSON.stringify({roll: response.roll, name: response.name}),
        );
        SecureStorage.getItem('aasflogininfo')
          .then(userdata => {
            globalScreen.setState({gotInfo: true});
            let aasflogininfo = JSON.parse(userdata);
            if (aasflogininfo) {
              globalScreen.setState({roll: aasflogininfo.roll});
              globalScreen.setState({name: aasflogininfo.name});
              globalScreen.props.fetchStats(aasflogininfo.roll);
              globalScreen.setState({loading: false});
            }
          })
          .catch(error => {
            Alert.alert(
              'Invalid Credentials',
              'Please check your credentials and try again',
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
          });
      } else {
        var error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => {
      Alert.alert(
        'Invalid Credentials',
        'Please check your credentials and try again',
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
    });
};

const Drawer = createAppContainer(MainNavigator);
var globalScreen;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempr: '',
      tempp: '',
      roll: '',
      name: '',
      password: '',
      loading: false,
      gotInfo: false,
    };
    // eslint-disable-next-line consistent-this
    globalScreen = this;
  }

  async componentWillMount() {
    const userdata = await SecureStorage.getItem('aasflogininfo');

    let aasflogininfo = await JSON.parse(userdata);
    if (aasflogininfo) {
      this.setState({roll: aasflogininfo.roll});
      this.setState({name: aasflogininfo.name});
      this.props.fetchStats(aasflogininfo.roll);
    }
    this.setState({gotInfo: true});
  }

  handleLogin() {
    this.setState({loading: true});
    var creds = {user: this.state.tempr, pass: this.state.tempp};
    loginUser(creds);
  }

  handleLogout() {
    SecureStorage.removeItem('aasflogininfo');
    this.setState({tempp: '', tempr: '', roll: '', password: ''});
  }

  componentDidMount() {
    this.props.fetchEvents();
    this.props.fetchLeaderboard();
  }

  render() {
    return this.state.gotInfo ? (
      this.state.roll !== '' ? (
        <Drawer />
      ) : (
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding" enabled>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 25,
                  marginBottom: 20,
                }}>
                Abhigyan Abhikaushalam Students' Forum
              </Text>
              <Image
                source={require('../logo.png')}
                style={styles.drawerImage}
              />
              <Input
                placeholder="Roll No.(20XXYYY-ZZZ)"
                placeholderTextColor="white"
                onChangeText={roll => this.setState({tempr: roll})}
                value={this.state.tempr}
                containerStyle={styles.formInput}
                inputStyle={{
                  color: 'white',
                  fontFamily: 'Andika-Regular',
                  fontSize: 17,
                }}
              />
              <Input
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry={true}
                onChangeText={password => this.setState({tempp: password})}
                value={this.state.tempp}
                containerStyle={styles.formInput}
                inputStyle={{
                  color: 'white',
                  fontFamily: 'Andika-Regular',
                  fontSize: 17,
                }}
              />
              <Button
                onPress={() => this.handleLogin()}
                title="Login"
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
          </KeyboardAvoidingView>
        </View>
      )
    ) : null;
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
  drawerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  drawerHeader: {
    backgroundColor: 'black',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    width: 140,
    height: 140,
    alignSelf: 'center',
  },
  formInput: {
    alignSelf: 'center',
    marginTop: 20,
    width: 250,
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Main);
