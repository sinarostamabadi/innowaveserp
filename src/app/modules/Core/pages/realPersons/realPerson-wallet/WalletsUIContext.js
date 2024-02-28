/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./WalletsUIHelper";
import { shallowEqual, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";

const WalletsUIContext = createContext();

export function useWalletsUIContext() {
  return useContext(WalletsUIContext);
}

export const WalletsUIConsumer = WalletsUIContext.Consumer;

export const WalletsUIProvider = forwardRef(
  ({ currentPersonId, children, wallet, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          !!wallets && wallets.length > 0
            ? wallets.map((wallet) => {
                return {
                  WalletId:
                    wallet.WalletId.toString().indexOf("temp_") > -1
                      ? null
                      : wallet.WalletId,
                  PersonId: +personId,
                  Title: wallet.Title,
                  Price: +wallet.Price,
                };
              })
            : []
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [personId, setPersonId] = useState(currentPersonId);

    const initWallet = {
      WalletId: undefined,
      PersonId: personId,
      Title: undefined,
      Price: "",
    };

    const { actionsLoading, realPersonForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.realPersons.actionsLoading,
        realPersonForEdit: state.realPersons.realPersonForEdit,
        error: state.realPersons.error,
      }),
      shallowEqual
    );

    const [queryParams, setQueryParamsBase] = useState(initialFilter);
    const setQueryParams = useCallback((nextQueryParams) => {
      setQueryParamsBase((prevQueryParams) => {
        if (isFunction(nextQueryParams)) {
          nextQueryParams = nextQueryParams(prevQueryParams);
        }

        if (isEqual(prevQueryParams, nextQueryParams)) {
          return prevQueryParams;
        }

        return nextQueryParams;
      });
    }, []);

    const [wallets, setWallets] = useState(wallet);
    const [active, setActive] = useState(wallet);
    const [totalCount, setTotalCount] = useState(0);
    useEffect(() => {
      if (
        !!realPersonForEdit &&
        !!realPersonForEdit.Wallets &&
        realPersonForEdit.Wallets.length > 0
      ) {
        setWallets(realPersonForEdit.Wallets);
        setTotalCount(realPersonForEdit.Wallets.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initWallet.PersonId = currentPersonId;

      setPersonId(currentPersonId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPersonId]);

    useEffect(() => {
      if (!!wallets && wallets.length > 0)
        setActive(wallets.filter((x) => !x.IsDeleted));
    }, [wallets]);

    const [showEditWalletDialog, setShowEditWalletDialog] = useState(false);
    const openNewWalletDialog = () => {
      setSelectedId(undefined);
      setShowEditWalletDialog(true);
    };
    const openEditWalletDialog = (id) => {
      setSelectedId(id);
      setShowEditWalletDialog(true);
    };
    const closeEditWalletDialog = () => {
      setSelectedId(undefined);
      setShowEditWalletDialog(false);
    };

    const [showDeleteWalletDialog, setShowDeleteWalletDialog] = useState(false);
    const openDeleteWalletDialog = (id) => {
      setSelectedId(id);
      setShowDeleteWalletDialog(true);
    };
    const closeDeleteWalletDialog = () => {
      setSelectedId(undefined);
      setShowDeleteWalletDialog(false);
    };

    const [showDeleteWalletsDialog, setShowDeleteWalletsDialog] =
      useState(false);
    const openDeleteWalletsDialog = () => {
      setShowDeleteWalletsDialog(true);
    };
    const closeDeleteWalletsDialog = () => {
      setShowDeleteWalletsDialog(false);
    };

    const [showFetchWalletsDialog, setShowFetchWalletsDialog] = useState(false);
    const openFetchWalletsDialog = () => {
      setShowFetchWalletsDialog(true);
    };
    const closeFetchWalletsDialog = () => {
      setShowFetchWalletsDialog(false);
    };

    const findWallet = (walletId) => {
      let walletObj = !!wallets
        ? wallets.filter((wallet) => wallet.WalletId == walletId)[0]
        : null;

      return walletObj;
    };

    const addWallet = (wallet) => {
      wallet.WalletId = "temp_" + Math.floor(Math.random() * 100);
      wallet.Title = wallet.Title;
      wallet.PersonId = +wallet.PersonId;

      setWallets((wallets) => [...wallets, wallet]);
    };

    const removeWallet = (walletId) => {
      setWallets((wallets) =>
        wallets.map((item) =>
          item.WalletId == walletId ? { ...wallet, IsDeleted: true } : item
        )
      );
    };

    const updateWallet = (wallet) => {
      wallet.Title = wallet.Title;
      wallet.PersonId = +wallet.PersonId;

      setWallets((wallets) =>
        wallets.map((item) =>
          item.WalletId == wallet.WalletId ? wallet : item
        )
      );
    };

    const value = {
      wallets,
      active,
      findWallet,
      addWallet,
      removeWallet,
      updateWallet,
      totalCount,
      setTotalCount,
      actionsLoading,
      personId,
      setPersonId,
      initWallet,
      selectedId,
      queryParams,
      setQueryParams,
      showEditWalletDialog,
      openEditWalletDialog,
      openNewWalletDialog,
      closeEditWalletDialog,
      showDeleteWalletDialog,
      openDeleteWalletDialog,
      closeDeleteWalletDialog,
      showDeleteWalletsDialog,
      openDeleteWalletsDialog,
      closeDeleteWalletsDialog,
      showFetchWalletsDialog,
      openFetchWalletsDialog,
      closeFetchWalletsDialog,
    };

    return (
      <WalletsUIContext.Provider value={value}>
        {children}
      </WalletsUIContext.Provider>
    );
  }
);
