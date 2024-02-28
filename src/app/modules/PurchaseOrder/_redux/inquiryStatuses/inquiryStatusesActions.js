import * as requestFromServer from "./inquiryStatusesCrud";
import { inquiryStatusesSlice, callTypes } from "./inquiryStatusesSlice";
const { actions } = inquiryStatusesSlice;
export const fetchInquiryStatuses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findInquiryStatuses(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.inquiryStatusesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find inquiryStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchInquiryStatus = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.inquiryStatusFetched({ inquiryStatusForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getInquiryStatusById(id)
    .then((response) => {
      const inquiryStatus = response.data;
      dispatch(
        actions.inquiryStatusFetched({ inquiryStatusForEdit: inquiryStatus })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find inquiryStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInquiryStatus = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInquiryStatus(id)
    .then((response) => {
      dispatch(actions.inquiryStatusDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete inquiryStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createInquiryStatus = (inquiryStatusForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createInquiryStatus(inquiryStatusForCreation)
    .then((response) => {
      const inquiryStatus = response.data;
      dispatch(actions.inquiryStatusCreated(inquiryStatus));
    })
    .catch((error) => {
      error.clientMessage = "Can't create inquiryStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInquiryStatus = (id, inquiryStatus) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateInquiryStatus(id, inquiryStatus)
    .then((response) => {
      dispatch(actions.inquiryStatusUpdated({ inquiryStatus }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update inquiryStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInquiryStatusesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForInquiryStatuses(ids, status)
    .then(() => {
      dispatch(actions.inquiryStatusesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update inquiryStatuses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInquiryStatuses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInquiryStatuses(ids)
    .then(() => {
      dispatch(actions.inquiryStatusesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete inquiryStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
