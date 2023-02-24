import { Dispatch } from 'redux';
import { WatchActionTypes, WatchThunkAction } from './types';

export const updateTimeNow = (timeNow: string): WatchActionTypes => {
  return {
    type: 'watch/UPDATE_TIME_NOW',
    payload: timeNow,
  };
};

export const showTooltip = (position: {
  left: number;
  top: number;
}): WatchThunkAction => {
  return (dispatch: Dispatch<WatchActionTypes>) => {
    dispatch({
      type: 'watch/SHOW_TOOLTIP',
      payload: position,
    });
    setTimeout(() => {
      dispatch(hideTooltip());
    }, 5000);
  };
};

export const hideTooltip = (): WatchActionTypes => {
  return {
    type: 'watch/HIDE_TOOLTIP',
  };
};

export const updateHandsAngles = (handsAngles: {
  hours: number;
  minutes: number;
  seconds: number;
}): WatchActionTypes => {
  return {
    type: 'watch/UPDATE_HANDS_ANGLES',
    payload: handsAngles,
  };
};

export const updateTimeAndHands = (): WatchThunkAction => {
  return (dispatch) => {
    const now = new Date();
    const [hours, minutes, seconds] = [
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ];
    const handsAngles = {
      hours: (hours * 30 + minutes * 0.5) % 360,
      minutes: (minutes * 6 + seconds * 0.1) % 360,
      seconds: (seconds * 6) % 360,
    };
    dispatch(updateTimeNow(now.toLocaleTimeString('ko-KR')));
    dispatch(updateHandsAngles(handsAngles));
  };
};
