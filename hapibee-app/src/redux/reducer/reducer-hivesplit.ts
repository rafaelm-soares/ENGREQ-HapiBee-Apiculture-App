import { Action, Reducer } from "redux";
import { HiveSplitList } from "src/model/myTypes";
import { InitialStateHiveSplitList } from "./initial-state";
import { HiveSplitsActions } from "../actions/action-hivesplit";

const unloadedState: HiveSplitList = InitialStateHiveSplitList;

export const reducer: Reducer<HiveSplitList> = (
  state: HiveSplitList | undefined,
  incomingAction: Action
): HiveSplitList => {
  if (state === undefined) {
    return { ...unloadedState };
  }
  const action = incomingAction as HiveSplitsActions;
  switch (action.type) {
    case "GET_HIVESPLITLIST":
      return {
        ...state,
        hivesplits: action.payload.hivesplits,
      };
  }
  return state;
};
