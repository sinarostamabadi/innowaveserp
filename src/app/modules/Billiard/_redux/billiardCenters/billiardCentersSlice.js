import { createSlice } from "@reduxjs/toolkit";
const initialBilliardCentersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  billiardCenterForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const billiardCentersSlice = createSlice({
  name: "billiardCenters",
  initialState: initialBilliardCentersState,
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
    // getBilliardCenterById
    billiardCenterFetched: (state, action) => {
      state.actionsLoading = false;
      state.billiardCenterForEdit = action.payload.billiardCenterForEdit;
      state.error = null;
    },
    // findBilliardCenters
    billiardCentersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBilliardCenter
    billiardCenterCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBilliardCenter
    billiardCenterUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.BilliardCenterId ===
          action.payload.billiardCenter.BilliardCenterId
        ) {
          return action.payload.billiardCenter;
        }
        return entity;
      });
    },
    // deleteBilliardCenter
    billiardCenterDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BilliardCenterId !== action.payload.BilliardCenterId
      );
    },
    // deleteBilliardCenters
    billiardCentersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BilliardCenterId)
      );
    },
    // billiardCentersUpdateState
    billiardCentersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BilliardCenterId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
