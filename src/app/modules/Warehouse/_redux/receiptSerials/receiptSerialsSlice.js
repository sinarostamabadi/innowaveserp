
import { createSlice } from "@reduxjs/toolkit";
const initialReceiptSerialsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  receiptSerialForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const receiptSerialsSlice = createSlice({
  name: "receiptSerials",
  initialState: initialReceiptSerialsState,
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
    // getReceiptSerialById  
    receiptSerialFetched: (state, action) => {
      state.actionsLoading = false;
      state.receiptSerialForEdit = action.payload.receiptSerialForEdit;
      state.error = null;
    },
    // findReceiptSerials  
    receiptSerialsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createReceiptSerial  
    receiptSerialCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateReceiptSerial  
    receiptSerialUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ReceiptSerialId === action.payload.receiptSerial.ReceiptSerialId) {
          return action.payload.receiptSerial;
        }
        return entity;
      });
    },
    // deleteReceiptSerial  
    receiptSerialDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ReceiptSerialId !== action.payload.ReceiptSerialId  
      );
    },
    // deleteReceiptSerials  
    receiptSerialsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ReceiptSerialId)  
      );
    },
    // receiptSerialsUpdateState  
    receiptSerialsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ReceiptSerialId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
