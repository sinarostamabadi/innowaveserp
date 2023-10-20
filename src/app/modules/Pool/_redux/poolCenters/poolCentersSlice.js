
import { createSlice } from "@reduxjs/toolkit";
const initialPoolCentersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  poolCenterForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const poolCentersSlice = createSlice({
  name: "poolCenters",
  initialState: initialPoolCentersState,
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
    // getPoolCenterById  
    poolCenterFetched: (state, action) => {
      state.actionsLoading = false;
      state.poolCenterForEdit = action.payload.poolCenterForEdit;
      state.error = null;
    },
    // findPoolCenters  
    poolCentersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPoolCenter  
    poolCenterCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePoolCenter  
    poolCenterUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PoolCenterId === action.payload.poolCenter.PoolCenterId) {
          return action.payload.poolCenter;
        }
        return entity;
      });
    },
    // deletePoolCenter  
    poolCenterDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PoolCenterId !== action.payload.PoolCenterId  
      );
    },
    // deletePoolCenters  
    poolCentersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PoolCenterId)  
      );
    },
    // poolCentersUpdateState  
    poolCentersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PoolCenterId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
