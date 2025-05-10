import { applyMiddleware, combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import merge from "lodash/merge";
import throttle from "lodash/throttle";
import { loadState, saveState } from "src/redux/storage/localStorage";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { reducer as frontendReducer } from "src/redux/reducer/reducer-frontend";
import { reducer as userReducer } from "src/redux/reducer/reducer-user";
import { reducer as apiaryReducer } from "src/redux/reducer/reducer-apiary";
import { reducer as fieldBookReducer } from "src/redux/reducer/reducer-fieldBook";
import { reducer as hiveSplitReducer } from "src/redux/reducer/reducer-hivesplit";
import { reducer as declarationsReducer } from "src/redux/reducer/reducer-declarations";


/*https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e*/
const persistedState = merge({ ...INITIAL_STATE }, { ...loadState() });

const reducers = combineReducers({
  settings: frontendReducer,
  user: userReducer,
  apiaries: apiaryReducer,
  fieldBook: fieldBookReducer,
  hivesplits: hiveSplitReducer,
  declarations: declarationsReducer,
});

const store = createStore(reducers, persistedState, applyMiddleware(thunk));

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;