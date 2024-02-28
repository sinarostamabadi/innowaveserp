import * as requestFromServer from "./insurancesCrud";
import { insurancesSlice, callTypes } from "./insurancesSlice";
const { actions } = insurancesSlice;
export const fetchInsurances = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findInsurances(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.insurancesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find insurances";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchInsurance = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.insuranceFetched({ insuranceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getInsuranceById(id)
    .then((response) => {
      const insurance = response.data;
      dispatch(actions.insuranceFetched({ insuranceForEdit: insurance }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find insurance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInsurance = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInsurance(id)
    .then((response) => {
      dispatch(actions.insuranceDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete insurance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createInsurance = (insuranceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createInsurance(insuranceForCreation)
    .then((response) => {
      const insurance = response.data;
      dispatch(actions.insuranceCreated(insurance));
    })
    .catch((error) => {
      error.clientMessage = "Can't create insurance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInsurance = (insurance) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateInsurance(insurance)
    .then((response) => {
      dispatch(actions.insuranceUpdated({ insurance }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update insurance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInsurancesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForInsurances(ids, status)
    .then(() => {
      dispatch(actions.insurancesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update insurances status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInsurances = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInsurances(ids)
    .then(() => {
      dispatch(actions.insurancesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete insurances";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
