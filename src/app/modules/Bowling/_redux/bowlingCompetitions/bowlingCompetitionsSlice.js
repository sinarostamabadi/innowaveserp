import { createSlice } from "@reduxjs/toolkit";
const initialBowlingCompetitionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bowlingCompetitionForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bowlingCompetitionsSlice = createSlice({
  name: "bowlingCompetitions",
  initialState: initialBowlingCompetitionsState,
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
    // getBowlingCompetitionById
    bowlingCompetitionFetched: (state, action) => {
      state.actionsLoading = false;
      state.bowlingCompetitionForEdit =
        action.payload.bowlingCompetitionForEdit;
      state.error = null;
    },
    // findBowlingCompetitions
    bowlingCompetitionsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBowlingCompetition
    bowlingCompetitionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBowlingCompetition
    bowlingCompetitionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.BowlingCompetitionId ===
          action.payload.bowlingCompetition.BowlingCompetitionId
        ) {
          return action.payload.bowlingCompetition;
        }
        return entity;
      });
    },
    // deleteBowlingCompetition
    bowlingCompetitionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BowlingCompetitionId !== action.payload.BowlingCompetitionId
      );
    },
    // deleteBowlingCompetitions
    bowlingCompetitionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BowlingCompetitionId)
      );
    },
    // bowlingCompetitionsUpdateState
    bowlingCompetitionsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BowlingCompetitionId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
