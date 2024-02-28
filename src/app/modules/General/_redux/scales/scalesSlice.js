import { createSlice } from "@reduxjs/toolkit";
const initialScalesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  scaleForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const scalesSlice = createSlice({
  name: "scales",
  initialState: initialScalesState,
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
    // getScaleById
    scaleFetched: (state, action) => {
      state.actionsLoading = false;
      state.scaleForEdit = action.payload.scaleForEdit;
      state.error = null;
    },
    // findScales
    scalesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createScale
    scaleCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);

      return;
    },
    // updateScale
    scaleUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ScaleId === action.payload.scale.ScaleId) {
          return action.payload.scale;
        }
        return entity;
      });

      return;
    },
    // deleteScale
    scaleDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ScaleId !== action.payload.ScaleId
      );
    },
    // deleteScales
    scalesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ScaleId)
      );
    },
    // scalesUpdateState
    scalesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ScaleId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
