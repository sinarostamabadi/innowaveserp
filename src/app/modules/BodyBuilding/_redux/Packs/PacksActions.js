import * as requestFromServer from "./PacksCrud";
import { packsSlice, callTypes } from "./PacksSlice";
const { actions } = packsSlice;
export const fetchPacks = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPacks(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.packsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find packs";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPack = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.packFetched({ packForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPackById(id)
    .then((response) => {
      const pack = response.data;
      dispatch(actions.packFetched({ packForEdit: pack }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find pack";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePack = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePack(id)
    .then((response) => {
      dispatch(actions.packDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete pack";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPack = (packForCreation, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPack(packForCreation)
    .then((response) => {
      const pack = response.data;
      fnCallBack(pack);

      dispatch(actions.packCreated(pack));

      return pack;
    })
    .catch((error) => {
      error.clientMessage = "Can't create pack";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePack = (id, pack, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePack(id, pack)
    .then((response) => {
      fnCallBack(pack);

      dispatch(actions.packUpdated({ pack }));

      return pack;
    })
    .catch((error) => {
      error.clientMessage = "Can't update pack";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePacksStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPacks(ids, status)
    .then(() => {
      dispatch(actions.packsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update packs status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePacks = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePacks(ids)
    .then(() => {
      dispatch(actions.packsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete packs";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
