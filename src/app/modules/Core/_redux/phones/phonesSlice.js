import { createSlice } from "@reduxjs/toolkit";
const initialPhonesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  phoneForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const phonesSlice = createSlice({
  name: "phones",
  initialState: initialPhonesState,
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
    // getPhoneById
    phoneFetched: (state, action) => {
      state.actionsLoading = false;
      state.phoneForEdit = action.payload.phoneForEdit;
      state.error = null;
    },
    // findPhones
    phonesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPhone
    phoneCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePhone
    phoneUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PhoneId === action.payload.phone.PhoneId) {
          return action.payload.phone;
        }
        return entity;
      });
    },
    // deletePhone
    phoneDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PhoneId !== action.payload.PhoneId
      );
    },
    // deletePhones
    phonesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PhoneId)
      );
    },
    // phonesUpdateState
    phonesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PhoneId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
