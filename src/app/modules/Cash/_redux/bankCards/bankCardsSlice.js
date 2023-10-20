
import { createSlice } from "@reduxjs/toolkit";
const initialBankCardsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bankCardForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bankCardsSlice = createSlice({
  name: "bankCards",
  initialState: initialBankCardsState,
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
    // getBankCardById  
    bankCardFetched: (state, action) => {
      state.actionsLoading = false;
      state.bankCardForEdit = action.payload.bankCardForEdit;
      state.error = null;
    },
    // findBankCards  
    bankCardsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBankCard  
    bankCardCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBankCard  
    bankCardUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BankCardId === action.payload.bankCard.BankCardId) {
          return action.payload.bankCard;
        }
        return entity;
      });
    },
    // deleteBankCard  
    bankCardDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BankCardId !== action.payload.BankCardId  
      );
    },
    // deleteBankCards  
    bankCardsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BankCardId)  
      );
    },
    // bankCardsUpdateState  
    bankCardsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BankCardId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
