
import * as requestFromServer from "./reservesCrud";
import { reservesSlice, callTypes } from "./reservesSlice";
import moment from 'jalali-moment';

const { actions } = reservesSlice;
export const fetchReserves = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findReserves(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.reservesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find reserves";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchReserve = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.reserveFetched({ reserveForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getReserveById(id)  
    .then((response) => {
      const reserve = response.data;

      if (!!reserve) {
        const dr = moment(reserve.ReserveDate, 'YYYY/MM/DD').locale(process.env.REACT_APP_DATE).format('YYYY/MM/DD').split('/');
        reserve["ReserveDateObj"] = {
          day: +dr[2],
          month: +dr[1],
          year: +dr[0],
        };

        //reserve["FromTimeObj"] = !!reserve.FromTime ? reserve.FromTime.Hours + ":" + (reserve.FromTime.Minutes % 60): "";
        reserve["FromTimeObj"] = reserve.FromTime;//!!reserve.FromTime ? ('0' + reserve.FromTime.Hours).substring(('0' + reserve.FromTime.Hours).length - 2, 2) + ":" + (('0' + reserve.FromTime.Minutes).substring(('0' + (reserve.FromTime.Minutes % 60)).length - 2, 2)) + ":00": "";
        reserve["ToTimeObj"] = reserve.ToTime; //!!reserve.ToTime ? ('0' + reserve.ToTime.Hours).substring(('0' + reserve.ToTime.Hours).length - 2, 2) + ":" + (('0' + reserve.ToTime.Minutes).substring(('0' + (reserve.ToTime.Minutes % 60)).length - 2, 2)) + ":00": "";
        
        reserve["FromTimeObj"] = moment(reserve["FromTimeObj"], 'hh:mm:ss');
        reserve["ToTimeObj"] = moment(reserve["ToTimeObj"], 'hh:mm:ss');
      }

      dispatch(actions.reserveFetched({ reserveForEdit: reserve }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find reserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteReserve = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteReserve(id)  
    .then((response) => {
      dispatch(actions.reserveDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete reserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const doneReserve = (id, reserve) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .doneReserve(id, reserve)  
    .then((response) => {
      dispatch(actions.reserveUpdated({ reserve }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update reserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const addTimeReserve = (id, reserve) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .addTimeReserve(id, reserve)  
    .then((response) => {
      dispatch(actions.reserveUpdated({ reserve }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update reserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createReserve = (reserveForCreation, fn) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createReserve(reserveForCreation)  
    .then((response) => {
      const reserve = response.data;
      fn(reserve);

      dispatch(actions.reserveCreated(reserve));
      
      return reserve;
    })  
    .catch((error) => {
      error.clientMessage = error.response.data;
      dispatch(actions.catchError({ error:error.response.data, callType: callTypes.action }));

      throw error;
    });
};
export const updateReserve = (id, reserve) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateReserve(id, reserve)  
    .then((response) => {
      dispatch(actions.reserveUpdated({ reserve }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update reserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateReservesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForReserves(ids, status)  
    .then(() => {
      dispatch(actions.reservesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update reserves status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteReserves = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteReserves(ids)  
    .then(() => {
      dispatch(actions.reservesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete reserves";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 