import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { AccountModel } from "../../../../../core/_models/Accounting/AccountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../_redux/accounts/accountsActions";

const AccountsUIContext = createContext();

export function useAccountsUIContext() {
  return useContext(AccountsUIContext);
}

export const AccountsUIConsumer = AccountsUIContext.Consumer;

export function AccountsUIProvider({ accountsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(AccountModel).initialFilter
  );

  const [ids, setIds] = useState([]);

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

  const initDetail = {
    AccountId: null,

    ParentId: null,
    Code: "",
    Title: "",
    FullCode: "",
    FullTitle: "",
    StartYearId: "",
    AccountTypeId: "",
    Level: "",
    TarazSood: "",
    Active: true,
    HasProject: false,
    HasAccountFloating: false,
    HasCostCenter: false,
    HasCurrency: false,
    HasReference: false,
    HasContract: false,
  };

  // Edit Dialog, New Dialog
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditDetailDialog, setShowEditDetailDialog] = useState(false);
  const openNewDetailDialog = () => {
    setSelectedId(undefined);
    setShowEditDetailDialog(true);
  };
  const openEditDetailDialog = (id, parent, level) => {
    setSelectedItem({
      id,
      parent,
      level,
    });
    setSelectedId(id);
    setShowEditDetailDialog(true);
  };
  const closeEditDetailDialog = () => {
    setSelectedId(undefined);
    setShowEditDetailDialog(false);
  };

  const findDetail = (detailId) => {};

  const dispatch = useDispatch();
  const addDetail = (detail) => {
    dispatch(actions.createAccount(detail))
      .then((arg) => {
        closeEditDetailDialog();
      })
      .catch((err) => {});
  };

  const removeDetail = (detailId) => {};

  const updateDetail = (detail) => {
    dispatch(actions.updateAccount(detail.AccountId, detail))
      .then((arg) => {
        closeEditDetailDialog();
      })
      .catch((err) => {});
  };

  const value = {
    selectedId,
    selectedItem,
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    dataModel: AccountModel,

    initDetail,
    findDetail,
    addDetail,
    removeDetail,
    updateDetail,
    // Edit
    showEditDetailDialog,
    openEditDetailDialog,
    openNewDetailDialog,
    closeEditDetailDialog,
    newAccountButtonClick: accountsUIEvents.newAccountButtonClick,
    openEditAccountPage: accountsUIEvents.openEditAccountPage,
    openDeleteAccountDialog: accountsUIEvents.openDeleteAccountDialog,
    openDeleteAccountsDialog: accountsUIEvents.openDeleteAccountsDialog,
  };
  return (
    <AccountsUIContext.Provider value={value}>
      {children}
    </AccountsUIContext.Provider>
  );
}
