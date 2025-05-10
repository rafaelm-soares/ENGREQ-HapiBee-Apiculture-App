import { APIResponseHandler, HiveSplitList, HiveSplit, NewHiveSplit } from "src/model/myTypes";
import fetchApi from "./fetch";
import { Dispatch } from "redux";

type getHiveSplitListAction = {
  type: "GET_HIVESPLITLIST";
  payload: HiveSplitList;
};

type createHiveSplitAction = {
  type: "CREATE_HIVESPLIT";
  payload: APIResponseHandler;
};

type updateHiveSplitAction = {
  type: "UPDATE_HIVESPLIT";
  payload: APIResponseHandler;
};

type deleteHiveSplitAction = {
  type: "DELETE_HIVESPLIT";
  payload: APIResponseHandler;
};

export type HiveSplitsActions =
  | getHiveSplitListAction
  | createHiveSplitAction
  | updateHiveSplitAction
  | deleteHiveSplitAction;

  
export function getHiveSplitList() {
  return async function action(dispatch: Dispatch<HiveSplitsActions>) {
    try {
      const response = await fetchApi(`/api/protected/field-book/get-hive-split-list`, {
        method: 'GET',
      });

      if (response) {
        const hivesplit: HiveSplit[] = response;
        dispatch({
          type: 'GET_HIVESPLITLIST',
          payload: {
            hivesplits: hivesplit,
          }
        });
      } else {
        console.error('Invalid response from server');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
}

export function createHiveSplit(hivesplit: NewHiveSplit) {
  return async function action(dispatch: Dispatch<HiveSplitsActions>) {
    try {
      const listOfHiveDestID = hivesplit.listOfHiveDestID.trim().split(',');
      const data = {
        apiaryID: hivesplit.apiaryID,
        hiveOrigID: hivesplit.hiveOrigID,
        listOfHiveDestID: listOfHiveDestID,
        reproductionQueen: hivesplit.reproductionQueen,
        reproductionManagement: hivesplit.reproductionManagement,
        hiveSplitDate: hivesplit.hiveSplitDate,
        productionType: hivesplit.productionType,
        quantitiy: hivesplit.quantitiy,
        quantityType: hivesplit.quantityType,
      };
      const response = await fetchApi(`/api/protected/field-book/register-split-hive`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const apiary: HiveSplit = response;
        dispatch({
          type: 'CREATE_HIVESPLIT',
          payload: {
            status: 'success',
            description: 'Hive Split created successfully.',
            type: 'register-split-hive',
          }
        });
      } else {
        console.error('Invalid response from server');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
}

export function deleteHiveSplit(id: number) {
  return async function action(dispatch: Dispatch<HiveSplitsActions>) {
    try {
      const response = await fetchApi(`/api/protected/field-book/delete-hive-split/${id}`, {
        method: 'DELETE',
      });

      if (response) {
        dispatch({
          type: 'DELETE_HIVESPLIT',
          payload: {
            status: 'success',
            description: 'Hive Split deleted successfully.',
            type: 'delete-hive-split',
          },
        });
      } else {
        console.error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      return null;
    }
  };
}

export function updateHiveSplit(hivesplit: HiveSplit) {
  return async function action(dispatch: Dispatch<HiveSplitsActions>) {
    try {
      const listOfHiveDestID = hivesplit.listOfHiveDestID;
      const data = {
        id: hivesplit.id,
        apiaryID: hivesplit.apiary,
        hiveOrigID: hivesplit.hiveOrigID,
        listOfHiveDestID: listOfHiveDestID,
        reproductionQueen: hivesplit.reproductionQueen,
        reproductionManagement: hivesplit.reproductionManagement,
        hiveSplitDate: hivesplit.hiveSplitDate,
        productionType: hivesplit.productionType,
        quantitiy: hivesplit.quantitiy,
        quantityType: hivesplit.quantityType,
      };
      const response = await fetchApi(`/api/protected/field-book/update-split-hive`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const apiary: HiveSplit = response;
        dispatch({
          type: 'UPDATE_HIVESPLIT',
          payload: {
            status: 'success',
            description: 'Hive Split created successfully.',
            type: 'register-split-hive',
          }
        });
      } else {
        console.error('Invalid response from server');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
}