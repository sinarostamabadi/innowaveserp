import { createSlice } from "@reduxjs/toolkit";
const initialInquiryStatusesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  inquiryStatusForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const inquiryStatusesSlice = createSlice({
  name: "inquiryStatuses",
  initialState: initialInquiryStatusesState,
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
    // getInquiryStatusById
    inquiryStatusFetched: (state, action) => {
      state.actionsLoading = false;
      state.inquiryStatusForEdit = action.payload.inquiryStatusForEdit;
      state.error = null;
    },
    // findInquiryStatuses
    inquiryStatusesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createInquiryStatus
    inquiryStatusCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateInquiryStatus
    inquiryStatusUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.InquiryStatusId ===
          action.payload.inquiryStatus.InquiryStatusId
        ) {
          return action.payload.inquiryStatus;
        }
        return entity;
      });
    },
    // deleteInquiryStatus
    inquiryStatusDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.InquiryStatusId !== action.payload.InquiryStatusId
      );
    },
    // deleteInquiryStatuses
    inquiryStatusesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.InquiryStatusId)
      );
    },
    // inquiryStatusesUpdateState
    inquiryStatusesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.InquiryStatusId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
