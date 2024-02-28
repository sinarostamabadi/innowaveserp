import * as requestFromServer from "./insuranceCompaniesCrud";
import { insuranceCompaniesSlice, callTypes } from "./insuranceCompaniesSlice";
const { actions } = insuranceCompaniesSlice;
export const fetchInsuranceCompanies = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findInsuranceCompanies(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.insuranceCompaniesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find insuranceCompanies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchInsuranceCompany = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.insuranceCompanyFetched({ insuranceCompanyForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getInsuranceCompanyById(id)
    .then((response) => {
      const insuranceCompany = response.data;
      dispatch(
        actions.insuranceCompanyFetched({
          insuranceCompanyForEdit: insuranceCompany,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find insuranceCompany";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInsuranceCompany = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInsuranceCompany(id)
    .then((response) => {
      dispatch(actions.insuranceCompanyDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete insuranceCompany";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createInsuranceCompany =
  (insuranceCompanyForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createInsuranceCompany(insuranceCompanyForCreation)
      .then((response) => {
        const insuranceCompany = response.data;
        dispatch(actions.insuranceCompanyCreated(insuranceCompany));
      })
      .catch((error) => {
        error.clientMessage = "Can't create insuranceCompany";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateInsuranceCompany = (insuranceCompany) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateInsuranceCompany(insuranceCompany)
    .then((response) => {
      dispatch(actions.insuranceCompanyUpdated({ insuranceCompany }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update insuranceCompany";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInsuranceCompaniesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForInsuranceCompanies(ids, status)
    .then(() => {
      dispatch(actions.insuranceCompaniesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update insuranceCompanies status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInsuranceCompanies = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteInsuranceCompanies(ids)
    .then(() => {
      dispatch(actions.insuranceCompaniesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete insuranceCompanies";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
