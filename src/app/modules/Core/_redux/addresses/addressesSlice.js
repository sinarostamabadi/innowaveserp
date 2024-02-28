import { createSlice } from "@reduxjs/toolkit";
const initialAddressesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  addressForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const addressesSlice = createSlice({
  name: "addresses",
  initialState: initialAddressesState,
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
    // getAddressById
    addressFetched: (state, action) => {
      state.actionsLoading = false;
      state.addressForEdit = action.payload.addressForEdit;
      state.error = null;
    },
    // findAddresses
    addressesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAddress
    addressCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateAddress
    addressUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.AddressId === action.payload.address.AddressId) {
          return action.payload.address;
        }
        return entity;
      });
    },
    // deleteAddress
    addressDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.AddressId !== action.payload.AddressId
      );
    },
    // deleteAddresses
    addressesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AddressId)
      );
    },
    // addressesUpdateState
    addressesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.AddressId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
