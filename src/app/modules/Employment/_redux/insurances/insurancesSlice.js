import { createSlice } from "@reduxjs/toolkit";
const initialInsurancesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  insuranceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const insurancesSlice = createSlice({
  name: "insurances",
  initialState: initialInsurancesState,
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
    // getInsuranceById
    insuranceFetched: (state, action) => {
      state.actionsLoading = false;
      state.insuranceForEdit = action.payload.insuranceForEdit;
      state.error = null;
    },
    // findInsurances
    insurancesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createInsurance
    insuranceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateInsurance
    insuranceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.InsuranceId === action.payload.insurance.InsuranceId) {
          return action.payload.insurance;
        }
        return entity;
      });
    },
    // deleteInsurance
    insuranceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.InsuranceId !== action.payload.InsuranceId
      );
    },
    // deleteInsurances
    insurancesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.InsuranceId)
      );
    },
    // insurancesUpdateState
    insurancesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.InsuranceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
