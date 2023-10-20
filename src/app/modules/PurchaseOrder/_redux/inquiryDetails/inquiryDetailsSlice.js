
import { createSlice } from "@reduxjs/toolkit";
const initialInquiryDetailsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  inquiryDetailForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const inquiryDetailsSlice = createSlice({
  name: "inquiryDetails",
  initialState: initialInquiryDetailsState,
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
    // getInquiryDetailById  
    inquiryDetailFetched: (state, action) => {
      state.actionsLoading = false;
      state.inquiryDetailForEdit = action.payload.inquiryDetailForEdit;
      state.error = null;
    },
    // findInquiryDetails  
    inquiryDetailsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createInquiryDetail  
    inquiryDetailCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateInquiryDetail  
    inquiryDetailUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.InquiryDetailId === action.payload.inquiryDetail.InquiryDetailId) {
          return action.payload.inquiryDetail;
        }
        return entity;
      });
    },
    // deleteInquiryDetail  
    inquiryDetailDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.InquiryDetailId !== action.payload.InquiryDetailId  
      );
    },
    // deleteInquiryDetails  
    inquiryDetailsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.InquiryDetailId)  
      );
    },
    // inquiryDetailsUpdateState  
    inquiryDetailsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.InquiryDetailId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
