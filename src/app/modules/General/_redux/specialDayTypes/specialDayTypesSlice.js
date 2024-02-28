import { createSlice } from "@reduxjs/toolkit";
const initialSpecialDayTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  specialDayTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const specialDayTypesSlice = createSlice({
  name: "specialDayTypes",
  initialState: initialSpecialDayTypesState,
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
    // getSpecialDayTypeById
    specialDayTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.specialDayTypeForEdit = action.payload.specialDayTypeForEdit;
      state.error = null;
    },
    // findSpecialDayTypes
    specialDayTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSpecialDayType
    specialDayTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSpecialDayType
    specialDayTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.SpecialDayTypeId ===
          action.payload.specialDayType.SpecialDayTypeId
        ) {
          return action.payload.specialDayType;
        }
        return entity;
      });
    },
    // deleteSpecialDayType
    specialDayTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SpecialDayTypeId !== action.payload.SpecialDayTypeId
      );
    },
    // deleteSpecialDayTypes
    specialDayTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SpecialDayTypeId)
      );
    },
    // specialDayTypesUpdateState
    specialDayTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SpecialDayTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
