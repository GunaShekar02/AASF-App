/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SecureStorage from 'react-native-secure-storage';

/*** QUOTE CREDITS : They Said So ***/
const fetchQuote = () => {
  return fetch('https://quotes.rest/qod', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        var err = new Error('Too many requests');
        throw err;
      }
      globalScreen.setState({
        quote: response.contents.quotes[0].quote,
        author: response.contents.quotes[0].author
          ? response.contents.quotes[0].author
          : 'Anonymous',
        fetchedQuote: true,
      });
      SecureStorage.setItem(
        'qod',
        JSON.stringify({
          quote: response.contents.quotes[0].quote,
          date: response.contents.quotes[0].date,
          author: response.contents.quotes[0].author
            ? response.contents.quotes[0].author
            : 'Anonymous',
        }),
      );
    })
    .catch(() => {
      SecureStorage.getItem('qod').then(qod => {
        let quote = JSON.parse(qod);
        globalScreen.setState({
          quote: quote.quote,
          author: quote.author,
          fetchedQuote: true,
        });
      });
    });
};

var globalScreen;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roll: '',
      name: '',
      quote: '',
      author: '',
      fetchedQuote: false,
    };
    // eslint-disable-next-line consistent-this
    globalScreen = this;
  }

  componentDidMount() {
    SecureStorage.getItem('aasflogininfo').then(userdata => {
      let aasflogininfo = JSON.parse(userdata);
      if (aasflogininfo) {
        this.setState({
          roll: aasflogininfo.roll,
          name: aasflogininfo.name,
        });
      }
    });
    SecureStorage.getItem('qod')
      .then(qod => {
        let quote = JSON.parse(qod);
        if (quote === null) {
          fetchQuote();
        } else if (quote.date === new Date().toISOString().split('T')[0]) {
          this.setState({
            quote: quote.quote,
            author: quote.author,
            fetchedQuote: true,
          });
        } else {
          fetchQuote();
        }
      })
      .catch(() => fetchQuote());
  }

  static navigationOptions = {
    title: 'Home',
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
      <View style={styles.container}>
        {this.state.name !== '' ? (
          <React.Fragment>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Montserrat-Regular',
                fontSize: 20,
              }}>
              WELCOME
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#f9a825',
                fontFamily: 'Montserrat-Medium',
                fontSize: 32,
                marginBottom: 20,
              }}>
              {this.state.name.toUpperCase()}
            </Text>
          </React.Fragment>
        ) : null}

        {this.state.fetchedQuote ? (
          <React.Fragment>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Andika-Regular',
                fontSize: 15,
              }}>
              "{this.state.quote}"
            </Text>
            <Text
              style={{
                textAlign: 'right',
                alignSelf: 'stretch',
                color: 'white',
                fontFamily: 'andika',
                fontSize: 15,
              }}>
              -{this.state.author}
            </Text>
          </React.Fragment>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black',
    height: '100%',
  },
});

export default Home;
