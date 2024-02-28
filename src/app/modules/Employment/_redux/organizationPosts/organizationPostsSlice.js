import { createSlice } from "@reduxjs/toolkit";
const initialOrganizationPostsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  organizationPostForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const organizationPostsSlice = createSlice({
  name: "organizationPosts",
  initialState: initialOrganizationPostsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getOrganizationPostById
    organizationPostFetched: (state, action) => {
      state.actionsLoading = false;
      state.organizationPostForEdit = action.payload.organizationPostForEdit;
      state.error = null;
    },
    // findOrganizationPosts
    organizationPostsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createOrganizationPost
    organizationPostCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateOrganizationPost
    organizationPostUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.OrganizationPostId ===
          action.payload.organizationPost.OrganizationPostId
        ) {
          return action.payload.organizationPost;
        }
        return entity;
      });
    },
    // deleteOrganizationPost
    organizationPostDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.OrganizationPostId !== action.payload.OrganizationPostId
      );
    },
    // deleteOrganizationPosts
    organizationPostsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.OrganizationPostId)
      );
    },
    // organizationPostsUpdateState
    organizationPostsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.OrganizationPostId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
