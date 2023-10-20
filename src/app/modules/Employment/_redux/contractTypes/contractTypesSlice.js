
import { createSlice } from "@reduxjs/toolkit";
const initialContractTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  contractTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const contractTypesSlice = createSlice({
  name: "contractTypes",
  initialState: initialContractTypesState,
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
    // getContractTypeById  
    contractTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.contractTypeForEdit = action.payload.contractTypeForEdit;
      state.error = null;
    },
    // findContractTypes  
    contractTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createContractType  
    contractTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateContractType  
    contractTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ContractTypeId === action.payload.contractType.ContractTypeId) {
          return action.payload.contractType;
        }
        return entity;
      });
    },
    // deleteContractType  
    contractTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ContractTypeId !== action.payload.ContractTypeId  
      );
    },
    // deleteContractTypes  
    contractTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ContractTypeId)  
      );
    },
    // contractTypesUpdateState  
    contractTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ContractTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
