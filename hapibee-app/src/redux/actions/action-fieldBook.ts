import { APIResponseHandler, Inspection, NewInspection, Transfer, NewTransfer, Cresta, NewCresta, Schedule } from "src/model/myTypes";
import fetchApi from "./fetch";
import { Dispatch } from "redux";

type getInspectionsAction = {
  type: "GET_INSPECTIONS";
  payload: Inspection;
};

type createInspectionAction = {
  type: "REGISTER_INSPECTION";
  payload: APIResponseHandler;
};

type getTransferAction = {
  type: "GET_TRANSFERS";
  payload: Transfer[];
};

type createTransferAction = {
  type: "REGISTER_TRANSFER";
  payload: APIResponseHandler;
};

type getCrestaAction = {
  type: "GET_CRESTA";
  payload: Cresta[];
};

type createCrestaAction = {
  type: "REGISTER_CRESTA";
  payload: APIResponseHandler;
};

type updateCrestaAction = {
  type: "UPDATE_CRESTA"; //update-cresta
  payload: APIResponseHandler;
};

type getInspectionScheduleAction = {
  type: "GET_INSPECTION_SCHEDULE";
  payload: Schedule[];
};

type createInspectionScheduleAction = {
  type: "CREATE_INSPECTION_SCHEDULE";
  payload: APIResponseHandler;
}


export type FieldBookActions =
  | getInspectionsAction
  | createInspectionAction
  | getTransferAction
  | createTransferAction
  | getCrestaAction
  | createCrestaAction
  | updateCrestaAction
  | getInspectionScheduleAction
  | createInspectionScheduleAction;


export function getInspections() {
  return async function action(dispatch: Dispatch<getInspectionsAction>) {
    try {
      const response = await fetchApi(`/api/protected/field-book/get-inspection-list`, {
        method: 'GET',
      });

      if (response) {
        const inspetions: Inspection = response;
        dispatch({
          type: 'GET_INSPECTIONS',
          payload: inspetions
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

export function createInspection(inspection: NewInspection) {
  return async function action(dispatch: Dispatch<createInspectionAction>) {
    try {
      const safeDate = inspection.date;
      const safeEndDate = inspection.endDate;
      const safeHiveIDmaintenance = inspection.hiveIDmaintenance.trim().split(',');
      const safeHiveIDfeeding = inspection.hiveIDfeeding.trim().split(',');
      const safeHiveIDdisease = inspection.hiveIDdisease.trim().split(',');
      const data = {
        apiaryID: inspection.apiaryID,
        date: safeDate,
        maintenance: {
          apiaryID: 0,
          hiveID: safeHiveIDmaintenance,
          date: safeDate,
          temperature: inspection.temperature,
          humidity: inspection.humidity,
          inspectionType: inspection.inspectionType,
          motive: inspection.motive,
          disinfectionMode: inspection.disinfectionMode,
          productsUsed: inspection.productsUsed,
          observations: inspection.observations,
        },
        feeding: {
          apiaryID: inspection.apiaryID,
          hiveID: safeHiveIDfeeding,
          date: safeDate,
          product: inspection.product,
          formula: inspection.formula,
          origin: inspection.origin,
          dose: inspection.doseFood,
        },
        treatments: {
          apiaryID: inspection.apiaryID,
          hiveID: safeHiveIDdisease,
          date: safeDate,
          type: inspection.type,
          disease: inspection.disease,
          medication: inspection.medication,
          activeSubstance: inspection.activeSubstance,
          dose: inspection.doseTreatment,
          duration: inspection.duration,
          endDate: safeEndDate,
        },
      };
      const response = await fetchApi(`/api/protected/field-book/create-inspection`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const inspection: Inspection = response;
        dispatch({
          type: 'REGISTER_INSPECTION',
          payload: {
            status: 'success',
            description: 'Inspection registered successfully.',
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

export function getTransfers() {
  return async function action(dispatch: Dispatch<getTransferAction>) {
    try {
      const response = await fetchApi(`/api/protected/field-book/get-transfers-list`, {
        method: 'GET',
      });

      if (response) {
        const transfers: Transfer[] = response;
        dispatch({
          type: 'GET_TRANSFERS',
          payload: transfers
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

export function createTransfer(transfer: NewTransfer) {
  return async function action(dispatch: Dispatch<createTransferAction>) {
    try {
      const data = {
        transferDate: transfer.transferDate,
        apiaryID: transfer.apiaryID,
        location: {
          municipality: transfer.municipality,
          parish: transfer.parish,
          place: transfer.place,
          latitude: transfer.latitude,
          longitude: transfer.longitude,
        },
      };
      const response = await fetchApi(`/api/protected/field-book/create-transfer`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const transfer: Transfer = response;
        dispatch({
          type: 'REGISTER_TRANSFER',
          payload: {
            status: 'success',
            description: 'Transfer registered successfully.',
            type: 'create-transfer',
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

export function getCresta() {
  return async function action(dispatch: Dispatch<getCrestaAction>) {
    try {
      const response = await fetchApi(`/api/protected/get-cresta-list`, {
        method: 'GET',
      });

      if (response) {
        const crestas: Cresta[] = response;
        dispatch({
          type: 'GET_CRESTA',
          payload: crestas
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

export function createCresta(cresta: NewCresta) {
  return async function action(dispatch: Dispatch<createCrestaAction>) {
    try {
      const data = {
        apiaryID: cresta.apiaryID,
        hiveID: cresta.hiveID,
        nrOfBoards: cresta.nrOfBoards,
        ProductType: cresta.ProductType,
        quantity: cresta.quantity,
        quantityType: cresta.quantityType,
        CrestaDate: cresta.CrestaDate,
      };
      const response = await fetchApi(`/api/protected/create-cresta`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const cresta: Cresta = response;
        dispatch({
          type: 'REGISTER_CRESTA',
          payload: {
            status: 'success',
            description: 'Cresta registered successfully.',
            type: 'create-cresta',
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

export function updateCresta(cresta: NewCresta) {
  return async function action(dispatch: Dispatch<FieldBookActions>) {
    try {
      const data = {
        id: cresta.id,
        apiaryid: cresta.apiaryID,
        hiveid: cresta.hiveID,
        nrOfBoards: cresta.nrOfBoards,
        ProductType: cresta.ProductType,
        quantity: cresta.quantity,
        quantityType: cresta.quantityType,
        crestaDate: cresta.CrestaDate,
      };
      const response = await fetchApi(`/api/protected/update-cresta`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const apiary: Apiary = response;
        dispatch({
          type: 'UPDATE_CRESTA',
          payload: {
            status: 'success',
            description: 'Cresta updated successfully.',
            type: 'update-cresta',
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

export function getInspectionSchedule() {
  return async function action(dispatch: Dispatch<getInspectionScheduleAction>) {
    try {
      const response = await fetchApi(`/api/protected/field-book/schedule-inspection`, {
        method: 'GET',
      });

      if (response) {
        const schedule: Schedule[] = response;
        dispatch({
          type: 'GET_INSPECTION_SCHEDULE',
          payload: schedule
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

export function createInspectionSchedule(schedule: Schedule) {
  return async function action(dispatch: Dispatch<createInspectionScheduleAction>) {
    try {
      const data = {
        apiaryID: schedule.apiaryID,
        date: schedule.date,
      };
      const response = await fetchApi(`/api/protected/field-book/schedule-inspection`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const schedule: Schedule = response;
        dispatch({
          type: 'CREATE_INSPECTION_SCHEDULE',
          payload: {
            status: 'success',
            description: 'Schedule registered successfully.',
            type: 'create-inspection-schedule',
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
