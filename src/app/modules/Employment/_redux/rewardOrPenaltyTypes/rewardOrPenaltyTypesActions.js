
import * as requestFromServer from "./rewardOrPenaltyTypesCrud";
import { rewardOrPenaltyTypesSlice, callTypes } from "./rewardOrPenaltyTypesSlice";
const { actions } = rewardOrPenaltyTypesSlice;
export const fetchRewardOrPenaltyTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRewardOrPenaltyTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.rewardOrPenaltyTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find rewardOrPenaltyTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRewardOrPenaltyType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.rewardOrPenaltyTypeFetched({ rewardOrPenaltyTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRewardOrPenaltyTypeById(id)  
    .then((response) => {
      const rewardOrPenaltyType = response.data;
      dispatch(actions.rewardOrPenaltyTypeFetched({ rewardOrPenaltyTypeForEdit: rewardOrPenaltyType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find rewardOrPenaltyType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRewardOrPenaltyType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRewardOrPenaltyType(id)  
    .then((response) => {
      dispatch(actions.rewardOrPenaltyTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete rewardOrPenaltyType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRewardOrPenaltyType = (rewardOrPenaltyTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRewardOrPenaltyType(rewardOrPenaltyTypeForCreation)  
    .then((response) => {
      const rewardOrPenaltyType = response.data;
      dispatch(actions.rewardOrPenaltyTypeCreated(rewardOrPenaltyType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create rewardOrPenaltyType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRewardOrPenaltyType = (rewardOrPenaltyType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRewardOrPenaltyType(rewardOrPenaltyType)  
    .then((response) => {
      dispatch(actions.rewardOrPenaltyTypeUpdated({ rewardOrPenaltyType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update rewardOrPenaltyType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRewardOrPenaltyTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRewardOrPenaltyTypes(ids, status)  
    .then(() => {
      dispatch(actions.rewardOrPenaltyTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update rewardOrPenaltyTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRewardOrPenaltyTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRewardOrPenaltyTypes(ids)  
    .then(() => {
      dispatch(actions.rewardOrPenaltyTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete rewardOrPenaltyTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 