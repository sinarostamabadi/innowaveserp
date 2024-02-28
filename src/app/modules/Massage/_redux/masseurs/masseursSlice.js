import { createSlice } from "@reduxjs/toolkit";
const initialMasseursState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  masseurForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const masseursSlice = createSlice({
  name: "masseurs",
  initialState: initialMasseursState,
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
    // getMasseurById
    masseurFetched: (state, action) => {
      state.actionsLoading = false;
      state.masseurForEdit = action.payload.masseurForEdit;
      state.error = null;
    },
    // findMasseurs
    masseursFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMasseur
    masseurCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMasseur
    masseurUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MasseurId === action.payload.masseur.MasseurId) {
          return action.payload.masseur;
        }
        return entity;
      });
    },
    // deleteMasseur
    masseurDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MasseurId !== action.payload.MasseurId
      );
    },
    // deleteMasseurs
    masseursDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MasseurId)
      );
    },
    // masseursUpdateState
    masseursStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MasseurId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
