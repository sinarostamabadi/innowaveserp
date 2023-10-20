/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { isEqual, isFunction } from "lodash";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CloneObject } from "src/core/_helpers";
import { WalletTools } from "../quick/Dependency";
import { getConfig } from "src/core/_models/ModelDescriber";
import { WalletModel } from "src/core/_models/Core/WalletModel";

const WalletsUIContext = createContext();

export function useWalletsUIContext() {
  return useContext(WalletsUIContext);
}

export const WalletsUIConsumer = WalletsUIContext.Consumer;

export const WalletsUIProvider = forwardRef(
  ({ currentDocumentId, children, wallet, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          wallets.map((wallet) => {
            let tempDoc = WalletTools.Clean(wallet);
            if (
              !!tempDoc.WalletId &&
              tempDoc.WalletId.toString().indexOf("temp_") > -1
            ) {
              tempDoc.WalletId = null;
            }

            return tempDoc;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [documentId, setDocumentId] = useState(currentDocumentId);
    const initWallet = {...WalletTools.Model, DocumentId: currentDocumentId};
    const [selectedItem, setSelectedItem] = useState(initWallet);
    const { actionsLoading, documentForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.companies.actionsLoading,
        documentForEdit: state.companies.documentForEdit,
        error: state.companies.error,
      }),
      shallowEqual
    );

    const [queryParams, setQueryParamsBase] = useState(getConfig(WalletModel, "Title", "desc").initialFilter);

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

    const [wallets, setWallets] = useState(wallet.map(x=> WalletTools.Clean(x)));
    const [activeWallets, setActiveWallets] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setActiveWallets(wallets.filter((x) => x.IsDeleted == false));
      setTotalCount(wallets.filter((x) => x.IsDeleted == false).length);
    }, [wallets]);

    useEffect(() => {
      initWallet.DocumentId = currentDocumentId;

      setDocumentId(currentDocumentId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDocumentId]);

    useEffect(() => {
      setSelectedItem(findWallet(selectedId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);
    
    const [showEditWalletDialog, setShowEditWalletDialog] = useState(false);
    const openNewWalletDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initWallet));

      setTimeout(() => {
        setShowEditWalletDialog(true);
      }, 200);
    };
    const openEditWalletDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findWallet(selectedId));
      setTimeout(() => {
        setShowEditWalletDialog(true);
      }, 200);
    };
    const closeEditWalletDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initWallet));
      setShowEditWalletDialog(false);
    };

    const [showDeleteWalletDialog, setShowDeleteWalletDialog] = useState(false);
    const openDeleteWalletDialog = (id) => {
      setSelectedId(id);
      setShowDeleteWalletDialog(true);
    };
    const closeDeleteWalletDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initWallet));
      setShowDeleteWalletDialog(false);
    };

    const [showDeleteWalletsDialog, setShowDeleteWalletsDialog] = useState(
      false
    );
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
      return wallets.filter((wallet) => wallet.WalletId == walletId)[0];
    };

    const addWallet = (wallet) => {
      wallet.WalletId = "temp_" + Math.floor(Math.random() * 100);
      wallet.DocumentId = +wallet.DocumentId;

      setWallets((wallets) => [...wallets, wallet]);
    };

    const removeWallet = (walletId) => {
      if (walletId.toString().indexOf("temp_") > -1) {
        setWallets((wallets) =>
          wallets.filter((item) => item.WalletId != walletId)
        );
      } else {
        setWallets((wallets) =>
          wallets.map((item) => {
            let copyWallet = CloneObject(item);
            if (copyWallet.WalletId == walletId) copyWallet.IsDeleted = true;

            return copyWallet;
          })
        );
      }
    };

    const updateWallet = (wallet) => {
      wallet.DocumentId = +wallet.DocumentId;
      setWallets((wallets) =>
        wallets.map((item) =>
          item.WalletId === wallet.WalletId ? wallet : item
        )
      );
    };

    const value = {
      wallets,
      activeWallets,
      findWallet,
      addWallet,
      removeWallet,
      updateWallet,
      totalCount,
      setTotalCount,
      actionsLoading,
      documentId,
      setDocumentId,
      initWallet,
      selectedId,
      selectedItem,
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
