import React from "react";
import { Route } from "react-router-dom";
import { CashTransactionTypesLoadingDialog } from "./cashTransactionTypes-loading-dialog/CashTransactionTypesLoadingDialog";
import { CashTransactionTypeDeleteDialog } from "./cashTransactionType-delete-dialog/CashTransactionTypeDeleteDialog";
import { CashTransactionTypesCard } from "./CashTransactionTypesCard";
import { CashTransactionTypesUIProvider } from "./CashTransactionTypesUIContext";

export function CashTransactionTypesPage({ history }) {
  const cashTransactionTypesUIEvents = {
    newCashTransactionTypeButtonClick: () => {
      history.push("/cash/cashTransactionTypes/new");
    },
    openEditCashTransactionTypePage: (id) => {
      history.push(`/cash/cashTransactionTypes/${id}/edit`);
    },
    openDeleteCashTransactionTypeDialog: (id) => {
      history.push(`/cash/cashTransactionTypes/${id}/delete`);
    },
    openDeleteCashTransactionTypesDialog: () => {
      history.push(`/cash/cashTransactionTypes/deleteCashTransactionTypes`);
    },
    openFetchCashTransactionTypesDialog: () => {
      history.push(`/cash/cashTransactionTypes/fetch`);
    },
    openUpdateCashTransactionTypesStatusDialog: () => {
      history.push("/cash/cashTransactionTypes/updateStatus");
    },
  };
  
  return (
    <CashTransactionTypesUIProvider cashTransactionTypesUIEvents={cashTransactionTypesUIEvents}>
      <CashTransactionTypesLoadingDialog />
      <Route path="/cash/cashTransactionTypes/:id/delete">
        {({ history, match }) => (
          <CashTransactionTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/cashTransactionTypes");
            }}
          />
        )}
      </Route>
      <CashTransactionTypesCard />
    </CashTransactionTypesUIProvider>
  );
}