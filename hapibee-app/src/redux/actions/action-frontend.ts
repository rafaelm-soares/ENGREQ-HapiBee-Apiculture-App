import { PaginationDTO, SeoDTO } from "src/model/myTypes";

type getSeoAction = {
  type: "GET_SEO";
  payload: SeoDTO;
};

type setSidebarDesktopAction = {
  type: "SET_SIDEBAR_DESKTOP";
  payload: boolean;
};

type setThemeAction = {
  type: "SET_THEME_MODE";
  payload: boolean;
};

type changePaginationAction = {
  type: "SET_PAGINATION";
  payload: SeoDTO;
};

export type SettingsActions =
  | getSeoAction
  | setSidebarDesktopAction
  | setThemeAction
  | changePaginationAction;

export function sidebarDesktopOpenClose(isSidebarDesktopOpen: boolean) {
  //Set state for sidebarDesktop
  return {
    type: "SET_SIDEBAR_DESKTOP",
    payload: isSidebarDesktopOpen,
  };
};

export function change(theme: boolean) {
  //Set state for sidebarDesktop
  return {
    type: "SET_THEME_MODE",
    payload: theme,
  };
};

export function changePagination(pagination: PaginationDTO) {
  //Set state for pagination
  return {
    type: "SET_PAGINATION",
    payload: pagination,
  };
};

export function getSeo() {
  //Set state for Seo
};
