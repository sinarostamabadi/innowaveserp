import React from "react";
import { Route } from "react-router-dom";
import { WorkShiftsLoadingDialog } from "./workShifts-loading-dialog/WorkShiftsLoadingDialog";
import { WorkShiftDeleteDialog } from "./workShift-delete-dialog/WorkShiftDeleteDialog";
import { WorkShiftsCard } from "./WorkShiftsCard";
import { WorkShiftsUIProvider } from "./WorkShiftsUIContext";

export function WorkShiftsPage({ history }) {
  const workShiftsUIEvents = {
    newWorkShiftButtonClick: () => {
      history.push("/employment/workShifts/new");
    },
    openEditWorkShiftPage: (id) => {
      history.push(`/employment/workShifts/${id}/edit`);
    },
    openDeleteWorkShiftDialog: (id) => {
      history.push(`/employment/workShifts/${id}/delete`);
    },
    openDeleteWorkShiftsDialog: () => {
      history.push(`/employment/workShifts/deleteWorkShifts`);
    },
    openFetchWorkShiftsDialog: () => {
      history.push(`/employment/workShifts/fetch`);
    },
    openUpdateWorkShiftsStatusDialog: () => {
      history.push("/employment/workShifts/updateStatus");
    },
  };

  return (
    <WorkShiftsUIProvider workShiftsUIEvents={workShiftsUIEvents}>
      <WorkShiftsLoadingDialog />
      <Route path="/employment/workShifts/:id/delete">
        {({ history, match }) => (
          <WorkShiftDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/workShifts");
            }}
          />
        )}
      </Route>
      <WorkShiftsCard />
    </WorkShiftsUIProvider>
  );
}
