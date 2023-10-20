
import { createSlice } from "@reduxjs/toolkit";
const initialBowlingTeamsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bowlingTeamForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bowlingTeamsSlice = createSlice({
  name: "bowlingTeams",
  initialState: initialBowlingTeamsState,
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
    // getBowlingTeamById  
    bowlingTeamFetched: (state, action) => {
      state.actionsLoading = false;
      state.bowlingTeamForEdit = action.payload.bowlingTeamForEdit;
      state.error = null;
    },
    // findBowlingTeams  
    bowlingTeamsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBowlingTeam  
    bowlingTeamCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBowlingTeam  
    bowlingTeamUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BowlingTeamId === action.payload.bowlingTeam.BowlingTeamId) {
          return action.payload.bowlingTeam;
        }
        return entity;
      });
    },
    // deleteBowlingTeam  
    bowlingTeamDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BowlingTeamId !== action.payload.BowlingTeamId  
      );
    },
    // deleteBowlingTeams  
    bowlingTeamsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BowlingTeamId)  
      );
    },
    // bowlingTeamDone
    bowlingTeamsDoned: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
    },
    // bowlingTeamsUpdateState  
    bowlingTeamsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BowlingTeamId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
