import { APIResponseHandler, NewDocument, Document, Beekeeper, NewDocumentApiaryInfo, ApiaryTotalInfo, ApiaryInfo } from "src/model/myTypes";
import fetchApi from "./fetch";
import { Dispatch } from "redux";

type getDocumentsAction = {
  type: "GET_DOCUMENTS";
  payload: Document[];
};

type postDocumentsAction = {
  type: "CREATE_DOCUMENTS";
  payload: APIResponseHandler;
};

type postDocumentsApiaryAction = {
  type: "CREATE_DOCUMENTS_APIARY_INFO";
  payload: APIResponseHandler;
};

type getDocumentsApiaryInfoAction = {
  type: "GET_DOCUMENT_APIARY_INFO";
  payload: ApiaryInfo[];
};

type getDocumentsTotalApiaryInfoAction = {
  type: "GET_DOCUMENT_TOTAL_APIARY_INFO";
  payload: ApiaryTotalInfo[];
};

type getBeekeeperAction = {
  type: "GET_BEEKEEPER";
  payload: Beekeeper;
};


export type DeclarationsActions =
  | getDocumentsAction
  | postDocumentsAction
  | postDocumentsApiaryAction
  | getDocumentsApiaryInfoAction
  | getDocumentsTotalApiaryInfoAction
  | getBeekeeperAction;


export function getDocuments() {
  return async function action(dispatch: Dispatch<DeclarationsActions>) {
    try {
      const response = await fetchApi(`/api/protected/get-stock-declaration-document-info-list`, {
        method: 'GET',
      });

      if (response) {
        const documents: Document[] = response;
        dispatch({
          type: 'GET_DOCUMENTS',
          payload: documents
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

export function createDocument(document: NewDocument) {
  return async function action(dispatch: Dispatch<DeclarationsActions>) {
    try {
      const data = document;
      const response = await fetchApi(`/api/protected/create-stock-declaration-document-info`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const document: Document = response;
        dispatch({
          type: 'CREATE_DOCUMENTS',
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

export function createDocumentApiaryInfo(document: NewDocumentApiaryInfo) {
  return async function action(dispatch: Dispatch<DeclarationsActions>) {
    try {
      const data = document;
      const response = await fetchApi(`/api/protected/create-stock-declaration-document-info`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response) {
        //const document: Document = response;
        dispatch({
          type: 'CREATE_DOCUMENTS',
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

export function getDocumentsApiaryInfo(documentNumber: number) {
  return async function action(dispatch: Dispatch<DeclarationsActions>) {
    try {
      const response = await fetchApi(`/api/protected/get-stock-declaration-apiary-info-list/${documentNumber}`, {
        method: 'GET',
      });

      if (response) {
        const documents: ApiaryInfo[] = response;
        dispatch({
          type: 'GET_DOCUMENT_APIARY_INFO',
          payload: documents
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

export function getDocumensTotalApiaryInfo(documentNumber: number) {
  return async function action(dispatch: Dispatch<DeclarationsActions>) {
    try {
      const response = await fetchApi(`/api/protected/get-stock-declaration-total-apiary-info/${documentNumber}`, {
        method: 'GET',
      });

      if (response) {
        const documents: ApiaryTotalInfo[] = response;
        dispatch({
          type: 'GET_DOCUMENT_TOTAL_APIARY_INFO',
          payload: documents
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


export function getBeekeeper() {
  return async function action(dispatch: Dispatch<DeclarationsActions>) {
    try {
      const response = await fetchApi(`/api/protected/get-stock-declaration-beekeeper-info`, {
        method: 'GET',
      });

      if (response) {
        const beekeeper: Beekeeper = response;
        dispatch({
          type: 'GET_BEEKEEPER',
          payload: beekeeper
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