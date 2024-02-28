import { createSlice } from "@reduxjs/toolkit";
const initialInsuranceTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  insuranceTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const insuranceTypesSlice = createSlice({
  name: "insuranceTypes",
  initialState: initialInsuranceTypesState,
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
    // getInsuranceTypeById
    insuranceTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.insuranceTypeForEdit = action.payload.insuranceTypeForEdit;
      state.error = null;
    },
    // findInsuranceTypes
    insuranceTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createInsuranceType
    insuranceTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateInsuranceType
    insuranceTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.InsuranceTypeId ===
          action.payload.insuranceType.InsuranceTypeId
        ) {
          return action.payload.insuranceType;
        }
        return entity;
      });
    },
    // deleteInsuranceType
    insuranceTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.InsuranceTypeId !== action.payload.InsuranceTypeId
      );
    },
    // deleteInsuranceTypes
    insuranceTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.InsuranceTypeId)
      );
    },
    // insuranceTypesUpdateState
    insuranceTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.InsuranceTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
