import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistCombineReducers} from 'redux-persist';

import {stats} from './Stats';
import {events} from './Events';
import {leaderboard} from './Leaderboard';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      stats,
      leaderboard,
      events,
    }),
    applyMiddleware(thunk),
  );

  const persistor = persistStore(store);

  return {persistor, store};
};
