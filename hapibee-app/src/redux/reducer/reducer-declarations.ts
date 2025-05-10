import { Action, Reducer } from "redux";
import { Declarations } from "src/model/myTypes";
import { InitialStateDeclarations } from "./initial-state";
import { DeclarationsActions } from "../actions/action-declarations";

const unloadedState: Declarations = InitialStateDeclarations;

export const reducer: Reducer<Declarations> = (
  state: Declarations | undefined,
  incomingAction: Action
): Declarations => {
  if (state === undefined) {
    return { ...unloadedState };
  }
  const action = incomingAction as DeclarationsActions;
  switch (action.type) {
    case "GET_DOCUMENTS":
      return {
        ...state,
        documents: action.payload,
      };
    case "GET_BEEKEEPER":
      return {
        ...state,
        beekeeper: action.payload,
      };
    case "GET_DOCUMENT_APIARY_INFO":
      return {
        ...state,
        apiaryInfo: action.payload,
      };
    case "GET_DOCUMENT_TOTAL_APIARY_INFO":
      return {
        ...state,
        listApiarysWithInfo: action.payload,
      };
  }
  return state;
};
