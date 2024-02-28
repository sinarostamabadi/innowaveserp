import { createSlice } from "@reduxjs/toolkit";
const initialCreditsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  creditForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const creditsSlice = createSlice({
  name: "credits",
  initialState: initialCreditsState,
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
    // getCreditById
    creditFetched: (state, action) => {
      state.actionsLoading = false;
      state.creditForEdit = action.payload.creditForEdit;
      state.error = null;
    },
    // findCredits
    creditsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCredit
    creditCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCredit
    creditUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CreditId === action.payload.credit.CreditId) {
          return action.payload.credit;
        }
        return entity;
      });
    },
    // deleteCredit
    creditDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CreditId !== action.payload.CreditId
      );
    },
    // deleteCredits
    creditsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CreditId)
      );
    },
    // creditsUpdateState
    creditsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CreditId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
