import * as requestFromServer from "./accountFloatingGroupRelationsCrud";
import {
  accountFloatingGroupRelationsSlice,
  callTypes,
} from "./accountFloatingGroupRelationsSlice";

const { actions } = accountFloatingGroupRelationsSlice;

export const fetchAccountFloatingGroupRelations =
  (queryParams) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .find(queryParams)
      .then((response) => {
        const { Items, TotalCount } = response.data;
        dispatch(
          actions.accountFloatingGroupRelationsFetched({
            totalCount: TotalCount,
            entities: Items,
          })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't find accountFloatingGroupRelations";
        dispatch(actions.catchError({ error, callType: callTypes.list }));
      });
  };

export const fetchAccountFloatingGroupRelation = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.accountFloatingGroupRelationFetched({
        accountFloatingGroupRelationForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getById(id)
    .then((response) => {
      const accountFloatingGroupRelation = response.data;
      dispatch(
        actions.accountFloatingGroupRelationFetched({
          accountFloatingGroupRelationForEdit: accountFloatingGroupRelation,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find accountFloatingGroupRelation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const remove = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .remove(id)
    .then((response) => {
      dispatch(actions.accountFloatingGroupRelationDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete accountFloatingGroupRelation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};

export const create =
  (accountFloatingGroupRelationForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .create(accountFloatingGroupRelationForCreation)
      .then((response) => {
        const accountFloatingGroupRelation = response.data;
        dispatch(
          actions.accountFloatingGroupRelationCreated(
            accountFloatingGroupRelation
          )
        );

        return accountFloatingGroupRelation;
      })
      .catch((error) => {
        error.clientMessage = "Can't create accountFloatingGroupRelation";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };

export const update = (id, data) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .update(id, data)
    .then((response) => {
      dispatch(actions.accountFloatingGroupRelationUpdated({ data }));

      return data;
    })
    .catch((error) => {
      error.clientMessage = "Can't update accountFloatingGroupRelation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};

export const removeIds = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .removeIds(ids)
    .then(() => {
      dispatch(actions.accountFloatingGroupRelationsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete accountFloatingGroupRelations";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
