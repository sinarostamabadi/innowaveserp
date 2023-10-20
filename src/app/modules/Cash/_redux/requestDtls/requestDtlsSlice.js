
import { createSlice } from "@reduxjs/toolkit";
const initialRequestDtlsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  requestDtlForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const requestDtlsSlice = createSlice({
  name: "requestDtls",
  initialState: initialRequestDtlsState,
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
    // getRequestDtlById  
    requestDtlFetched: (state, action) => {
      state.actionsLoading = false;
      state.requestDtlForEdit = action.payload.requestDtlForEdit;
      state.error = null;
    },
    // findRequestDtls  
    requestDtlsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRequestDtl  
    requestDtlCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRequestDtl  
    requestDtlUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.RequestDtlId === action.payload.requestDtl.RequestDtlId) {
          return action.payload.requestDtl;
        }
        return entity;
      });
    },
    // deleteRequestDtl  
    requestDtlDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RequestDtlId !== action.payload.RequestDtlId  
      );
    },
    // deleteRequestDtls  
    requestDtlsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RequestDtlId)  
      );
    },
    // requestDtlsUpdateState  
    requestDtlsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RequestDtlId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
