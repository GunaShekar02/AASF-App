import * as ActionTypes from './ActionTypes';

export const leaderboard = (
  state = {isLoading: true, leaderboard: [], errMess: null},
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_LEADERBOARD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        leaderboard: action.payload,
      };

    case ActionTypes.LEADERBOARD_LOADING:
      return {...state, isLoading: true, errMess: null};

    case ActionTypes.LEADERBOARD_FAILED:
      return {...state, isLoading: false, errMess: action.payload};

    default:
      return state;
  }
};
