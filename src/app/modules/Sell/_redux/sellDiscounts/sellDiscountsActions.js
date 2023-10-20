
import * as requestFromServer from "./sellDiscountsCrud";
import { sellDiscountsSlice, callTypes } from "./sellDiscountsSlice";
import moment from 'jalali-moment';

const { actions } = sellDiscountsSlice;
export const fetchSellDiscounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSellDiscounts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.sellDiscountsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.message = error.response.data;
      error.clientMessage = "Can't find sellDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSellDiscount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.sellDiscountFetched({ sellDiscountForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSellDiscountById(id)  
    .then((response) => {
      const sellDiscount = response.data;

      if (!!sellDiscount) {
        const registerDate = moment(sellDiscount.RegisterDate, 'YYYY/MM/DD').locale(process.env.REACT_APP_DATE).format('YYYY/MM/DD').split('/');
        sellDiscount["RegisterDateObj"] = {
          day: +registerDate[2],
          month: +registerDate[1],
          year: +registerDate[0],
        };

        const fromDate = moment(sellDiscount.FromDate, 'YYYY/MM/DD').locale(process.env.REACT_APP_DATE).format('YYYY/MM/DD').split('/');
        sellDiscount["FromDateObj"] = {
          day: +registerDate[2],
          month: +registerDate[1],
          year: +registerDate[0],
        };

        const toDate = moment(sellDiscount.ToDate, 'YYYY/MM/DD').locale(process.env.REACT_APP_DATE).format('YYYY/MM/DD').split('/');
        sellDiscount["ToDateObj"] = {
          day: +registerDate[2],
          month: +registerDate[1],
          year: +registerDate[0],
        };

        //sellDiscount["FromTimeObj"] = !!sellDiscount.FromTime ? sellDiscount.FromTime.Hours + ":" + (sellDiscount.FromTime.Minutes % 60): "";
        sellDiscount["FromTimeObj"] = sellDiscount.FromTime;//!!sellDiscount.FromTime ? ('0' + sellDiscount.FromTime.Hours).substring(('0' + sellDiscount.FromTime.Hours).length - 2, 2) + ":" + (('0' + sellDiscount.FromTime.Minutes).substring(('0' + (sellDiscount.FromTime.Minutes % 60)).length - 2, 2)) + ":00": "";
        sellDiscount["ToTimeObj"] = sellDiscount.ToTime; //!!sellDiscount.ToTime ? ('0' + sellDiscount.ToTime.Hours).substring(('0' + sellDiscount.ToTime.Hours).length - 2, 2) + ":" + (('0' + sellDiscount.ToTime.Minutes).substring(('0' + (sellDiscount.ToTime.Minutes % 60)).length - 2, 2)) + ":00": "";
        
        sellDiscount["FromTimeObj"] = moment(sellDiscount["FromTimeObj"], 'hh:mm:ss');
        sellDiscount["ToTimeObj"] = moment(sellDiscount["ToTimeObj"], 'hh:mm:ss');
      }

      dispatch(actions.sellDiscountFetched({ sellDiscountForEdit: sellDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDiscount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDiscount(id)  
    .then((response) => {
      dispatch(actions.sellDiscountDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSellDiscount = (sellDiscountForCreation, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSellDiscount(sellDiscountForCreation)  
    .then((response) => {
      const sellDiscount = response.data;
      fnCallback();
      dispatch(actions.sellDiscountCreated(sellDiscount));

      return sellDiscount;
    })  
    .catch((error) => {
      error.message = error.response.data;
      error.clientMessage = "";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDiscount = (id, sellDiscount, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSellDiscount(id, sellDiscount)  
    .then((response) => {
      fnCallback();
      dispatch(actions.sellDiscountUpdated({ sellDiscount }));

      return sellDiscount;
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDiscountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSellDiscounts(ids, status)  
    .then(() => {
      dispatch(actions.sellDiscountsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDiscounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDiscounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDiscounts(ids)  
    .then(() => {
      dispatch(actions.sellDiscountsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 