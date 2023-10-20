
import { createSlice } from "@reduxjs/toolkit";
const initialMassageCentersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  massageCenterForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const massageCentersSlice = createSlice({
  name: "massageCenters",
  initialState: initialMassageCentersState,
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
    // getMassageCenterById  
    massageCenterFetched: (state, action) => {
      state.actionsLoading = false;
      state.massageCenterForEdit = action.payload.massageCenterForEdit;
      state.error = null;
    },
    // findMassageCenters  
    massageCentersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMassageCenter  
    massageCenterCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMassageCenter  
    massageCenterUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MassageCenterId === action.payload.massageCenter.MassageCenterId) {
          return action.payload.massageCenter;
        }
        return entity;
      });
    },
    // deleteMassageCenter  
    massageCenterDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MassageCenterId !== action.payload.MassageCenterId  
      );
    },
    // deleteMassageCenters  
    massageCentersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MassageCenterId)  
      );
    },
    // massageCentersUpdateState  
    massageCentersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MassageCenterId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
