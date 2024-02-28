import { createSlice } from "@reduxjs/toolkit";
const initialInfoAreasState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  infoAreaForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const infoAreasSlice = createSlice({
  name: "infoAreas",
  initialState: initialInfoAreasState,
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
    // getInfoAreaById
    infoAreaFetched: (state, action) => {
      state.actionsLoading = false;
      state.infoAreaForEdit = action.payload.infoAreaForEdit;
      state.error = null;
    },
    // findInfoAreas
    infoAreasFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createInfoArea
    infoAreaCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateInfoArea
    infoAreaUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.InfoAreaId === action.payload.infoArea.InfoAreaId) {
          return action.payload.infoArea;
        }
        return entity;
      });
    },
    // deleteInfoArea
    infoAreaDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.InfoAreaId !== action.payload.InfoAreaId
      );
    },
    // deleteInfoAreas
    infoAreasDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.InfoAreaId)
      );
    },
    // infoAreasUpdateState
    infoAreasStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.InfoAreaId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
