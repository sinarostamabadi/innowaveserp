
import * as requestFromServer from "./specialDayTypesCrud";
import { specialDayTypesSlice, callTypes } from "./specialDayTypesSlice";
const { actions } = specialDayTypesSlice;
export const fetchSpecialDayTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSpecialDayTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.specialDayTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find specialDayTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSpecialDayType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.specialDayTypeFetched({ specialDayTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSpecialDayTypeById(id)  
    .then((response) => {
      const specialDayType = response.data;
      dispatch(actions.specialDayTypeFetched({ specialDayTypeForEdit: specialDayType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find specialDayType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSpecialDayType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSpecialDayType(id)  
    .then((response) => {
      dispatch(actions.specialDayTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete specialDayType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSpecialDayType = (specialDayTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSpecialDayType(specialDayTypeForCreation)  
    .then((response) => {
      const specialDayType = response.data;
      dispatch(actions.specialDayTypeCreated(specialDayType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create specialDayType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSpecialDayType = (specialDayType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSpecialDayType(specialDayType)  
    .then((response) => {
      dispatch(actions.specialDayTypeUpdated({ specialDayType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update specialDayType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSpecialDayTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSpecialDayTypes(ids, status)  
    .then(() => {
      dispatch(actions.specialDayTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update specialDayTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSpecialDayTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSpecialDayTypes(ids)  
    .then(() => {
      dispatch(actions.specialDayTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete specialDayTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 