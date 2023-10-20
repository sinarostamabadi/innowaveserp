
import { createSlice } from "@reduxjs/toolkit";
const initialReceiptDtlsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  receiptDtlForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const receiptDtlsSlice = createSlice({
  name: "receiptDtls",
  initialState: initialReceiptDtlsState,
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
    // getReceiptDtlById  
    receiptDtlFetched: (state, action) => {
      state.actionsLoading = false;
      state.receiptDtlForEdit = action.payload.receiptDtlForEdit;
      state.error = null;
    },
    // findReceiptDtls  
    receiptDtlsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createReceiptDtl  
    receiptDtlCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateReceiptDtl  
    receiptDtlUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ReceiptDtlId === action.payload.receiptDtl.ReceiptDtlId) {
          return action.payload.receiptDtl;
        }
        return entity;
      });
    },
    // deleteReceiptDtl  
    receiptDtlDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ReceiptDtlId !== action.payload.ReceiptDtlId  
      );
    },
    // deleteReceiptDtls  
    receiptDtlsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ReceiptDtlId)  
      );
    },
    // receiptDtlsUpdateState  
    receiptDtlsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ReceiptDtlId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
