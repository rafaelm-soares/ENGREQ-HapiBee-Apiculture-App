// import { cloneDeep } from "lodash";
import { INITIAL_STATE } from "../reducer/initial-state";

//data has no expiration time
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    const savedState = JSON.parse(serializedState);
    delete savedState.response; //optional remove item from store state
    return savedState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: typeof INITIAL_STATE) => {
  let stateToSave: any = state;
  // let stateToSave: any = cloneDeep(state);
  delete stateToSave.response; // do not persist toast messages
  const serializedState = JSON.stringify(stateToSave);
  localStorage.setItem("state", serializedState);
};

export const clearLocalStorage = () => {
  localStorage.removeItem("state");
};
