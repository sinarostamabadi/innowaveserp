import React from "react";
import { Route } from "react-router-dom";
import { ChequePapersLoadingDialog } from "./chequePapers-loading-dialog/ChequePapersLoadingDialog";
import { ChequePaperDeleteDialog } from "./chequePaper-delete-dialog/ChequePaperDeleteDialog";
import { ChequePapersCard } from "./ChequePapersCard";
import { ChequePapersUIProvider } from "./ChequePapersUIContext";

export function ChequePapersPage({ history }) {
  const chequePapersUIEvents = {
    newChequePaperButtonClick: () => {
      history.push("/cash/chequePapers/new");
    },
    openEditChequePaperPage: (id) => {
      history.push(`/cash/chequePapers/${id}/edit`);
    },
    openDeleteChequePaperDialog: (id) => {
      history.push(`/cash/chequePapers/${id}/delete`);
    },
    openDeleteChequePapersDialog: () => {
      history.push(`/cash/chequePapers/deleteChequePapers`);
    },
    openFetchChequePapersDialog: () => {
      history.push(`/cash/chequePapers/fetch`);
    },
    openUpdateChequePapersStatusDialog: () => {
      history.push("/cash/chequePapers/updateStatus");
    },
  };
  
  return (
    <ChequePapersUIProvider chequePapersUIEvents={chequePapersUIEvents}>
      <ChequePapersLoadingDialog />
      <Route path="/cash/chequePapers/:id/delete">
        {({ history, match }) => (
          <ChequePaperDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/chequePapers");
            }}
          />
        )}
      </Route>
      <ChequePapersCard />
    </ChequePapersUIProvider>
  );
}