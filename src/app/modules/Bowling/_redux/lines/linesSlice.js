import { createSlice } from "@reduxjs/toolkit";
const initialLinesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  lineForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const linesSlice = createSlice({
  name: "lines",
  initialState: initialLinesState,
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
    // getLineById
    lineFetched: (state, action) => {
      state.actionsLoading = false;
      state.lineForEdit = action.payload.lineForEdit;
      state.error = null;
    },
    // findLines
    linesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createLine
    lineCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);

      return;
    },
    // updateLine
    lineUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.LineId === action.payload.line.LineId) {
          return action.payload.line;
        }
        return entity;
      });

      return;
    },
    // deleteLine
    lineDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.LineId !== action.payload.LineId
      );
    },
    // deleteLines
    linesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.LineId)
      );
    },
    // linesUpdateState
    linesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.LineId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
