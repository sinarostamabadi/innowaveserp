import * as requestFromServer from "./organizationPostsCrud";
import { organizationPostsSlice, callTypes } from "./organizationPostsSlice";
const { actions } = organizationPostsSlice;
export const fetchOrganizationPosts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findOrganizationPosts(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.organizationPostsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find organizationPosts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchOrganizationPost = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.organizationPostFetched({ organizationPostForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getOrganizationPostById(id)
    .then((response) => {
      const organizationPost = response.data;
      dispatch(
        actions.organizationPostFetched({
          organizationPostForEdit: organizationPost,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find organizationPost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOrganizationPost = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOrganizationPost(id)
    .then((response) => {
      dispatch(actions.organizationPostDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete organizationPost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createOrganizationPost =
  (organizationPostForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createOrganizationPost(organizationPostForCreation)
      .then((response) => {
        const organizationPost = response.data;
        dispatch(actions.organizationPostCreated(organizationPost));
      })
      .catch((error) => {
        error.clientMessage = "Can't create organizationPost";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateOrganizationPost = (organizationPost) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOrganizationPost(organizationPost)
    .then((response) => {
      dispatch(actions.organizationPostUpdated({ organizationPost }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update organizationPost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOrganizationPostsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForOrganizationPosts(ids, status)
    .then(() => {
      dispatch(actions.organizationPostsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update organizationPosts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOrganizationPosts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOrganizationPosts(ids)
    .then(() => {
      dispatch(actions.organizationPostsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete organizationPosts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
