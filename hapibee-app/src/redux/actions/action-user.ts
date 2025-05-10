import { User, NewUser, APIResponseHandler } from "src/model/myTypes";
import fetchApi from "./fetch";
import { Dispatch } from "redux";

type postLoginAction = {
  type: "LOGIN";
  payload: User;
};

type postRegisterAction = {
  type: "REGISTER";
  payload: APIResponseHandler;
};

type postLogoutAction = {
  type: "LOGOUT";
};

type getUserAction = {
  type: "GET_USER";
  payload: User;
};

export type UserActions =
  | postLoginAction
  | postRegisterAction
  | postLogoutAction
  | getUserAction;

export function login(email: string, password: string) {
  return async function action(dispatch: Dispatch<UserActions>) {
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await fetchApi(`/auth/sign-in`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        const user: User = response;
        dispatch({ type: 'LOGIN', payload: user });
      } else {
        // Handle the case where the response is null or invalid
        console.error('Invalid response from server');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
}

export function signUp(user: NewUser) {
  return async function action(dispatch: Dispatch<UserActions>) {
    try {
      const data = {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        postalNumber: user.postalNumber,
        postal: user.postal,
        beekeeper: {
          officialBeekeeperID: user.officialBeekeeperID,
          nif: user.nif || 0,
        }
      };
      const response = await fetchApi(`/auth/sign-up`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const user: User = response;
        dispatch({
          type: 'REGISTER',
          payload: {
            status: 'success',
            description: 'User registered successfully.',
            type: 'register-user',
          }
        });
      } else {
        // Handle the case where the response is null or invalid
        console.error('Invalid response from server');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
}
