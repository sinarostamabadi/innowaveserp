import { createSlice } from "@reduxjs/toolkit";
const initialMassageReservePricesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  massageReservePriceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const massageReservePricesSlice = createSlice({
  name: "massageReservePrices",
  initialState: initialMassageReservePricesState,
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
    // getMassageReservePriceById
    massageReservePriceFetched: (state, action) => {
      state.actionsLoading = false;
      state.massageReservePriceForEdit =
        action.payload.massageReservePriceForEdit;
      state.error = null;
    },
    // findMassageReservePrices
    massageReservePricesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMassageReservePrice
    massageReservePriceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMassageReservePrice
    massageReservePriceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.MassageReservePriceId ===
          action.payload.massageReservePrice.MassageReservePriceId
        ) {
          return action.payload.massageReservePrice;
        }
        return entity;
      });
    },
    // deleteMassageReservePrice
    massageReservePriceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.MassageReservePriceId !== action.payload.MassageReservePriceId
      );
    },
    // deleteMassageReservePrices
    massageReservePricesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MassageReservePriceId)
      );
    },
    // massageReservePricesUpdateState
    massageReservePricesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MassageReservePriceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
