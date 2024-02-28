import * as requestFromServer from "./realPersonsCrud";
import { realPersonsSlice, callTypes } from "./realPersonsSlice";
const { actions } = realPersonsSlice;
export const fetchRealPersons = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRealPersons(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.realPersonsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find realPersons";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
      throw "Can't find realPersons";
    });
};
export const fetchRealPerson = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.realPersonFetched({ realPersonForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRealPersonById(id)
    .then((response) => {
      const realPerson = response.data;

      if (!!realPerson && !!realPerson.RealPerson) {
        const dr = realPerson.RealPerson.BirthDate.split("/");

        realPerson.RealPerson.BirthDateObj = {
          day: +dr[2],
          month: +dr[1],
          year: +dr[0],
        };
      }

      dispatch(actions.realPersonFetched({ realPersonForEdit: realPerson }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find realPerson";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw "Can't find realPerson";
    });
};
export const deleteRealPerson = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRealPerson(id)
    .then((response) => {
      dispatch(actions.realPersonDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete realPerson";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw "Can't delete realPerson";
    });
};
export const createRealPerson = (realPersonModel, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRealPerson(realPersonModel)
    .then((response) => {
      const realPerson = response.data;
      fnCallback(realPerson);

      dispatch(actions.realPersonCreated(realPerson));
    })
    .catch((error) => {
      error.clientMessage = "Can't create realPerson";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw "Can't create realPerson";
    });
};
export const updateRealPerson = (id, realPerson, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRealPerson(id, realPerson)
    .then((response) => {
      fnCallback(realPerson);
      dispatch(actions.realPersonUpdated({ realPerson }));
    })
    .catch((error) => {
      console.log("error =>", error);
      error.clientMessage = "Can't update realPerson";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw "Can't create realPerson";
    });
};
export const updateRealPersonsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRealPersons(ids, status)
    .then(() => {
      dispatch(actions.realPersonsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update realPersons status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw "Can't update realPersons status";
    });
};
export const deleteRealPersons = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRealPersons(ids)
    .then(() => {
      dispatch(actions.realPersonsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete realPersons";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw "Can't delete realPersons";
    });
};
