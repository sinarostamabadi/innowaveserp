import { createSlice } from "@reduxjs/toolkit";
const initialWalletsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  walletForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const walletsSlice = createSlice({
  name: "wallets",
  initialState: initialWalletsState,
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
    // getWalletById
    walletFetched: (state, action) => {
      state.actionsLoading = false;
      state.walletForEdit = action.payload.walletForEdit;
      state.error = null;
    },
    // findWallets
    walletsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createWallet
    walletCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateWallet
    walletUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.WalletId === action.payload.wallet.WalletId) {
          return action.payload.wallet;
        }
        return entity;
      });
    },
    // deleteWallet
    walletDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.WalletId !== action.payload.WalletId
      );
    },
    // deleteWallets
    walletsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.WalletId)
      );
    },
    // walletsUpdateState
    walletsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.WalletId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
