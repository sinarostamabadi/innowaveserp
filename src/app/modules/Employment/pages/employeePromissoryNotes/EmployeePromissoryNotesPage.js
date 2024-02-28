import React from "react";
import { Route } from "react-router-dom";
import { EmployeePromissoryNotesLoadingDialog } from "./employeePromissoryNotes-loading-dialog/EmployeePromissoryNotesLoadingDialog";
import { EmployeePromissoryNoteDeleteDialog } from "./employeePromissoryNote-delete-dialog/EmployeePromissoryNoteDeleteDialog";
import { EmployeePromissoryNotesCard } from "./EmployeePromissoryNotesCard";
import { EmployeePromissoryNotesUIProvider } from "./EmployeePromissoryNotesUIContext";

export function EmployeePromissoryNotesPage({ history }) {
  const employeePromissoryNotesUIEvents = {
    newEmployeePromissoryNoteButtonClick: () => {
      history.push("/employment/employeePromissoryNotes/new");
    },
    openEditEmployeePromissoryNotePage: (id) => {
      history.push(`/employment/employeePromissoryNotes/${id}/edit`);
    },
    openDeleteEmployeePromissoryNoteDialog: (id) => {
      history.push(`/employment/employeePromissoryNotes/${id}/delete`);
    },
    openDeleteEmployeePromissoryNotesDialog: () => {
      history.push(
        `/employment/employeePromissoryNotes/deleteEmployeePromissoryNotes`
      );
    },
    openFetchEmployeePromissoryNotesDialog: () => {
      history.push(`/employment/employeePromissoryNotes/fetch`);
    },
    openUpdateEmployeePromissoryNotesStatusDialog: () => {
      history.push("/employment/employeePromissoryNotes/updateStatus");
    },
  };

  return (
    <EmployeePromissoryNotesUIProvider
      employeePromissoryNotesUIEvents={employeePromissoryNotesUIEvents}
    >
      <EmployeePromissoryNotesLoadingDialog />
      <Route path="/employment/employeePromissoryNotes/:id/delete">
        {({ history, match }) => (
          <EmployeePromissoryNoteDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeePromissoryNotes");
            }}
          />
        )}
      </Route>
      <EmployeePromissoryNotesCard />
    </EmployeePromissoryNotesUIProvider>
  );
}
