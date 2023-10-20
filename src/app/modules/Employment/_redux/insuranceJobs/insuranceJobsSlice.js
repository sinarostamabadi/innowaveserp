
import { createSlice } from "@reduxjs/toolkit";
const initialInsuranceJobsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  insuranceJobForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const insuranceJobsSlice = createSlice({
  name: "insuranceJobs",
  initialState: initialInsuranceJobsState,
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
    // getInsuranceJobById  
    insuranceJobFetched: (state, action) => {
      state.actionsLoading = false;
      state.insuranceJobForEdit = action.payload.insuranceJobForEdit;
      state.error = null;
    },
    // findInsuranceJobs  
    insuranceJobsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createInsuranceJob  
    insuranceJobCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateInsuranceJob  
    insuranceJobUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.InsuranceJobId === action.payload.insuranceJob.InsuranceJobId) {
          return action.payload.insuranceJob;
        }
        return entity;
      });
    },
    // deleteInsuranceJob  
    insuranceJobDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.InsuranceJobId !== action.payload.InsuranceJobId  
      );
    },
    // deleteInsuranceJobs  
    insuranceJobsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.InsuranceJobId)  
      );
    },
    // insuranceJobsUpdateState  
    insuranceJobsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.InsuranceJobId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
