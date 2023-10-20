
import { createSlice } from "@reduxjs/toolkit";
const initialInquiriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  inquiryForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const inquiriesSlice = createSlice({
  name: "inquiries",
  initialState: initialInquiriesState,
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
    // getInquiryById  
    inquiryFetched: (state, action) => {
      state.actionsLoading = false;
      state.inquiryForEdit = action.payload.inquiryForEdit;
      state.error = null;
    },
    // findInquiries  
    inquiriesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createInquiry  
    inquiryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateInquiry  
    inquiryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.InquiryId === action.payload.inquiry.InquiryId) {
          return action.payload.inquiry;
        }
        return entity;
      });
    },
    // deleteInquiry  
    inquiryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.InquiryId !== action.payload.InquiryId  
      );
    },
    // deleteInquiries  
    inquiriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.InquiryId)  
      );
    },
    // inquiriesUpdateState  
    inquiriesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.InquiryId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
