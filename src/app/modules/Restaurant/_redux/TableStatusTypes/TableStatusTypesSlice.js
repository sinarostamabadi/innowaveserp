
import { createSlice } from "@reduxjs/toolkit";
const initialTableStatusTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  tableStatusTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const tableStatusTypesSlice = createSlice({
  name: "tableStatusTypes",
  initialState: initialTableStatusTypesState,
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
    // getTableStatusTypeById  
    tableStatusTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.tableStatusTypeForEdit = action.payload.tableStatusTypeForEdit;
      state.error = null;
    },
    // findTableStatusTypes  
    tableStatusTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createTableStatusType  
    tableStatusTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateTableStatusType  
    tableStatusTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.TableStatusTypeId === action.payload.tableStatusType.TableStatusTypeId) {
          return action.payload.tableStatusType;
        }
        return entity;
      });
    },
    // deleteTableStatusType  
    tableStatusTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.TableStatusTypeId !== action.payload.TableStatusTypeId  
      );
    },
    // deleteTableStatusTypes  
    tableStatusTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.TableStatusTypeId)  
      );
    },
    // tableStatusTypesUpdateState  
    tableStatusTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.TableStatusTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
