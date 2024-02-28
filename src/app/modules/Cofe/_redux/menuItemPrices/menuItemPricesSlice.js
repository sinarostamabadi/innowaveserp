import { createSlice } from "@reduxjs/toolkit";
const initialMenuItemPricesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  menuItemPriceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const menuItemPricesSlice = createSlice({
  name: "menuItemPrices",
  initialState: initialMenuItemPricesState,
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
    // getMenuItemPriceById
    menuItemPriceFetched: (state, action) => {
      state.actionsLoading = false;
      state.menuItemPriceForEdit = action.payload.menuItemPriceForEdit;
      state.error = null;
    },
    // findMenuItemPrices
    menuItemPricesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMenuItemPrice
    menuItemPriceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMenuItemPrice
    menuItemPriceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.MenuItemPriceId ===
          action.payload.menuItemPrice.MenuItemPriceId
        ) {
          return action.payload.menuItemPrice;
        }
        return entity;
      });
    },
    // deleteMenuItemPrice
    menuItemPriceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MenuItemPriceId !== action.payload.MenuItemPriceId
      );
    },
    // deleteMenuItemPrices
    menuItemPricesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MenuItemPriceId)
      );
    },
    // menuItemPricesUpdateState
    menuItemPricesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MenuItemPriceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
