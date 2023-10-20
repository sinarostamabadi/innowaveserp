
import { createSlice } from "@reduxjs/toolkit";
const initialBankTransfersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bankTransferForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bankTransfersSlice = createSlice({
  name: "bankTransfers",
  initialState: initialBankTransfersState,
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
    // getBankTransferById  
    bankTransferFetched: (state, action) => {
      state.actionsLoading = false;
      state.bankTransferForEdit = action.payload.bankTransferForEdit;
      state.error = null;
    },
    // findBankTransfers  
    bankTransfersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBankTransfer  
    bankTransferCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBankTransfer  
    bankTransferUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BankTransferId === action.payload.bankTransfer.BankTransferId) {
          return action.payload.bankTransfer;
        }
        return entity;
      });
    },
    // deleteBankTransfer  
    bankTransferDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BankTransferId !== action.payload.BankTransferId  
      );
    },
    // deleteBankTransfers  
    bankTransfersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BankTransferId)  
      );
    },
    // bankTransfersUpdateState  
    bankTransfersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BankTransferId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
