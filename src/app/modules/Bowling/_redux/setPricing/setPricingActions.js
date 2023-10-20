import {
  EnToFaObject,
} from "src/core/_helpers";
import * as requestFromServer from "./setPricingCrud";
import { setPricingSlice, callTypes } from "./setPricingSlice";

const { actions } = setPricingSlice;
export const fetchSetPricings = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSetPricings(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.setPricingsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find setPricing";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSetPricing = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.setPricingFetched({ setPricingForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSetPricingById(id)
    .then((response) => {
      const setPricing = response.data;
      setPricing.Title = setPricing.Center.Title;
     
      let fromDateObj = EnToFaObject(setPricing.FromDate).split("-");
      let toDateObj = EnToFaObject(setPricing.ToDateObj).split("-");
      setPricing.FromDateObj = {
        day: +fromDateObj[2],
        month: +fromDateObj[1],
        year: +fromDateObj[0],
      };
      setPricing.ToDateObj = {
        day: +toDateObj[2],
        month: +toDateObj[1],
        year: +toDateObj[0],
      };
      dispatch(actions.setPricingFetched({ setPricingForEdit: setPricing }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find setPricing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSetPricing = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSetPricing(id)
    .then((response) => {
      dispatch(actions.setPricingDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete setPricing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSetPricing = (setPricingForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createSetPricing(setPricingForCreation)
    .then((response) => {
      const setPricing = response.data;
      dispatch(actions.setPricingCreated(setPricing));
    })
    .catch((error) => {
      error.clientMessage = "Can't create setPricing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSetPricing = (id,setPricing) => (dispatch) => {
  console.log("params",setPricing)
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateSetPricing(id,setPricing)
    .then((response) => {
      dispatch(actions.setPricingUpdated({ setPricing }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update setPricing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSetPricingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForSetPricing(ids, status)
    .then(() => {
      dispatch(actions.setPricingStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update setPricing status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSetPricings = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSetPricings(ids)
    .then(() => {
      dispatch(actions.setPricingDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete setPricing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
