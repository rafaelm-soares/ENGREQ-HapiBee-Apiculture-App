import { Action, Reducer } from "redux";
import { User } from "src/model/myTypes";
import { InitialStateUser } from "./initial-state";
import { UserActions } from "src/redux/actions/action-user";

const unloadedState: User = InitialStateUser;

export const reducer: Reducer<User> = (
  state: User | undefined,
  incomingAction: Action
): User => {
  if (state === undefined) {
    return { ...unloadedState };
  }
  const action = incomingAction as UserActions;
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload
      };
    case "GET_USER":
      return {
        ...state,
        ...action.payload
      };
     /*case "LOGOUT":
      return {
        ...unloadedState,
      }; */
  }
  return state;
};
