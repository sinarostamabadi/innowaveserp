import { createSlice } from "@reduxjs/toolkit";
const initialCompaniesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  companyForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const companiesSlice = createSlice({
  name: "companies",
  initialState: initialCompaniesState,
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
    // getCompanyById
    companyFetched: (state, action) => {
      state.actionsLoading = false;
      state.companyForEdit = action.payload.companyForEdit;
      state.error = null;
    },
    // findCompanies
    companiesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCompany
    companyCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCompany
    companyUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CompanyId === action.payload.company.CompanyId) {
          return action.payload.company;
        }
        return entity;
      });
    },
    // deleteCompany
    companyDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CompanyId !== action.payload.CompanyId
      );
    },
    // deleteCompanies
    companiesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CompanyId)
      );
    },
    // companiesUpdateState
    companiesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CompanyId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
