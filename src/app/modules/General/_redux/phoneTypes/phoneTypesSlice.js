import { createSlice } from "@reduxjs/toolkit";
const initialPhoneTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  phoneTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const phoneTypesSlice = createSlice({
  name: "phoneTypes",
  initialState: initialPhoneTypesState,
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
    // getPhoneTypeById
    phoneTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.phoneTypeForEdit = action.payload.phoneTypeForEdit;
      state.error = null;
    },
    // findPhoneTypes
    phoneTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPhoneType
    phoneTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePhoneType
    phoneTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PhoneTypeId === action.payload.phoneType.PhoneTypeId) {
          return action.payload.phoneType;
        }
        return entity;
      });
    },
    // deletePhoneType
    phoneTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PhoneTypeId !== action.payload.PhoneTypeId
      );
    },
    // deletePhoneTypes
    phoneTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PhoneTypeId)
      );
    },
    // phoneTypesUpdateState
    phoneTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PhoneTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
