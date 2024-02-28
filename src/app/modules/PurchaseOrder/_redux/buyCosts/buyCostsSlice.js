import { createSlice } from "@reduxjs/toolkit";
const initialBuyCostsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  buyCostForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const buyCostsSlice = createSlice({
  name: "buyCosts",
  initialState: initialBuyCostsState,
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
    // getBuyCostById
    buyCostFetched: (state, action) => {
      state.actionsLoading = false;
      state.buyCostForEdit = action.payload.buyCostForEdit;
      state.error = null;
    },
    // findBuyCosts
    buyCostsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBuyCost
    buyCostCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBuyCost
    buyCostUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BuyCostId === action.payload.buyCost.BuyCostId) {
          return action.payload.buyCost;
        }
        return entity;
      });
    },
    // deleteBuyCost
    buyCostDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BuyCostId !== action.payload.BuyCostId
      );
    },
    // deleteBuyCosts
    buyCostsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BuyCostId)
      );
    },
    // buyCostsUpdateState
    buyCostsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BuyCostId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
