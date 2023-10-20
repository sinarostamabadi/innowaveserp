
import { createSlice } from "@reduxjs/toolkit";
const initialMenuItemRatesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  menuItemRateForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const menuItemRatesSlice = createSlice({
  name: "menuItemRates",
  initialState: initialMenuItemRatesState,
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
    // getMenuItemRateById  
    menuItemRateFetched: (state, action) => {
      state.actionsLoading = false;
      state.menuItemRateForEdit = action.payload.menuItemRateForEdit;
      state.error = null;
    },
    // findMenuItemRates  
    menuItemRatesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMenuItemRate  
    menuItemRateCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMenuItemRate  
    menuItemRateUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MenuItemRateId === action.payload.menuItemRate.MenuItemRateId) {
          return action.payload.menuItemRate;
        }
        return entity;
      });
    },
    // deleteMenuItemRate  
    menuItemRateDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MenuItemRateId !== action.payload.MenuItemRateId  
      );
    },
    // deleteMenuItemRates  
    menuItemRatesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MenuItemRateId)  
      );
    },
    // menuItemRatesUpdateState  
    menuItemRatesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MenuItemRateId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
