/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import * as ActionTypes from './ActionTypes';
import events from './calendar.js';

export const fetchStats = roll => dispatch => {
  return fetch(FETCH_STATS_URL)
    .then(response => response.json())
    .then(response => dispatch(addStats(response)))
    .catch(err => dispatch(statsFailed(err.message)));
};

export const statsFailed = errmess => ({
  type: ActionTypes.STATS_FAILED,
  payload: errmess,
});

export const addStats = response => ({
  type: ActionTypes.ADD_STATS,
  payload: response,
});

export const fetchLeaderboard = () => dispatch => {
  return fetch(FETCH_LEADERBOARD_URL)
    .then(response => response.json())
    .then(response => {
      var curScore = 0,
        count = 0;
      response.map(student => {
        if (curScore != student.score) {
          curScore = student.score;
          count++;
        }
        student.rank = count;
      });
      dispatch(addLeaderboard(response));
    })
    .catch(err => dispatch(leadeboardFailed(err.message)));
};

export const leadeboardFailed = errmess => ({
  type: ActionTypes.LEADERBOARD_FAILED,
  payload: errmess,
});

export const addLeaderboard = response => ({
  type: ActionTypes.ADD_LEADERBOARD,
  payload: response,
});

export const fetchEvents = () => dispatch => {
  var newEvents = {};
  for (var i = 0; i < events.length; ++i) {
    var startDate = new Date(events[i].start.split('T')[0]);
    var startTime = startDate.getTime();
    var endDate = new Date(events[i].end.split('T')[0]);
    var endTime = endDate.getTime();
    if (startTime === endTime) {
      var curDate = new Date(
        startTime - new Date(startTime).getTimezoneOffset() * 60000,
      )
        .toISOString()
        .split('T')[0];
      newEvents[curDate] = [];
      newEvents[curDate].push({name: events[i].title});
    } else {
      var j = 1;
      while (startTime <= endTime) {
        var curDate = new Date(
          startTime - new Date(startTime).getTimezoneOffset() * 60000,
        )
          .toISOString()
          .split('T')[0];
        newEvents[curDate] = [];
        newEvents[curDate].push({name: events[i].title + ' Day-' + j});
        startTime += 60 * 1000 * 60 * 24;
        j += 1;
      }
    }
  }
  dispatch(addEvents(newEvents));
};

export const addEvents = eventsArray => ({
  type: ActionTypes.ADD_EVENTS,
  payload: eventsArray,
});
