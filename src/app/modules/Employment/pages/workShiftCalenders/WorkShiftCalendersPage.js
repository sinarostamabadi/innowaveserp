import React from "react";
import { Route } from "react-router-dom";
import { WorkShiftCalendersLoadingDialog } from "./workShiftCalenders-loading-dialog/WorkShiftCalendersLoadingDialog";
import { WorkShiftCalenderDeleteDialog } from "./workShiftCalender-delete-dialog/WorkShiftCalenderDeleteDialog";
import { WorkShiftCalendersCard } from "./WorkShiftCalendersCard";
import { WorkShiftCalendersUIProvider } from "./WorkShiftCalendersUIContext";

export function WorkShiftCalendersPage({ history }) {
  const workShiftCalendersUIEvents = {
    newWorkShiftCalenderButtonClick: () => {
      history.push("/employment/workShiftCalenders/new");
    },
    openEditWorkShiftCalenderPage: (id) => {
      history.push(`/employment/workShiftCalenders/${id}/edit`);
    },
    openDeleteWorkShiftCalenderDialog: (id) => {
      history.push(`/employment/workShiftCalenders/${id}/delete`);
    },
    openDeleteWorkShiftCalendersDialog: () => {
      history.push(`/employment/workShiftCalenders/deleteWorkShiftCalenders`);
    },
    openFetchWorkShiftCalendersDialog: () => {
      history.push(`/employment/workShiftCalenders/fetch`);
    },
    openUpdateWorkShiftCalendersStatusDialog: () => {
      history.push("/employment/workShiftCalenders/updateStatus");
    },
  };

  return (
    <WorkShiftCalendersUIProvider
      workShiftCalendersUIEvents={workShiftCalendersUIEvents}
    >
      <WorkShiftCalendersLoadingDialog />
      <Route path="/employment/workShiftCalenders/:id/delete">
        {({ history, match }) => (
          <WorkShiftCalenderDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/workShiftCalenders");
            }}
          />
        )}
      </Route>
      <WorkShiftCalendersCard />
    </WorkShiftCalendersUIProvider>
  );
}
