import { createSlice } from "@reduxjs/toolkit";
const initialCompanyTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  companyTypeForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const companyTypesSlice = createSlice({
  name: "companyTypes",
  initialState: initialCompanyTypesState,
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
    // getCompanyTypeById  
    companyTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.companyTypeForEdit = action.payload.companyTypeForEdit;
      state.error = null;
    },
    // findCompanyTypes  
    companyTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCompanyType  
    companyTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCompanyType  
    companyTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CompanyTypeId === action.payload.companyType.CompanyTypeId) {
          return action.payload.companyType;
        }
        return entity;
      });
    },
    // deleteCompanyType  
    companyTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CompanyTypeId !== action.payload.CompanyTypeId  
      );
    },
    // deleteCompanyTypes  
    companyTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CompanyTypeId)  
      );
    },
    // companyTypesUpdateState  
    companyTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CompanyTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
