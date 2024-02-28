import * as requestFromServer from "./employeePromissoryNotesCrud";
import {
  employeePromissoryNotesSlice,
  callTypes,
} from "./employeePromissoryNotesSlice";
const { actions } = employeePromissoryNotesSlice;
export const fetchEmployeePromissoryNotes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEmployeePromissoryNotes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeePromissoryNotesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeePromissoryNotes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeePromissoryNote = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.employeePromissoryNoteFetched({
        employeePromissoryNoteForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeePromissoryNoteById(id)
    .then((response) => {
      const employeePromissoryNote = response.data;
      dispatch(
        actions.employeePromissoryNoteFetched({
          employeePromissoryNoteForEdit: employeePromissoryNote,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeePromissoryNote";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeePromissoryNote = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeePromissoryNote(id)
    .then((response) => {
      dispatch(actions.employeePromissoryNoteDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeePromissoryNote";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeePromissoryNote =
  (employeePromissoryNoteForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createEmployeePromissoryNote(employeePromissoryNoteForCreation)
      .then((response) => {
        const employeePromissoryNote = response.data;
        dispatch(actions.employeePromissoryNoteCreated(employeePromissoryNote));
      })
      .catch((error) => {
        error.clientMessage = "Can't create employeePromissoryNote";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateEmployeePromissoryNote =
  (employeePromissoryNote) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateEmployeePromissoryNote(employeePromissoryNote)
      .then((response) => {
        dispatch(
          actions.employeePromissoryNoteUpdated({ employeePromissoryNote })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't update employeePromissoryNote";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateEmployeePromissoryNotesStatus =
  (ids, status) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateStatusForEmployeePromissoryNotes(ids, status)
      .then(() => {
        dispatch(actions.employeePromissoryNotesStatusUpdated({ ids, status }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update employeePromissoryNotes status";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };
export const deleteEmployeePromissoryNotes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeePromissoryNotes(ids)
    .then(() => {
      dispatch(actions.employeePromissoryNotesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeePromissoryNotes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
