
import { createSlice } from "@reduxjs/toolkit";
const initialMassageDiscountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  massageDiscountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const massageDiscountsSlice = createSlice({
  name: "massageDiscounts",
  initialState: initialMassageDiscountsState,
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
    // getMassageDiscountById  
    massageDiscountFetched: (state, action) => {
      state.actionsLoading = false;
      state.massageDiscountForEdit = action.payload.massageDiscountForEdit;
      state.error = null;
    },
    // findMassageDiscounts  
    massageDiscountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMassageDiscount  
    massageDiscountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMassageDiscount  
    massageDiscountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MassageDiscountId === action.payload.massageDiscount.MassageDiscountId) {
          return action.payload.massageDiscount;
        }
        return entity;
      });
    },
    // deleteMassageDiscount  
    massageDiscountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MassageDiscountId !== action.payload.MassageDiscountId  
      );
    },
    // deleteMassageDiscounts  
    massageDiscountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MassageDiscountId)  
      );
    },
    // massageDiscountsUpdateState  
    massageDiscountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MassageDiscountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
