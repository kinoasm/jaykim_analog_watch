import {
  WatchActionTypes,
  UPDATE_TIME_NOW,
  SHOW_TOOLTIP,
  HIDE_TOOLTIP,
  UPDATE_HANDS_ANGLES,
} from './types';

interface WatchState {
  timeNow: string;
  tooltipPosition: { left: number; top: number; show: boolean };
  handsAngles: { hours: number; minutes: number; seconds: number };
}

const initialState: WatchState = {
  timeNow: '',
  tooltipPosition: { left: 0, top: 0, show: false },
  handsAngles: { hours: 0, minutes: 0, seconds: 0 },
};

export default function watchReducer(
  state = initialState,
  action: WatchActionTypes
): WatchState {
  switch (action.type) {
    case UPDATE_TIME_NOW:
      return { ...state, timeNow: action.payload };
    case SHOW_TOOLTIP:
      return {
        ...state,
        tooltipPosition: {
          left: action.payload.left,
          top: action.payload.top,
          show: true,
        },
      };
    case HIDE_TOOLTIP:
      return {
        ...state,
        tooltipPosition: { ...state.tooltipPosition, show: false },
      };
    case UPDATE_HANDS_ANGLES:
      return { ...state, handsAngles: action.payload };
    default:
      return state;
  }
}
