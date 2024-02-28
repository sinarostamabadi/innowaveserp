import { createSlice } from "@reduxjs/toolkit";
const initialContractEndTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  contractEndTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const contractEndTypesSlice = createSlice({
  name: "contractEndTypes",
  initialState: initialContractEndTypesState,
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
    // getContractEndTypeById
    contractEndTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.contractEndTypeForEdit = action.payload.contractEndTypeForEdit;
      state.error = null;
    },
    // findContractEndTypes
    contractEndTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createContractEndType
    contractEndTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateContractEndType
    contractEndTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.ContractEndTypeId ===
          action.payload.contractEndType.ContractEndTypeId
        ) {
          return action.payload.contractEndType;
        }
        return entity;
      });
    },
    // deleteContractEndType
    contractEndTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ContractEndTypeId !== action.payload.ContractEndTypeId
      );
    },
    // deleteContractEndTypes
    contractEndTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ContractEndTypeId)
      );
    },
    // contractEndTypesUpdateState
    contractEndTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ContractEndTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
