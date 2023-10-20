
import { createSlice } from "@reduxjs/toolkit";
const initialMassageReservesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  massageReserveForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const massageReservesSlice = createSlice({
  name: "massageReserves",
  initialState: initialMassageReservesState,
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
    // getMassageReserveById  
    massageReserveFetched: (state, action) => {
      state.actionsLoading = false;
      state.massageReserveForEdit = action.payload.massageReserveForEdit;
      state.error = null;
    },
    // findMassageReserves  
    massageReservesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMassageReserve  
    massageReserveCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMassageReserve  
    massageReserveUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MassageReserveId === action.payload.massageReserve.MassageReserveId) {
          return action.payload.massageReserve;
        }
        return entity;
      });
    },
    // deleteMassageReserve  
    massageReserveDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MassageReserveId !== action.payload.MassageReserveId  
      );
    },
    // deleteMassageReserves  
    massageReservesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MassageReserveId)  
      );
    },
    // massageReservesUpdateState  
    massageReservesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MassageReserveId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
