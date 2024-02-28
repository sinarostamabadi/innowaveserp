import { createSlice } from "@reduxjs/toolkit";
const initialRewardOrPenaltyTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  rewardOrPenaltyTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const rewardOrPenaltyTypesSlice = createSlice({
  name: "rewardOrPenaltyTypes",
  initialState: initialRewardOrPenaltyTypesState,
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
    // getRewardOrPenaltyTypeById
    rewardOrPenaltyTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.rewardOrPenaltyTypeForEdit =
        action.payload.rewardOrPenaltyTypeForEdit;
      state.error = null;
    },
    // findRewardOrPenaltyTypes
    rewardOrPenaltyTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRewardOrPenaltyType
    rewardOrPenaltyTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRewardOrPenaltyType
    rewardOrPenaltyTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RewardOrPenaltyTypeId ===
          action.payload.rewardOrPenaltyType.RewardOrPenaltyTypeId
        ) {
          return action.payload.rewardOrPenaltyType;
        }
        return entity;
      });
    },
    // deleteRewardOrPenaltyType
    rewardOrPenaltyTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.RewardOrPenaltyTypeId !== action.payload.RewardOrPenaltyTypeId
      );
    },
    // deleteRewardOrPenaltyTypes
    rewardOrPenaltyTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RewardOrPenaltyTypeId)
      );
    },
    // rewardOrPenaltyTypesUpdateState
    rewardOrPenaltyTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RewardOrPenaltyTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
