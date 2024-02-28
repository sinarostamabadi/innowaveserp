import { createSlice } from "@reduxjs/toolkit";
const initialBuySerialsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  buySerialForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const buySerialsSlice = createSlice({
  name: "buySerials",
  initialState: initialBuySerialsState,
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
    // getBuySerialById
    buySerialFetched: (state, action) => {
      state.actionsLoading = false;
      state.buySerialForEdit = action.payload.buySerialForEdit;
      state.error = null;
    },
    // findBuySerials
    buySerialsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBuySerial
    buySerialCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBuySerial
    buySerialUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BuySerialId === action.payload.buySerial.BuySerialId) {
          return action.payload.buySerial;
        }
        return entity;
      });
    },
    // deleteBuySerial
    buySerialDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BuySerialId !== action.payload.BuySerialId
      );
    },
    // deleteBuySerials
    buySerialsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BuySerialId)
      );
    },
    // buySerialsUpdateState
    buySerialsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BuySerialId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
