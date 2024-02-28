import { createSlice } from "@reduxjs/toolkit";
const initialChequeStatusesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  chequeStatusForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const chequeStatusesSlice = createSlice({
  name: "chequeStatuses",
  initialState: initialChequeStatusesState,
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
    // getChequeStatusById
    chequeStatusFetched: (state, action) => {
      state.actionsLoading = false;
      state.chequeStatusForEdit = action.payload.chequeStatusForEdit;
      state.error = null;
    },
    // findChequeStatuses
    chequeStatusesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createChequeStatus
    chequeStatusCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateChequeStatus
    chequeStatusUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.ChequeStatusId === action.payload.chequeStatus.ChequeStatusId
        ) {
          return action.payload.chequeStatus;
        }
        return entity;
      });
    },
    // deleteChequeStatus
    chequeStatusDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ChequeStatusId !== action.payload.ChequeStatusId
      );
    },
    // deleteChequeStatuses
    chequeStatusesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ChequeStatusId)
      );
    },
    // chequeStatusesUpdateState
    chequeStatusesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ChequeStatusId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
