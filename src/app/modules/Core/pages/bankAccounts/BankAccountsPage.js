import React from "react";
import { Route } from "react-router-dom";
import { BankAccountsLoadingDialog } from "./bankAccounts-loading-dialog/BankAccountsLoadingDialog";
import { BankAccountDeleteDialog } from "./bankAccount-delete-dialog/BankAccountDeleteDialog";
import { BankAccountsCard } from "./BankAccountsCard";
import { BankAccountsUIProvider } from "./BankAccountsUIContext";

export function BankAccountsPage({ history }) {
  const bankAccountsUIEvents = {
    newBankAccountButtonClick: () => {
      history.push("/Core/bankAccounts/new");
    },
    openEditBankAccountPage: (id) => {
      history.push(`/Core/bankAccounts/${id}/edit`);
    },
    openDeleteBankAccountDialog: (id) => {
      history.push(`/Core/bankAccounts/${id}/delete`);
    },
    openDeleteBankAccountsDialog: () => {
      history.push(`/Core/bankAccounts/deleteBankAccounts`);
    },
    openFetchBankAccountsDialog: () => {
      history.push(`/Core/bankAccounts/fetch`);
    },
    openUpdateBankAccountsStatusDialog: () => {
      history.push("/Core/bankAccounts/updateStatus");
    },
  };
  
  return (
    <BankAccountsUIProvider bankAccountsUIEvents={bankAccountsUIEvents}>
      <BankAccountsLoadingDialog />
      <Route path="/Core/bankAccounts/:id/delete">
        {({ history, match }) => (
          <BankAccountDeleteDialog  
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Core/bankAccounts");
            }}
          />
        )}
      </Route>
      <BankAccountsCard />
    </BankAccountsUIProvider>
  );
}
