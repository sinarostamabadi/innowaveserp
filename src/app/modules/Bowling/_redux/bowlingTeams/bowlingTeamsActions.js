
import * as requestFromServer from "./bowlingTeamsCrud";
import { bowlingTeamsSlice, callTypes } from "./bowlingTeamsSlice";
import moment from 'jalali-moment';

const { actions } = bowlingTeamsSlice;
export const fetchBowlingTeams = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBowlingTeams(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.bowlingTeamsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bowlingTeams";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBowlingTeam = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.bowlingTeamFetched({ bowlingTeamForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBowlingTeamById(id)  
    .then((response) => {
      const bowlingTeam = response.data;

      dispatch(actions.bowlingTeamFetched({ bowlingTeamForEdit: bowlingTeam }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bowlingTeam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBowlingTeam = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBowlingTeam(id)  
    .then((response) => {
      dispatch(actions.bowlingTeamDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bowlingTeam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const doneBowlingTeam = (id, bowlingTeam) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .doneBowlingTeam(id, bowlingTeam)  
    .then((response) => {
      dispatch(actions.bowlingTeamUpdated({ bowlingTeam }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bowlingTeam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const addTimeBowlingTeam = (id, bowlingTeam) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .addTimeBowlingTeam(id, bowlingTeam)  
    .then((response) => {
      dispatch(actions.bowlingTeamUpdated({ bowlingTeam }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bowlingTeam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBowlingTeam = (bowlingTeamForCreation, fn) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBowlingTeam(bowlingTeamForCreation)  
    .then((response) => {
      const bowlingTeam = response.data;
      fn(bowlingTeam);

      dispatch(actions.bowlingTeamCreated(bowlingTeam));
      
      return bowlingTeam;
    })  
    .catch((error) => {
      error.clientMessage = "Can't create bowlingTeam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));

      throw error;
    });
};
export const updateBowlingTeam = (id, bowlingTeam) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBowlingTeam(id, bowlingTeam)  
    .then((response) => {
      dispatch(actions.bowlingTeamUpdated({ bowlingTeam }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bowlingTeam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBowlingTeamsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBowlingTeams(ids, status)  
    .then(() => {
      dispatch(actions.bowlingTeamsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bowlingTeams status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBowlingTeams = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBowlingTeams(ids)  
    .then(() => {
      dispatch(actions.bowlingTeamsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bowlingTeams";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 