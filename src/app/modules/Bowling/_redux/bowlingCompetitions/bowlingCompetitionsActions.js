
import * as requestFromServer from "./bowlingCompetitionsCrud";
import { bowlingCompetitionsSlice, callTypes } from "./bowlingCompetitionsSlice";
const { actions } = bowlingCompetitionsSlice;
export const fetchBowlingCompetitions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBowlingCompetitions(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.bowlingCompetitionsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bowlingCompetitions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBowlingCompetition = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.bowlingCompetitionFetched({ bowlingCompetitionForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBowlingCompetitionById(id)  
    .then((response) => {
      const bowlingCompetition = response.data;
      dispatch(actions.bowlingCompetitionFetched({ bowlingCompetitionForEdit: bowlingCompetition }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bowlingCompetition";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBowlingCompetition = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBowlingCompetition(id)  
    .then((response) => {
      dispatch(actions.bowlingCompetitionDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bowlingCompetition";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBowlingCompetition = (bowlingCompetitionForCreation, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBowlingCompetition(bowlingCompetitionForCreation)  
    .then((response) => {
      const bowlingCompetition = response.data;
      fnCallBack(bowlingCompetition);

      dispatch(actions.bowlingCompetitionCreated(bowlingCompetition));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create bowlingCompetition";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBowlingCompetition = (id, bowlingCompetition, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBowlingCompetition(id, bowlingCompetition)  
    .then((response) => {
      fnCallBack(bowlingCompetition);
      dispatch(actions.bowlingCompetitionUpdated({ bowlingCompetition }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bowlingCompetition";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBowlingCompetitionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBowlingCompetitions(ids, status)  
    .then(() => {
      dispatch(actions.bowlingCompetitionsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bowlingCompetitions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBowlingCompetitions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBowlingCompetitions(ids)  
    .then(() => {
      dispatch(actions.bowlingCompetitionsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bowlingCompetitions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};