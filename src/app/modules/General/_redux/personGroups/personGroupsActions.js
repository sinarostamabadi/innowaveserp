import * as requestFromServer from "./personGroupsCrud";
import { personGroupsSlice, callTypes } from "./personGroupsSlice";
const { actions } = personGroupsSlice;
export const fetchPersonGroups = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPersonGroups(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.personGroupsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find personGroups";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPersonGroup = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.personGroupFetched({ personGroupForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPersonGroupById(id)
    .then((response) => {
      const personGroup = response.data;
      dispatch(actions.personGroupFetched({ personGroupForEdit: personGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find personGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePersonGroup = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePersonGroup(id)
    .then((response) => {
      dispatch(actions.personGroupDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete personGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPersonGroup = (personGroupForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPersonGroup(personGroupForCreation)
    .then((response) => {
      const personGroup = response.data;
      dispatch(actions.personGroupCreated(personGroup));
    })
    .catch((error) => {
      error.clientMessage = "Can't create personGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePersonGroup = (id, personGroup) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePersonGroup(id, personGroup)
    .then((response) => {
      dispatch(actions.personGroupUpdated({ personGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update personGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePersonGroupsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPersonGroups(ids, status)
    .then(() => {
      dispatch(actions.personGroupsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update personGroups status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePersonGroups = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePersonGroups(ids)
    .then(() => {
      dispatch(actions.personGroupsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete personGroups";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
