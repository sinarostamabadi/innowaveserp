import React from "react";
import { Route } from "react-router-dom";
import { ChequeBooksLoadingDialog } from "./chequeBooks-loading-dialog/ChequeBooksLoadingDialog";
import { ChequeBookDeleteDialog } from "./chequeBook-delete-dialog/ChequeBookDeleteDialog";
import { ChequeBooksCard } from "./ChequeBooksCard";
import { ChequeBooksUIProvider } from "./ChequeBooksUIContext";

export function ChequeBooksPage({ history }) {
  const chequeBooksUIEvents = {
    newChequeBookButtonClick: () => {
      history.push("/cash/chequeBooks/new");
    },
    openEditChequeBookPage: (id) => {
      history.push(`/cash/chequeBooks/${id}/edit`);
    },
    openDeleteChequeBookDialog: (id) => {
      history.push(`/cash/chequeBooks/${id}/delete`);
    },
    openDeleteChequeBooksDialog: () => {
      history.push(`/cash/chequeBooks/deleteChequeBooks`);
    },
    openFetchChequeBooksDialog: () => {
      history.push(`/cash/chequeBooks/fetch`);
    },
  };
  
  return (
    <ChequeBooksUIProvider chequeBooksUIEvents={chequeBooksUIEvents}>
      <ChequeBooksLoadingDialog />
      <Route path="/cash/chequeBooks/:id/delete">
        {({ history, match }) => (
          <ChequeBookDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/chequeBooks");
            }}
          />
        )}
      </Route>
      <ChequeBooksCard />
    </ChequeBooksUIProvider>
  );
}