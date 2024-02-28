import { createSlice } from "@reduxjs/toolkit";
const initialSoldiershipExemptionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  soldiershipExemptionForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const soldiershipExemptionsSlice = createSlice({
  name: "soldiershipExemptions",
  initialState: initialSoldiershipExemptionsState,
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
    // getSoldiershipExemptionById
    soldiershipExemptionFetched: (state, action) => {
      state.actionsLoading = false;
      state.soldiershipExemptionForEdit =
        action.payload.soldiershipExemptionForEdit;
      state.error = null;
    },
    // findSoldiershipExemptions
    soldiershipExemptionsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSoldiershipExemption
    soldiershipExemptionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSoldiershipExemption
    soldiershipExemptionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.SoldiershipExemptionId ===
          action.payload.soldiershipExemption.SoldiershipExemptionId
        ) {
          return action.payload.soldiershipExemption;
        }
        return entity;
      });
    },
    // deleteSoldiershipExemption
    soldiershipExemptionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.SoldiershipExemptionId !== action.payload.SoldiershipExemptionId
      );
    },
    // deleteSoldiershipExemptions
    soldiershipExemptionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SoldiershipExemptionId)
      );
    },
    // soldiershipExemptionsUpdateState
    soldiershipExemptionsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SoldiershipExemptionId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
