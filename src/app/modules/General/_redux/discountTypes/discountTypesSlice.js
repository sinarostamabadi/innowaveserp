import { createSlice } from "@reduxjs/toolkit";
const initialDiscountTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  discountTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const discountTypesSlice = createSlice({
  name: "discountTypes",
  initialState: initialDiscountTypesState,
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
    // getDiscountTypeById
    discountTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.discountTypeForEdit = action.payload.discountTypeForEdit;
      state.error = null;
    },
    // findDiscountTypes
    discountTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDiscountType
    discountTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateDiscountType
    discountTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.DiscountTypeId === action.payload.discountType.DiscountTypeId
        ) {
          return action.payload.discountType;
        }
        return entity;
      });
    },
    // deleteDiscountType
    discountTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.DiscountTypeId !== action.payload.DiscountTypeId
      );
    },
    // deleteDiscountTypes
    discountTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.DiscountTypeId)
      );
    },
    // discountTypesUpdateState
    discountTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.DiscountTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
