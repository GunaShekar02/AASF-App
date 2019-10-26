import * as ActionTypes from './ActionTypes';

export const stats = (
  state = {
    isLoading: true,
    score: 0,
    technical: 0,
    managerial: 0,
    literary: 0,
    rank: 0,
    first: [],
    second: [],
    third: [],
    errMess: null,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_STATS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        score: action.payload.score,
        technical: action.payload.technical,
        managerial: action.payload.managerial,
        literary: action.payload.literary,
        rank: action.payload.rank,
        first: action.payload.first,
        second: action.payload.second,
        third: action.payload.third,
      };

    case ActionTypes.STATS_LOADING:
      return {...state, isLoading: true, errMess: null};

    case ActionTypes.STATS_FAILED:
      return {...state, isLoading: false, errMess: action.payload};

    default:
      return state;
  }
};
