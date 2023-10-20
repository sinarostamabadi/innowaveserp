
// /________________________________________________/ //
/*****************[09.File_ActionJs]*************************/

import * as requestFromServer from "./inquiryDetailsCrud";
import { inquiryDetailsSlice, callTypes } from "./inquiryDetailsSlice";
const { actions } = inquiryDetailsSlice;
export const fetchInquiryDetails = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findInquiryDetails(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.inquiryDetailsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find inquiryDetails";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchInquiryDetail = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.inquiryDetailFetched({ inquiryDetailForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getInquiryDetailById(id)
    .then((response) => {
      const inquiryDetail = response.data;
      dispatch(actions.inquiryDetailFetched({ inquiryDetailForEdit: inquiryDetail }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find inquiryDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInquiryDetail = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInquiryDetail(id)
    .then((response) => {
      dispatch(actions.inquiryDetailDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete inquiryDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createInquiryDetail = (inquiryDetailForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createInquiryDetail(inquiryDetailForCreation)
    .then((response) => {
      const inquiryDetail = response.data;
      dispatch(actions.inquiryDetailCreated(inquiryDetail));
    })
    .catch((error) => {
      error.clientMessage = "Can't create inquiryDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInquiryDetail = (inquiryDetail) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateInquiryDetail(inquiryDetail)
    .then((response) => {
      dispatch(actions.inquiryDetailUpdated({ inquiryDetail }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update inquiryDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInquiryDetailsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForInquiryDetails(ids, status)
    .then(() => {
      dispatch(actions.inquiryDetailsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update inquiryDetails status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInquiryDetails = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInquiryDetails(ids)
    .then(() => {
      dispatch(actions.inquiryDetailsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete inquiryDetails";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 