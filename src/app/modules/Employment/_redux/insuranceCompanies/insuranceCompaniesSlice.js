
import { createSlice } from "@reduxjs/toolkit";
const initialInsuranceCompaniesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  insuranceCompanyForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const insuranceCompaniesSlice = createSlice({
  name: "insuranceCompanies",
  initialState: initialInsuranceCompaniesState,
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
    // getInsuranceCompanyById  
    insuranceCompanyFetched: (state, action) => {
      state.actionsLoading = false;
      state.insuranceCompanyForEdit = action.payload.insuranceCompanyForEdit;
      state.error = null;
    },
    // findInsuranceCompanies  
    insuranceCompaniesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createInsuranceCompany  
    insuranceCompanyCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateInsuranceCompany  
    insuranceCompanyUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.InsuranceCompanyId === action.payload.insuranceCompany.InsuranceCompanyId) {
          return action.payload.insuranceCompany;
        }
        return entity;
      });
    },
    // deleteInsuranceCompany  
    insuranceCompanyDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.InsuranceCompanyId !== action.payload.InsuranceCompanyId  
      );
    },
    // deleteInsuranceCompanies  
    insuranceCompaniesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.InsuranceCompanyId)  
      );
    },
    // insuranceCompaniesUpdateState  
    insuranceCompaniesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.InsuranceCompanyId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
