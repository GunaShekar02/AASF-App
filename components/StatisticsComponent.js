/* eslint-disable curly */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Badge, Card} from 'react-native-elements';
import {connect} from 'react-redux';
import PieChart from 'react-native-pie-chart';

const mapStateToProps = state => {
  return {
    stats: state.stats,
  };
};

class Statistics extends Component {
  static navigationOptions = {
    title: 'Statistics',
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      textAlign: 'left',
      fontFamily: 'Montserrat-Medium',
      fontSize: 15,
    },
  };

  render() {
    const chart_wh = 250;
    var technical = this.props.stats.technical;
    var managerial = this.props.stats.managerial;
    var literary = this.props.stats.literary;
    const series = [
      parseInt(technical, 10),
      parseInt(managerial, 10),
      parseInt(literary, 10),
    ];
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B'];

    return this.props.stats.technical == '0' &&
      this.props.stats.managerial == '0' &&
      this.props.stats.literary == '0' ? (
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
              fontFamily: 'andika',
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
        <View style={{margin: 20}}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Andika-Regular',
              fontSize: 20,
              marginBottom: 5,
            }}>
            Total Score : {this.props.stats.score}
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Andika-Regular',
              fontSize: 20,
            }}>
            Current Rank : {this.props.stats.rank}
            {'\n'}
          </Text>
          <View
            style={{
              backgroundColor: 'black',
              marginBottom: 20,
              marginLeft: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Badge
                value=" "
                badgeStyle={{backgroundColor: '#F44336', borderRadius: 0}}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Andika-Regular',
                  fontSize: 15,
                  marginBottom: 2,
                }}>
                {' '}
                Technical Score : {this.props.stats.technical}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Badge
                value=" "
                badgeStyle={{backgroundColor: '#2196F3', borderRadius: 0}}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Andika-Regular',
                  fontSize: 15,
                  marginBottom: 2,
                }}>
                {' '}
                Managerial Score : {this.props.stats.managerial}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Badge
                value=" "
                badgeStyle={{backgroundColor: '#FFEB3B', borderRadius: 0}}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Andika-Regular',
                  fontSize: 15,
                }}>
                {' '}
                Oratory and Literary Score : {this.props.stats.literary}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <PieChart
              chart_wh={chart_wh}
              series={series}
              sliceColor={sliceColor}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <Card
              title="ACHIEVEMENTS"
              titleStyle={{
                color: '#f9a825',
                letterSpacing: 1,
                fontFamily: 'montserrat',
                fontSize: 20,
              }}
              containerStyle={{
                width: '90%',
                backgroundColor: 'black',
                borderColor: '#f9a825',
              }}>
              <Text
                style={{
                  color: 'white',
                  marginBottom: 5,
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 15,
                }}>
                FIRST IN :{' '}
                {this.props.stats.first ? (
                  this.props.stats.first.map((event, i) => {
                    if (i == this.props.stats.first.length - 1)
                      return (
                        <Text
                          key={i}
                          style={{
                            color: 'white',
                            fontFamily: 'Andika-Regular',
                            fontSize: 15,
                          }}>
                          {event.toUpperCase()}
                        </Text>
                      );
                    else
                      return (
                        <Text
                          key={i}
                          style={{
                            color: 'white',
                            fontFamily: 'Andika-Regular',
                            fontSize: 15,
                          }}>
                          {event.toUpperCase()}
                          {', '}
                        </Text>
                      );
                  })
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Andika-Regular',
                      fontSize: 15,
                    }}>
                    Yet to come
                  </Text>
                )}
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginBottom: 5,
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 15,
                }}>
                SECOND IN :{' '}
                {this.props.stats.second ? (
                  this.props.stats.second.map((event, i) => {
                    if (i == this.props.stats.second.length - 1)
                      return (
                        <Text
                          key={i}
                          style={{
                            color: 'white',
                            fontFamily: 'Andika-Regular',
                            fontSize: 15,
                          }}>
                          {event.toUpperCase()}
                        </Text>
                      );
                    else
                      return (
                        <Text
                          key={i}
                          style={{
                            color: 'white',
                            fontFamily: 'Andika-Regular',
                            fontSize: 15,
                          }}>
                          {event.toUpperCase()}
                          {', '}
                        </Text>
                      );
                  })
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Andika-Regular',
                      fontSize: 15,
                    }}>
                    Yet to come
                  </Text>
                )}
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginBottom: 5,
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 15,
                }}>
                THIRD IN :{' '}
                {this.props.stats.third ? (
                  this.props.stats.third.map((event, i) => {
                    if (i == this.props.stats.third.length - 1)
                      return (
                        <Text
                          key={i}
                          style={{
                            color: 'white',
                            fontFamily: 'Andika-Regular',
                            fontSize: 15,
                          }}>
                          {event.toUpperCase()}
                        </Text>
                      );
                    else
                      return (
                        <Text
                          key={i}
                          style={{
                            color: 'white',
                            fontFamily: 'Andika-Regular',
                            fontSize: 15,
                          }}>
                          {event.toUpperCase()}
                          {', '}
                        </Text>
                      );
                  })
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Andika-Regular',
                      fontSize: 15,
                    }}>
                    Yet to come
                  </Text>
                )}
              </Text>
              {/* <Text style={{color: 'white', marginBottom: 5, fontFamily: 'Montserrat-Medium', fontSize: 15}}>
                  SECOND IN : {" "}
                  {this.props.stats.second?this.props.stats.second.map((event, i) => {
                    if(i == this.props.stats.second.length - 1)
                      return(
                        <Text key={i} style={{color: 'white', fontFamily: 'Andika-Regular', fontSize: 15}}>{event.toUpperCase()}</Text>
                      );
                    else
                      return(
                        <Text key={i} style={{color: 'white', fontFamily: 'Andika-Regular', fontSize: 15}}>{event.toUpperCase()}{", "}</Text>
                      );
                  }):<Text style={{color: 'white', fontFamily: 'Andika-Regular', fontSize: 15}}>Yet to come</Text>}
                </Text>
                <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 15}}>
                  THIRD IN : {" "}
                  {this.props.stats.third?this.props.stats.third.map((event, i) => {
                    if(i == this.props.stats.third.length - 1)
                      return(
                        <Text key={i} style={{color: 'white', fontFamily: 'Andika-Regular', fontSize: 15}}>{event.toUpperCase()}</Text>
                      );
                    else
                      return(
                        <Text key={i} style={{color: 'white', fontFamily: 'Andika-Regular', fontSize: 15}}>{event.toUpperCase()}{", "}</Text>
                      );
                  }):<Text style={{color: 'white', fontFamily: 'Andika-Regular', fontSize: 15}}>Yet to come</Text>}
                </Text> */}
            </Card>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Statistics);
