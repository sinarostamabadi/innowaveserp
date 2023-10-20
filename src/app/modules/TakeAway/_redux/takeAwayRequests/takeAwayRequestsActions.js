
import * as requestFromServer from "./takeAwayRequestsCrud";
import { takeAwayRequestsSlice, callTypes } from "./takeAwayRequestsSlice";
import moment from 'jalali-moment';

const { actions } = takeAwayRequestsSlice;
export const fetchTakeAwayRequests = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findTakeAwayRequests(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.takeAwayRequestsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.message = error.response.data;
      error.clientMessage = "Can't find takeAwayRequests";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchTakeAwayRequest = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.takeAwayRequestFetched({ takeAwayRequestForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getTakeAwayRequestById(id)  
    .then((response) => {
      const takeAwayRequest = response.data;

      if (!!takeAwayRequest) {
        const registerDate = moment(takeAwayRequest.RegisterDate, 'YYYY/MM/DD').locale(process.env.REACT_APP_DATE).format('YYYY/MM/DD').split('/');
        takeAwayRequest["RegisterDateObj"] = {
          day: +registerDate[2],
          month: +registerDate[1],
          year: +registerDate[0],
        };

        const fromDate = moment(takeAwayRequest.FromDate, 'YYYY/MM/DD').locale(process.env.REACT_APP_DATE).format('YYYY/MM/DD').split('/');
        takeAwayRequest["FromDateObj"] = {
          day: +registerDate[2],
          month: +registerDate[1],
          year: +registerDate[0],
        };

        const toDate = moment(takeAwayRequest.ToDate, 'YYYY/MM/DD').locale(process.env.REACT_APP_DATE).format('YYYY/MM/DD').split('/');
        takeAwayRequest["ToDateObj"] = {
          day: +registerDate[2],
          month: +registerDate[1],
          year: +registerDate[0],
        };

        //takeAwayRequest["FromTimeObj"] = !!takeAwayRequest.FromTime ? takeAwayRequest.FromTime.Hours + ":" + (takeAwayRequest.FromTime.Minutes % 60): "";
        takeAwayRequest["FromTimeObj"] = takeAwayRequest.FromTime;//!!takeAwayRequest.FromTime ? ('0' + takeAwayRequest.FromTime.Hours).substring(('0' + takeAwayRequest.FromTime.Hours).length - 2, 2) + ":" + (('0' + takeAwayRequest.FromTime.Minutes).substring(('0' + (takeAwayRequest.FromTime.Minutes % 60)).length - 2, 2)) + ":00": "";
        takeAwayRequest["ToTimeObj"] = takeAwayRequest.ToTime; //!!takeAwayRequest.ToTime ? ('0' + takeAwayRequest.ToTime.Hours).substring(('0' + takeAwayRequest.ToTime.Hours).length - 2, 2) + ":" + (('0' + takeAwayRequest.ToTime.Minutes).substring(('0' + (takeAwayRequest.ToTime.Minutes % 60)).length - 2, 2)) + ":00": "";
        
        takeAwayRequest["FromTimeObj"] = moment(takeAwayRequest["FromTimeObj"], 'hh:mm:ss');
        takeAwayRequest["ToTimeObj"] = moment(takeAwayRequest["ToTimeObj"], 'hh:mm:ss');
      }

      dispatch(actions.takeAwayRequestFetched({ takeAwayRequestForEdit: takeAwayRequest }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find takeAwayRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTakeAwayRequest = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteTakeAwayRequest(id)  
    .then((response) => {
      dispatch(actions.takeAwayRequestDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete takeAwayRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createTakeAwayRequest = (takeAwayRequestForCreation, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createTakeAwayRequest(takeAwayRequestForCreation)  
    .then((response) => {
      const takeAwayRequest = response.data;
      fnCallback();
      dispatch(actions.takeAwayRequestCreated(takeAwayRequest));

      return takeAwayRequest;
    })  
    .catch((error) => {
      error.message = error.response.data;
      error.clientMessage = "";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTakeAwayRequest = (id, takeAwayRequest, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateTakeAwayRequest(id, takeAwayRequest)  
    .then((response) => {
      fnCallback();
      dispatch(actions.takeAwayRequestUpdated({ takeAwayRequest }));

      return takeAwayRequest;
    })  
    .catch((error) => {
      error.clientMessage = "Can't update takeAwayRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTakeAwayRequestsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForTakeAwayRequests(ids, status)  
    .then(() => {
      dispatch(actions.takeAwayRequestsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update takeAwayRequests status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTakeAwayRequests = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteTakeAwayRequests(ids)  
    .then(() => {
      dispatch(actions.takeAwayRequestsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete takeAwayRequests";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 