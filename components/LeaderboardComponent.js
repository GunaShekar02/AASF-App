/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import SecureStorage from 'react-native-secure-storage';

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard,
    stats: state.stats,
  };
};

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roll: '',
      name: '',
    };
  }

  async componentDidMount() {
    SecureStorage.getItem('aasflogininfo').then(userdata => {
      let aasflogininfo = JSON.parse(userdata);
      if (aasflogininfo) {
        this.setState({
          roll: aasflogininfo.roll,
          name: aasflogininfo.name,
        });
      }
    });
  }

  static navigationOptions = {
    title: 'Leaderboard',
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      textAlign: 'left',
      fontFamily: 'Montserrat-Medium',
      fontSize: 15,
    },
  };

  render() {
    return !this.props.leaderboard.leaderboard[0].score ||
      // eslint-disable-next-line eqeqeq
      this.props.leaderboard.leaderboard[0].score == 0 ? (
      <View
        style={{
          backgroundColor: 'black',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{margin: 20}}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Andika-Regular',
              fontSize: 35,
              textAlign: 'center',
            }}>
            {' '}
            You are yet to start with AASF!{' '}
          </Text>
        </View>
      </View>
    ) : (
      <ScrollView style={{backgroundColor: 'black'}}>
        <View
          style={{
            backgroundColor: 'white',
            height: 50,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Andika-Regular',
              fontSize: 15,
              marginHorizontal: 10,
            }}>
            {this.props.stats.rank}. {this.state.name} -{' '}
            {this.props.stats.score}
          </Text>
        </View>
        {this.props.leaderboard.leaderboard.slice(0, 20).map((student, i) => {
          return (
            <Text
              key={i}
              style={{
                color: 'white',
                fontFamily: 'Andika-Regular',
                fontSize: 15,
                marginHorizontal: 10,
              }}>
              {student.rank}. {student.user_name} - {student.score}
              {'\n'}
            </Text>
          );
        })}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Leaderboard);
