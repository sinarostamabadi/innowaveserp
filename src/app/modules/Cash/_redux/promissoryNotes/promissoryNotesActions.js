import * as requestFromServer from "./promissoryNotesCrud";
import { promissoryNotesSlice, callTypes } from "./promissoryNotesSlice";
const { actions } = promissoryNotesSlice;
export const fetchPromissoryNotes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPromissoryNotes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.promissoryNotesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find promissoryNotes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPromissoryNote = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.promissoryNoteFetched({ promissoryNoteForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPromissoryNoteById(id)
    .then((response) => {
      const promissoryNote = response.data;
      dispatch(
        actions.promissoryNoteFetched({ promissoryNoteForEdit: promissoryNote })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find promissoryNote";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePromissoryNote = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePromissoryNote(id)
    .then((response) => {
      dispatch(actions.promissoryNoteDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete promissoryNote";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPromissoryNote =
  (promissoryNoteForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createPromissoryNote(promissoryNoteForCreation)
      .then((response) => {
        const promissoryNote = response.data;
        dispatch(actions.promissoryNoteCreated(promissoryNote));
      })
      .catch((error) => {
        error.clientMessage = "Can't create promissoryNote";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updatePromissoryNote = (promissoryNote) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePromissoryNote(promissoryNote)
    .then((response) => {
      dispatch(actions.promissoryNoteUpdated({ promissoryNote }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update promissoryNote";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePromissoryNotesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPromissoryNotes(ids, status)
    .then(() => {
      dispatch(actions.promissoryNotesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update promissoryNotes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePromissoryNotes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePromissoryNotes(ids)
    .then(() => {
      dispatch(actions.promissoryNotesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete promissoryNotes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
