import { Action, Reducer } from "redux";
import { Settings } from "src/model/myTypes";
import { InitialStateSettings } from "./initial-state";
import { SettingsActions } from "src/redux/actions/action-frontend";
import { UserActions } from "src/redux/actions/action-user";

const unloadedState: Settings = InitialStateSettings;

export const reducer: Reducer<Settings> = (
  state: Settings | undefined,
  incomingAction: Action
): Settings => {
  if (state === undefined) {
    return { ...unloadedState };
  }

  const action = incomingAction as SettingsActions | UserActions;
  switch (action.type) {
    case "GET_SEO":
      return {
        ...state,
        seo: {
          seo_title: action.payload.seo_title,
          seo_description: action.payload.seo_description,
        },
      };
    case "SET_SIDEBAR_DESKTOP":
      return {
        ...state,
        isSidebarDesktopOpen: action.payload,
      };
    case "LOGOUT":
      return {
        ...unloadedState,
      };
  }
  return state;
};
