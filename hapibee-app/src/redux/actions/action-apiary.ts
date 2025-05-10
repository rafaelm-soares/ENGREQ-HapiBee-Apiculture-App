import { APIResponseHandler, Apiary, Hive, NewApiary, NewHive } from "src/model/myTypes";
import fetchApi from "./fetch";
import { Dispatch } from "redux";

type getApiariesAction = {
  type: "GET_APIARIES";
  payload: Apiary[];
};

type createApiaryAction = {
  type: "CREATE_APIARY";
  payload: APIResponseHandler;
};

type aproveApiaryAction = {
  type: "APROVE_APIARIES"; //approve-apiary/{id}
  payload: string;
};

type updateApiaryAction = {
  type: "UPDATE_APIARIES"; //update-apiary
  payload: Apiary;
};

type deleteApiaryAction = {
  type: "DELETE_APIARIES";
  payload: APIResponseHandler;
};

type getHivesAction = {
  type: "GET_HIVES";
  payload: Hive[];
};

type createHiveAction = {
  type: "CREATE_HIVE";
  payload: APIResponseHandler;
};

export type ApiariesActions =
  | getApiariesAction
  | createApiaryAction
  | aproveApiaryAction
  | updateApiaryAction
  | deleteApiaryAction
  | getHivesAction
  | createHiveAction;


export function getApiaries() {
  return async function action(dispatch: Dispatch<ApiariesActions>) {
    try {
      const response = await fetchApi(`/api/protected/get-apiary-list`, {
        method: 'GET',
      });

      if (response) {
        const apiaries: Apiary[] = response;
        dispatch({
          type: 'GET_APIARIES',
          payload: apiaries
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

export function createApiary(apiary: NewApiary) {
  return async function action(dispatch: Dispatch<ApiariesActions>) {
    try {
      const data = {
        name: apiary.name,
        numberOfHives: apiary.numberOfHives,
        productionGoal: apiary.productionGoal,
        productionType: apiary.productionType,
        location: {
          municipality: apiary.municipality,
          parish: apiary.parish,
          place: apiary.place,
          latitude: apiary.latitude,
          longitude: apiary.longitude,
        },
        isApproved: apiary.isApproved,
      };
      const response = await fetchApi(`/api/protected/create-apiary`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const apiary: Apiary = response;
        dispatch({
          type: 'CREATE_APIARY',
          payload: {
            status: 'success',
            description: 'Apiary created successfully.',
            type: 'create-apiary',
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

export function updateApiary(apiary: NewApiary) {
  return async function action(dispatch: Dispatch<ApiariesActions>) {
    try {
      const data = {
        id: apiary.id,
        name: apiary.name,
        numberOfHives: apiary.numberOfHives,
        productionGoal: apiary.productionGoal,
        productionType: apiary.productionType,
        location: {
          municipality: apiary.municipality,
          parish: apiary.parish,
          place: apiary.place,
          latitude: apiary.latitude,
          longitude: apiary.longitude,
        },
        isApproved: apiary.isApproved,
      };
      const response = await fetchApi(`/api/protected/update-apiary`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const apiary: Apiary = response;
        dispatch({
          type: 'CREATE_APIARY',
          payload: {
            status: 'success',
            description: 'Apiary updated successfully.',
            type: 'update-apiary',
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


export function getHives() {
  return async function action(dispatch: Dispatch<ApiariesActions>) {
    try {
      const response = await fetchApi(`/api/protected/get-hive-list`, {
        method: 'GET',
      });

      if (response) {
        const hives: Hive[] = response;
        dispatch({
          type: 'GET_HIVES',
          payload: hives
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

export function createHive(hive: NewHive) {
  return async function action(dispatch: Dispatch<ApiariesActions>) {
    try {
      const data = hive;
      const response = await fetchApi(`/api/protected/create-hive`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const hive: Hive = response;
        dispatch({
          type: 'CREATE_HIVE',
          payload: {
            status: 'success',
            description: 'Hive created successfully.',
            type: 'create-hive',
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
