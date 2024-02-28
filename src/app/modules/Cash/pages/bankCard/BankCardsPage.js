import React from "react";
import { Route } from "react-router-dom";
import { BankCardsLoadingDialog } from "./bankCards-loading-dialog/BankCardsLoadingDialog";
import { BankCardDeleteDialog } from "./bankCard-delete-dialog/BankCardDeleteDialog";
import { BankCardsCard } from "./BankCardsCard";
import { BankCardsUIProvider } from "./BankCardsUIContext";

export function BankCardsPage({ history }) {
  const bankCardsUIEvents = {
    newBankCardButtonClick: () => {
      history.push("/cash/bankCards/new");
    },
    openEditBankCardPage: (id) => {
      history.push(`/cash/bankCards/${id}/edit`);
    },
    openDeleteBankCardDialog: (id) => {
      history.push(`/cash/bankCards/${id}/delete`);
    },
    openDeleteBankCardsDialog: () => {
      history.push(`/cash/bankCards/deleteBankCards`);
    },
    openFetchBankCardsDialog: () => {
      history.push(`/cash/bankCards/fetch`);
    },
    openUpdateBankCardsStatusDialog: () => {
      history.push("/cash/bankCards/updateStatus");
    },
  };

  return (
    <BankCardsUIProvider bankCardsUIEvents={bankCardsUIEvents}>
      <BankCardsLoadingDialog />
      <Route path="/cash/bankCards/:id/delete">
        {({ history, match }) => (
          <BankCardDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/bankCards");
            }}
          />
        )}
      </Route>
      <BankCardsCard />
    </BankCardsUIProvider>
  );
}
