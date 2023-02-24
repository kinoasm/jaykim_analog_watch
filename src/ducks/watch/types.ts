import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../app/store';

export const UPDATE_TIME_NOW = 'watch/UPDATE_TIME_NOW';
export const SHOW_TOOLTIP = 'watch/SHOW_TOOLTIP';
export const HIDE_TOOLTIP = 'watch/HIDE_TOOLTIP';
export const UPDATE_HANDS_ANGLES = 'watch/UPDATE_HANDS_ANGLES';

interface UpdateTimeNowAction {
  type: typeof UPDATE_TIME_NOW;
  payload: string;
}

interface ShowTooltipAction {
  type: typeof SHOW_TOOLTIP;
  payload: { left: number; top: number };
}

interface HideTooltipAction {
  type: typeof HIDE_TOOLTIP;
}

interface UpdateHandsAnglesAction {
  type: typeof UPDATE_HANDS_ANGLES;
  payload: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export type WatchActionTypes =
  | UpdateTimeNowAction
  | ShowTooltipAction
  | HideTooltipAction
  | UpdateHandsAnglesAction;

export type WatchThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  WatchActionTypes
>;

export type WatchAction = WatchActionTypes | WatchThunkAction;
