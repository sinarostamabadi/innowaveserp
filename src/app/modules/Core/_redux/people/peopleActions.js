import * as requestFromServer from "./peopleCrud";
import { peopleSlice, callTypes } from "./peopleSlice";
const { actions } = peopleSlice;
export const fetchpeople = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findpeople(queryParams)  
    .then((response) => {
      const { items, totalCount } = response.data;
      dispatch(
        actions.peopleFetched({ totalCount: totalCount, entities: items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find people";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPerson = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.personFetched({ personForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getPersonById(id)  
    .then((response) => {
      const person = response.data;
      dispatch(actions.personFetched({ personForEdit: person }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find person";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePerson = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePerson(id)  
    .then((response) => {
      dispatch(actions.personDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete person";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createPerson = (personForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createPerson(personForCreation)  
    .then((response) => {
      const person = response.data;
      dispatch(actions.personCreated(person));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create person";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updatePerson = (person) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updatePerson(person)  
    .then((response) => {
      console.log("response =>" , response);
      dispatch(actions.personUpdated({ person }));
    })  
    .catch((error) => {
      console.log("error =>" , error);
      error.clientMessage = "Can't update person";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updatepeopleStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForpeople(ids, status)  
    .then(() => {
      dispatch(actions.peopleStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update people status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletepeople = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletepeople(ids)  
    .then(() => {
      dispatch(actions.peopleDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete people";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}; 
