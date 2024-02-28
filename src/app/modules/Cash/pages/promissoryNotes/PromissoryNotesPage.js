import React from "react";
import { Route } from "react-router-dom";
import { PromissoryNotesLoadingDialog } from "./promissoryNotes-loading-dialog/PromissoryNotesLoadingDialog";
import { PromissoryNoteDeleteDialog } from "./promissoryNote-delete-dialog/PromissoryNoteDeleteDialog";
import { PromissoryNotesCard } from "./PromissoryNotesCard";
import { PromissoryNotesUIProvider } from "./PromissoryNotesUIContext";

export function PromissoryNotesPage({ history }) {
  const promissoryNotesUIEvents = {
    newPromissoryNoteButtonClick: () => {
      history.push("/cash/promissoryNotes/new");
    },
    openEditPromissoryNotePage: (id) => {
      history.push(`/cash/promissoryNotes/${id}/edit`);
    },
    openDeletePromissoryNoteDialog: (id) => {
      history.push(`/cash/promissoryNotes/${id}/delete`);
    },
    openDeletePromissoryNotesDialog: () => {
      history.push(`/cash/promissoryNotes/deletePromissoryNotes`);
    },
    openFetchPromissoryNotesDialog: () => {
      history.push(`/cash/promissoryNotes/fetch`);
    },
    openUpdatePromissoryNotesStatusDialog: () => {
      history.push("/cash/promissoryNotes/updateStatus");
    },
  };

  return (
    <PromissoryNotesUIProvider
      promissoryNotesUIEvents={promissoryNotesUIEvents}
    >
      <PromissoryNotesLoadingDialog />
      <Route path="/cash/promissoryNotes/:id/delete">
        {({ history, match }) => (
          <PromissoryNoteDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/promissoryNotes");
            }}
          />
        )}
      </Route>
      <PromissoryNotesCard />
    </PromissoryNotesUIProvider>
  );
}
