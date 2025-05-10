import { Action, Reducer } from "redux";
import { Apiaries } from "src/model/myTypes";
import { InitialStateApiaries } from "./initial-state";
import { ApiariesActions } from "../actions/action-apiary";

const unloadedState: Apiaries = InitialStateApiaries;

export const reducer: Reducer<Apiaries> = (
  state: Apiaries | undefined,
  incomingAction: Action
): Apiaries => {
  if (state === undefined) {
    return { ...unloadedState };
  }
  const action = incomingAction as ApiariesActions;
  switch (action.type) {
    case "GET_APIARIES":
      return {
        ...state,
        apiaries: action.payload,
      };
    case "GET_HIVES":
      return {
        ...state,
        hives: action.payload,
      };
  }
  return state;
};
