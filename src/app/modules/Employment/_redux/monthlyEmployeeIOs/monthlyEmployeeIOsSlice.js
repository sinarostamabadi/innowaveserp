import { createSlice } from "@reduxjs/toolkit";
const initialMonthlyEmployeeIOsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  monthlyEmployeeIOForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const monthlyEmployeeIOsSlice = createSlice({
  name: "monthlyEmployeeIOs",
  initialState: initialMonthlyEmployeeIOsState,
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
    // getMonthlyEmployeeIOById
    monthlyEmployeeIOFetched: (state, action) => {
      state.actionsLoading = false;
      state.monthlyEmployeeIOForEdit = action.payload.monthlyEmployeeIOForEdit;
      state.error = null;
    },
    // findMonthlyEmployeeIOs
    monthlyEmployeeIOsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMonthlyEmployeeIO
    monthlyEmployeeIOCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMonthlyEmployeeIO
    monthlyEmployeeIOUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.MonthlyEmployeeIOId ===
          action.payload.monthlyEmployeeIO.MonthlyEmployeeIOId
        ) {
          return action.payload.monthlyEmployeeIO;
        }
        return entity;
      });
    },
    // deleteMonthlyEmployeeIO
    monthlyEmployeeIODeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MonthlyEmployeeIOId !== action.payload.MonthlyEmployeeIOId
      );
    },
    // deleteMonthlyEmployeeIOs
    monthlyEmployeeIOsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MonthlyEmployeeIOId)
      );
    },
    // monthlyEmployeeIOsUpdateState
    monthlyEmployeeIOsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MonthlyEmployeeIOId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
