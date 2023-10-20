
import { createSlice } from "@reduxjs/toolkit";
const initialMenuItemIngredientsesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  menuItemIngredientsForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const menuItemIngredientsesSlice = createSlice({
  name: "menuItemIngredientses",
  initialState: initialMenuItemIngredientsesState,
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
    // getMenuItemIngredientsById  
    menuItemIngredientsFetched: (state, action) => {
      state.actionsLoading = false;
      state.menuItemIngredientsForEdit = action.payload.menuItemIngredientsForEdit;
      state.error = null;
    },
    // findMenuItemIngredientses  
    menuItemIngredientsesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMenuItemIngredients  
    menuItemIngredientsCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMenuItemIngredients  
    menuItemIngredientsUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MenuItemIngredientsId === action.payload.menuItemIngredients.MenuItemIngredientsId) {
          return action.payload.menuItemIngredients;
        }
        return entity;
      });
    },
    // deleteMenuItemIngredients  
    menuItemIngredientsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MenuItemIngredientsId !== action.payload.MenuItemIngredientsId  
      );
    },
    // deleteMenuItemIngredientses  
    menuItemIngredientsesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MenuItemIngredientsId)  
      );
    },
    // menuItemIngredientsesUpdateState  
    menuItemIngredientsesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MenuItemIngredientsId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
