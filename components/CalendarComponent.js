/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Agenda} from 'react-native-calendars';

const mapStateToProps = state => {
  return {
    events: state.events,
  };
};

class ExpandableCalendarScreen extends Component {
  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  renderItem(item) {
    return (
      <View>
        <Text
          style={{
            color: 'white',
            textAlign: 'left',
            fontFamily: 'Andika-Regular',
            fontSize: 15,
          }}>
          {item.name}
        </Text>
      </View>
    );
  }

  static navigationOptions = {
    title: 'Calendar',
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      textAlign: 'left',
      fontFamily: 'Montserrat-Medium',
      fontSize: 15,
    },
  };

  render() {
    return (
      <Agenda
        items={this.props.events.events}
        selected={new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000,
        ).toISOString()}
        renderItem={this.renderItem.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        minDate={'2019-08-01'}
        maxDate={'2020-04-30'}
        theme={{
          selectedDayBackgroundColor: 'black',
          dotColor: 'black',
          agendaKnobColor: 'black',
          backgroundColor: 'black',
          agendaDayTextColor: 'white',
          agendaDayNumColor: 'white',
        }}
      />
    );
  }
}

export default connect(mapStateToProps)(ExpandableCalendarScreen);
