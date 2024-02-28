import * as requestFromServer from "./inquiriesCrud";
import { inquiriesSlice, callTypes } from "./inquiriesSlice";
const { actions } = inquiriesSlice;
export const fetchInquiries = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findInquiries(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.inquiriesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find inquiries";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchInquiry = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.inquiryFetched({ inquiryForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getInquiryById(id)
    .then((response) => {
      const inquiry = response.data;
      dispatch(actions.inquiryFetched({ inquiryForEdit: inquiry }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find inquiry";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInquiry = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInquiry(id)
    .then((response) => {
      dispatch(actions.inquiryDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete inquiry";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createInquiry = (inquiryForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createInquiry(inquiryForCreation)
    .then((response) => {
      const inquiry = response.data;
      dispatch(actions.inquiryCreated(inquiry));
    })
    .catch((error) => {
      error.clientMessage = "Can't create inquiry";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInquiry = (id, inquiry) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateInquiry(id, inquiry)
    .then((response) => {
      dispatch(actions.inquiryUpdated({ inquiry }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update inquiry";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInquiriesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForInquiries(ids, status)
    .then(() => {
      dispatch(actions.inquiriesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update inquiries status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInquiries = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInquiries(ids)
    .then(() => {
      dispatch(actions.inquiriesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete inquiries";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
