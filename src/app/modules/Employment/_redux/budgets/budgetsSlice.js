
import { createSlice } from "@reduxjs/toolkit";
const initialBudgetsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  budgetForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const budgetsSlice = createSlice({
  name: "budgets",
  initialState: initialBudgetsState,
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
    // getBudgetById  
    budgetFetched: (state, action) => {
      state.actionsLoading = false;
      state.budgetForEdit = action.payload.budgetForEdit;
      state.error = null;
    },
    // findBudgets  
    budgetsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBudget  
    budgetCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBudget  
    budgetUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BudgetId === action.payload.budget.BudgetId) {
          return action.payload.budget;
        }
        return entity;
      });
    },
    // deleteBudget  
    budgetDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BudgetId !== action.payload.BudgetId  
      );
    },
    // deleteBudgets  
    budgetsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BudgetId)  
      );
    },
    // budgetsUpdateState  
    budgetsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BudgetId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
