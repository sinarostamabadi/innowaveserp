import * as requestFromServer from "./companiesCrud";
import { companiesSlice, callTypes } from "./companiesSlice";
const { actions } = companiesSlice;
export const fetchCompanies = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCompanies(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.companiesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find companies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCompany = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.companyFetched({ companyForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCompanyById(id)
    .then((response) => {
      const company = response.data;
      dispatch(actions.companyFetched({ companyForEdit: company }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCompany = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCompany(id)
    .then((response) => {
      dispatch(actions.companyDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createCompany = (companyModel, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCompany(companyModel)
    .then((response) => {
      const company = response.data;
      fnCallback(company);

      dispatch(actions.companyCreated(company));
    })
    .catch((error) => {
      error.clientMessage = "Can't create company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error.clientMessage;
    });
};
export const updateCompany = (id, company, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCompany(id, company)
    .then((response) => {
      fnCallback(company);

      dispatch(actions.companyUpdated({ company }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error.clientMessage;
    });
};
export const updateCompaniesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCompanies(ids, status)
    .then(() => {
      dispatch(actions.companiesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update companies status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCompanies = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCompanies(ids)
    .then(() => {
      dispatch(actions.companiesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete companies";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
