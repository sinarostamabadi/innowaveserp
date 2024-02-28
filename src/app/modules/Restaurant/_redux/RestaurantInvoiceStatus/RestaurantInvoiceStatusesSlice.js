import { createSlice } from "@reduxjs/toolkit";
const initialPaymentStatusesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  paymentStatusForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const paymentStatusesSlice = createSlice({
  name: "paymentStatuses",
  initialState: initialPaymentStatusesState,
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
    // getPaymentStatusById
    paymentStatusFetched: (state, action) => {
      state.actionsLoading = false;
      state.paymentStatusForEdit = action.payload.paymentStatusForEdit;
      state.error = null;
    },
    // findPaymentStatuses
    paymentStatusesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPaymentStatus
    paymentStatusCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePaymentStatus
    paymentStatusUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.PaymentStatusId ===
          action.payload.paymentStatus.PaymentStatusId
        ) {
          return action.payload.paymentStatus;
        }
        return entity;
      });
    },
    // deletePaymentStatus
    paymentStatusDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PaymentStatusId !== action.payload.PaymentStatusId
      );
    },
    // deletePaymentStatuses
    paymentStatusesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PaymentStatusId)
      );
    },
    // paymentStatusesUpdateState
    paymentStatusesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PaymentStatusId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
