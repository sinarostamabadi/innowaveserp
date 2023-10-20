import { createSlice } from "@reduxjs/toolkit";
const initialEducationsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  educationForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const educationsSlice = createSlice({
  name: "educations",
  initialState: initialEducationsState,
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
    // getEducationById  
    educationFetched: (state, action) => {
      state.actionsLoading = false;
      state.educationForEdit = action.payload.educationForEdit;
      state.error = null;
    },
    // findEducations  
    educationsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEducation  
    educationCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEducation  
    educationUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.EducationId === action.payload.education.EducationId) {
          return action.payload.education;
        }
        return entity;
      });
    },
    // deleteEducation  
    educationDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EducationId !== action.payload.EducationId  
      );
    },
    // deleteEducations  
    educationsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EducationId)  
      );
    },
    // educationsUpdateState  
    educationsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EducationId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
