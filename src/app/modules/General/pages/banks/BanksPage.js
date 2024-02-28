import React from "react";
import { Route } from "react-router-dom";
import { BanksLoadingDialog } from "./banks-loading-dialog/BanksLoadingDialog";
import { BankDeleteDialog } from "./bank-delete-dialog/BankDeleteDialog";
import { BanksCard } from "./BanksCard";
import { BanksUIProvider } from "./BanksUIContext";

export function BanksPage({ history }) {
  const banksUIEvents = {
    newBankButtonClick: () => {
      history.push("/general/banks/new");
    },
    openEditBankPage: (id) => {
      history.push(`/general/banks/${id}/edit`);
    },
    openDeleteBankDialog: (id) => {
      history.push(`/general/banks/${id}/delete`);
    },
    openDeleteBanksDialog: () => {
      history.push(`/general/banks/deleteBanks`);
    },
    openFetchBanksDialog: () => {
      history.push(`/general/banks/fetch`);
    },
    openUpdateBanksStatusDialog: () => {
      history.push("/general/banks/updateStatus");
    },
  };

  return (
    <BanksUIProvider banksUIEvents={banksUIEvents}>
      <BanksLoadingDialog />
      <Route path="/general/banks/:id/delete">
        {({ history, match }) => (
          <BankDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/banks");
            }}
          />
        )}
      </Route>
      <BanksCard />
    </BanksUIProvider>
  );
}
