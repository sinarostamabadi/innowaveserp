
import { createSlice } from "@reduxjs/toolkit";
const initialLinkDocumentParametersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  linkDocumentParameterForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const linkDocumentParametersSlice = createSlice({
  name: "linkDocumentParameters",
  initialState: initialLinkDocumentParametersState,
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
    // getLinkDocumentParameterById  
    linkDocumentParameterFetched: (state, action) => {
      state.actionsLoading = false;
      state.linkDocumentParameterForEdit = action.payload.linkDocumentParameterForEdit;
      state.error = null;
    },
    // findLinkDocumentParameters  
    linkDocumentParametersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createLinkDocumentParameter  
    linkDocumentParameterCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateLinkDocumentParameter  
    linkDocumentParameterUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.LinkDocumentParameterId === action.payload.linkDocumentParameter.LinkDocumentParameterId) {
          return action.payload.linkDocumentParameter;
        }
        return entity;
      });
    },
    // deleteLinkDocumentParameter  
    linkDocumentParameterDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.LinkDocumentParameterId !== action.payload.LinkDocumentParameterId  
      );
    },
    // deleteLinkDocumentParameters  
    linkDocumentParametersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.LinkDocumentParameterId)  
      );
    },
    // linkDocumentParametersUpdateState  
    linkDocumentParametersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.LinkDocumentParameterId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
