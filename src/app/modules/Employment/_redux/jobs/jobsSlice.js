
import { createSlice } from "@reduxjs/toolkit";
const initialJobsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  jobForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const jobsSlice = createSlice({
  name: "jobs",
  initialState: initialJobsState,
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
    // getJobById  
    jobFetched: (state, action) => {
      state.actionsLoading = false;
      state.jobForEdit = action.payload.jobForEdit;
      state.error = null;
    },
    // findJobs  
    jobsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createJob  
    jobCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateJob  
    jobUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.JobId === action.payload.job.JobId) {
          return action.payload.job;
        }
        return entity;
      });
    },
    // deleteJob  
    jobDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.JobId !== action.payload.JobId  
      );
    },
    // deleteJobs  
    jobsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.JobId)  
      );
    },
    // jobsUpdateState  
    jobsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.JobId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
