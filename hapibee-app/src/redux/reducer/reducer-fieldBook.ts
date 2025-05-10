import { Action, Reducer } from "redux";
import { FieldBook } from "src/model/myTypes";
import { InitialStateFiedBook } from "./initial-state";
import { FieldBookActions } from "../actions/action-fieldBook";

const unloadedState: FieldBook = InitialStateFiedBook;

export const reducer: Reducer<FieldBook> = (
  state: FieldBook | undefined,
  incomingAction: Action
): FieldBook => {
  if (state === undefined) {
    return { ...unloadedState };
  }
  const action = incomingAction as FieldBookActions;
  switch (action.type) {
    case "GET_INSPECTIONS":
      return {
        ...state,
        inspections: action.payload
      };
    case "GET_TRANSFERS":
      return {
        ...state,
        transfers: action.payload
      };
    case "GET_CRESTA":
      return {
        ...state,
        crestas: action.payload
      };
    case "GET_INSPECTION_SCHEDULE":
      return {
        ...state,
        schedule: action.payload
      };
  }
  return state;
};
